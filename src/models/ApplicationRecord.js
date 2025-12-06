import mongoose from 'mongoose';

const ApplicationRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    companyName: {
        type: String,
        required: [true, 'Please provide a company name'],
        trim: true,
    },
    jobTitle: {
        type: String,
        required: [true, 'Please provide a job title'],
        trim: true,
    },
    jobDescription: {
        type: String,
        default: '',
    },
    resumeFile: {
        filename: String,
        contentType: String,
        data: String, // Base64 encoded file data
    },
    dateApplied: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Applied', 'Under Review', 'Interview Scheduled', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    interviewDate: {
        type: Date,
    },
    interviewTime: {
        type: String,
    },
    interviewLink: {
        type: String,
    },
    interviewNotes: {
        type: String,
        default: '',
    },
    tags: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the updatedAt timestamp before saving (Mongoose 8.x compatible)
ApplicationRecordSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

export default mongoose.models.ApplicationRecord ||
    mongoose.model('ApplicationRecord', ApplicationRecordSchema);
