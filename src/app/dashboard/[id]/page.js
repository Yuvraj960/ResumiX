'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ApplicationDetailPage({ params }) {
    const router = useRouter();
    const resolvedParams = use(params); // Unwrap the Promise
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);
    const [interviewNotes, setInterviewNotes] = useState('');
    const [status, setStatus] = useState('');
    const [tags, setTags] = useState('');
    const [matchScore] = useState(Math.floor(Math.random() * 46) + 50); // Random 50-95

    useEffect(() => {
        fetchApplication();
    }, []);

    const fetchApplication = async () => {
        try {
            const response = await fetch(`/api/applications/${resolvedParams.id}`);
            const data = await response.json();

            if (response.ok) {
                setApplication(data.application);
                setInterviewNotes(data.application.interviewNotes || '');
                setStatus(data.application.status);
                setTags((data.application.tags || []).join(', '));
            } else {
                setError(data.error || 'Failed to load application');
            }
        } catch (err) {
            setError('An error occurred while loading the application');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/applications/${resolvedParams.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status,
                    interviewNotes,
                    tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                }),
            });

            if (response.ok) {
                await fetchApplication();
                setEditing(false);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update application');
            }
        } catch (err) {
            setError('An error occurred while updating');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this application?')) {
            return;
        }

        try {
            const response = await fetch(`/api/applications/${resolvedParams.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push('/dashboard');
                router.refresh();
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to delete application');
            }
        } catch (err) {
            setError('An error occurred while deleting');
        }
    };

    const handleDownloadResume = () => {
        window.open(`/api/applications/${resolvedParams.id}/download`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error && !application) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = application ? new Date(application.dateApplied).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }) : '';

    const statusColors = {
        'Applied': 'bg-blue-100 text-blue-700 border-blue-200',
        'Under Review': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Interview Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
        'Offer': 'bg-green-100 text-green-700 border-green-200',
        'Rejected': 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Application Details
                            </h1>
                        </div>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-semibold"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Company and Job Info */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{application.companyName}</h2>
                                <p className="text-xl text-gray-600 mb-4">{application.jobTitle}</p>
                                <p className="text-gray-500">Applied on {formattedDate}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusColors[application.status]}`}>
                                {application.status}
                            </span>
                        </div>

                        {/* Tags */}
                        {application.tags && application.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {application.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-lg text-sm font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Resume Download */}
                        {application.resumeFile && (
                            <button
                                onClick={handleDownloadResume}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume ({application.resumeFile.filename})
                            </button>
                        )}
                    </div>

                    {/* Job Description */}
                    {application.jobDescription && (
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Job Description</h3>
                            <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                                {application.jobDescription}
                            </div>
                        </div>
                    )}

                    {/* Basic Resume Match Score */}
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-8 text-white">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Basic Resume Match Score
                        </h3>
                        <div className="flex items-center gap-6">
                            <div className="text-6xl font-bold">{matchScore}%</div>
                            <div className="flex-1">
                                <div className="w-full bg-white/30 rounded-full h-4 mb-2">
                                    <div
                                        className="bg-white h-4 rounded-full transition-all duration-500"
                                        style={{ width: `${matchScore}%` }}
                                    />
                                </div>
                                <p className="text-white/90 text-sm">
                                    This score is a random guess and will be replaced by a smart AI analyzer soon.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Interview Details */}
                    {(application.interviewDate || application.interviewTime || application.interviewLink) && (
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Interview Scheduled
                            </h3>
                            <div className="space-y-3">
                                {application.interviewDate && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <span className="font-semibold">Date:</span>
                                        <span>{new Date(application.interviewDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                )}
                                {application.interviewTime && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <span className="font-semibold">Time:</span>
                                        <span>{application.interviewTime}</span>
                                    </div>
                                )}
                                {application.interviewLink && (
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-gray-700">Link:</span>
                                        <a
                                            href={application.interviewLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-700 underline"
                                        >
                                            Join Interview →
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Status Update and Interview Notes */}
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Update Application</h3>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors font-semibold"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Application Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    disabled={!editing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-gray-50"
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    disabled={!editing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:bg-gray-50"
                                    placeholder="e.g., DreamCompany, Referral"
                                />
                            </div>

                            {/* Interview Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Interview Preparation Notes
                                </label>
                                <textarea
                                    value={interviewNotes}
                                    onChange={(e) => setInterviewNotes(e.target.value)}
                                    disabled={!editing}
                                    rows={8}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none disabled:bg-gray-50"
                                    placeholder="Add your interview preparation notes, questions asked, key takeaways, etc..."
                                />
                            </div>

                            {editing && (
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleUpdate}
                                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-200"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditing(false);
                                            setInterviewNotes(application.interviewNotes || '');
                                            setStatus(application.status);
                                            setTags((application.tags || []).join(', '));
                                        }}
                                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
