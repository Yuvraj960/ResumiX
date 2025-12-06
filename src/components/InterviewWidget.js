import Link from 'next/link';

export default function InterviewWidget({ interviews }) {
    if (!interviews || interviews.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upcoming Interviews
                </h3>
                <p className="text-gray-500 text-sm">No upcoming interviews scheduled</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upcoming Interviews
            </h3>

            <div className="space-y-3">
                {interviews.map((interview) => {
                    const interviewDate = new Date(interview.interviewDate);
                    const formattedDate = interviewDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    });

                    return (
                        <div key={interview.id} className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                            <Link href={`/dashboard/${interview.id}`} className="block hover:bg-purple-100 transition-colors rounded p-2 -m-2">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <p className="font-semibold text-gray-800">{interview.companyName}</p>
                                        <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formattedDate}
                                    </span>
                                    {interview.interviewTime && (
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {interview.interviewTime}
                                        </span>
                                    )}
                                </div>
                            </Link>
                            {interview.interviewLink && (
                                <a
                                    href={interview.interviewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 ml-2 text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition-colors"
                                >
                                    Join Interview →
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
