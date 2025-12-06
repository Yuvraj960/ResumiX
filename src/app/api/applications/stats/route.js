import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import ApplicationRecord from '@/models/ApplicationRecord';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Get all applications for the user
        const applications = await ApplicationRecord.find({
            userId: session.user.id,
        });

        // Calculate statistics
        const totalApplications = applications.length;

        const statusCounts = {
            Applied: 0,
            'Under Review': 0,
            'Interview Scheduled': 0,
            Offer: 0,
            Rejected: 0,
        };

        applications.forEach((app) => {
            if (statusCounts[app.status] !== undefined) {
                statusCounts[app.status]++;
            }
        });

        // Get upcoming interviews (next 3)
        const now = new Date();
        const upcomingInterviews = applications
            .filter((app) => app.interviewDate && new Date(app.interviewDate) >= now)
            .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
            .slice(0, 3)
            .map((app) => ({
                id: app._id,
                companyName: app.companyName,
                jobTitle: app.jobTitle,
                interviewDate: app.interviewDate,
                interviewTime: app.interviewTime,
                interviewLink: app.interviewLink,
            }));

        return NextResponse.json(
            {
                totalApplications,
                statusCounts,
                upcomingInterviews,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
