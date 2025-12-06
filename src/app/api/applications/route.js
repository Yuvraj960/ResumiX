import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import ApplicationRecord from '@/models/ApplicationRecord';

// GET all applications for the authenticated user
export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const tag = searchParams.get('tag') || '';
        const sortBy = searchParams.get('sortBy') || 'dateApplied';
        const sortOrder = searchParams.get('sortOrder') || 'desc';

        let query = { userId: session.user.id };

        if (search) {
            query.$or = [
                { companyName: { $regex: search, $options: 'i' } },
                { jobTitle: { $regex: search, $options: 'i' } },
            ];
        }

        if (status) {
            query.status = status;
        }

        if (tag) {
            query.tags = tag;
        }

        // Fetch applications
        const applications = await ApplicationRecord.find(query)
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .lean();

        return NextResponse.json({ applications }, { status: 200 });
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch applications' },
            { status: 500 }
        );
    }
}

// POST - Create new application
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();

        const companyName = formData.get('companyName');
        const jobTitle = formData.get('jobTitle');
        const jobDescription = formData.get('jobDescription') || '';
        const dateApplied = formData.get('dateApplied');
        const status = formData.get('status') || 'Applied';
        const interviewDate = formData.get('interviewDate') || null;
        const interviewTime = formData.get('interviewTime') || '';
        const interviewLink = formData.get('interviewLink') || '';
        const tagsString = formData.get('tags') || '';
        const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

        const resumeFile = formData.get('resumeFile');

        // Validation
        if (!companyName || !jobTitle) {
            return NextResponse.json(
                { error: 'Company name and job title are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Process resume file
        let resumeData = null;
        if (resumeFile && resumeFile.size > 0) {
            const bytes = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = buffer.toString('base64');

            resumeData = {
                filename: resumeFile.name,
                contentType: resumeFile.type,
                data: base64,
            };
        }

        // Create application record
        const application = await ApplicationRecord.create({
            userId: session.user.id,
            companyName,
            jobTitle,
            jobDescription,
            resumeFile: resumeData,
            dateApplied: dateApplied ? new Date(dateApplied) : new Date(),
            status,
            interviewDate: interviewDate ? new Date(interviewDate) : null,
            interviewTime,
            interviewLink,
            tags,
        });

        return NextResponse.json(
            { message: 'Application created successfully', application },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating application:', error);
        return NextResponse.json(
            { error: 'Failed to create application' },
            { status: 500 }
        );
    }
}
