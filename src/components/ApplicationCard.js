import Link from 'next/link';

const statusColors = {
    'Applied': 'bg-blue-100 text-blue-700 border-blue-200',
    'Under Review': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Interview Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
    'Offer': 'bg-green-100 text-green-700 border-green-200',
    'Rejected': 'bg-red-100 text-red-700 border-red-200',
};

export default function ApplicationCard({ application }) {
    const formattedDate = new Date(application.dateApplied).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Link href={`/dashboard/${application._id}`}>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 hover:scale-[1.02] cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{application.companyName}</h3>
                        <p className="text-gray-600">{application.jobTitle}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[application.status] || 'bg-gray-100 text-gray-700'}`}>
                        {application.status}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {application.tags && application.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {application.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-md text-xs font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                        {application.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                                +{application.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>
        </Link>
    );
}
