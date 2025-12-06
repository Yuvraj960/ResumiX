import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongoose';
import ApplicationRecord from '@/models/ApplicationRecord';

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

        if (!application || !application.resumeFile) {
            return NextResponse.json(
                { error: 'Resume not found' },
                { status: 404 }
            );
        }

        // Convert base64 back to buffer
        const buffer = Buffer.from(application.resumeFile.data, 'base64');

        // Return file with appropriate headers
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': application.resumeFile.contentType,
                'Content-Disposition': `attachment; filename="${application.resumeFile.filename}"`,
            },
        });
    } catch (error) {
        console.error('Error downloading resume:', error);
        return NextResponse.json(
            { error: 'Failed to download resume' },
            { status: 500 }
        );
    }
}
