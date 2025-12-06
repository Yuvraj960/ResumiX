import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import ApplicationRecord from '@/models/ApplicationRecord';

// GET single application
export async function GET(request, context) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const params = await context.params;

        await dbConnect();

        const application = await ApplicationRecord.findOne({
            _id: params.id,
            userId: session.user.id,
        });

        if (!application) {
            return NextResponse.json(
                { error: 'Application not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ application }, { status: 200 });
    } catch (error) {
        console.error('Error fetching application:', error);
        return NextResponse.json(
            { error: 'Failed to fetch application' },
            { status: 500 }
        );
    }
}

// PUT - Update application
export async function PUT(request, context) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Await params in Next.js 15+
        const params = await context.params;
        const body = await request.json();

        await dbConnect();

        // Find and verify ownership
        const application = await ApplicationRecord.findOne({
            _id: params.id,
            userId: session.user.id,
        });

        if (!application) {
            return NextResponse.json(
                { error: 'Application not found' },
                { status: 404 }
            );
        }

        // Update fields
        const allowedUpdates = [
            'status',
            'interviewDate',
            'interviewTime',
            'interviewLink',
            'interviewNotes',
            'tags',
            'companyName',
            'jobTitle',
            'jobDescription',
            'dateApplied',
        ];

        allowedUpdates.forEach((field) => {
            if (body[field] !== undefined) {
                application[field] = body[field];
            }
        });

        application.updatedAt = new Date();
        await application.save();

        return NextResponse.json(
            { message: 'Application updated successfully', application },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating application:', error);
        return NextResponse.json(
            { error: 'Failed to update application' },
            { status: 500 }
        );
    }
}

// DELETE application
export async function DELETE(request, context) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Await params in Next.js 15+
        const params = await context.params;

        await dbConnect();

        const application = await ApplicationRecord.findOneAndDelete({
            _id: params.id,
            userId: session.user.id,
        });

        if (!application) {
            return NextResponse.json(
                { error: 'Application not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Application deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting application:', error);
        return NextResponse.json(
            { error: 'Failed to delete application' },
            { status: 500 }
        );
    }
}
