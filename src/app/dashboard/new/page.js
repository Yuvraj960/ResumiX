'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewApplicationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        dateApplied: new Date().toISOString().split('T')[0],
        status: 'Applied',
        interviewDate: '',
        interviewTime: '',
        interviewLink: '',
        tags: '',
    });
    const [resumeFile, setResumeFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('companyName', formData.companyName);
            formDataToSend.append('jobTitle', formData.jobTitle);
            formDataToSend.append('jobDescription', formData.jobDescription);
            formDataToSend.append('dateApplied', formData.dateApplied);
            formDataToSend.append('status', formData.status);
            formDataToSend.append('tags', formData.tags);

            if (formData.interviewDate) {
                formDataToSend.append('interviewDate', formData.interviewDate);
            }
            if (formData.interviewTime) {
                formDataToSend.append('interviewTime', formData.interviewTime);
            }
            if (formData.interviewLink) {
                formDataToSend.append('interviewLink', formData.interviewLink);
            }
            if (resumeFile) {
                formDataToSend.append('resumeFile', resumeFile);
            }

            const response = await fetch('/api/applications', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to create application');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            New Application
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Company Name *
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    required
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="e.g., Google, Microsoft, Amazon"
                                />
                            </div>

                            {/* Job Title */}
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Job Title *
                                </label>
                                <input
                                    id="jobTitle"
                                    type="text"
                                    required
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="e.g., Software Engineer, Product Manager"
                                />
                            </div>

                            {/* Job Description */}
                            <div>
                                <label htmlFor="jobDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Job Description
                                </label>
                                <textarea
                                    id="jobDescription"
                                    rows={6}
                                    value={formData.jobDescription}
                                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                                    placeholder="Paste the job description here..."
                                />
                            </div>

                            {/* Resume Upload */}
                            <div>
                                <label htmlFor="resumeFile" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tailored Resume (PDF/DOCX)
                                </label>
                                <input
                                    id="resumeFile"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>

                            {/* Date Applied and Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="dateApplied" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Date Applied
                                    </label>
                                    <input
                                        id="dateApplied"
                                        type="date"
                                        value={formData.dateApplied}
                                        onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Under Review">Under Review</option>
                                        <option value="Interview Scheduled">Interview Scheduled</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>

                            {/* Interview Scheduling */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Interview Details (Optional)</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label htmlFor="interviewDate" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Interview Date
                                        </label>
                                        <input
                                            id="interviewDate"
                                            type="date"
                                            value={formData.interviewDate}
                                            onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="interviewTime" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Interview Time
                                        </label>
                                        <input
                                            id="interviewTime"
                                            type="time"
                                            value={formData.interviewTime}
                                            onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="interviewLink" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Interview Link (Zoom/Meet URL)
                                    </label>
                                    <input
                                        id="interviewLink"
                                        type="url"
                                        value={formData.interviewLink}
                                        onChange={(e) => setFormData({ ...formData, interviewLink: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                        placeholder="https://zoom.us/j/..."
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    id="tags"
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="e.g., DreamCompany, Referral, HighSalary"
                                />
                                <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Creating...' : 'Create Application'}
                                </button>
                                <Link
                                    href="/dashboard"
                                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
