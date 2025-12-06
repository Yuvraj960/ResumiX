# Job Application Tracker - ResumiX

A comprehensive job application management system designed to help you organize, track, and optimize your job search journey with tailored resume management.

## 🎯 Overview

**ResumiX** is a full-stack web application that helps job seekers maintain organized records of their job applications, schedule interviews, and manage tailored resumes for each position. Track your application status from initial submission through offer stage, all in one intuitive dashboard.

## ✨ Key Features

### 📋 Application Tracking
- **Comprehensive Application Records**: Store detailed information about each job application including company name, job title, and job description
- **Status Management**: Track applications through 5 stages: Applied, Under Review, Interview Scheduled, Offer, Rejected
- **Custom Tags**: Organize applications with custom tags (e.g., #DreamCompany, #Referral, #HighSalary)
- **Smart Search & Filter**: Find applications by company, job title, status, or tags
- **Advanced Sorting**: Sort by date applied, company name, job title, or status

### 📄 Resume Management
- **Tailored Resume Upload**: Upload PDF or DOCX files tailored specifically for each application
- **One-Click Download**: Quickly access and download your tailored resumes
- **File Management**: Store resume files securely with automatic metadata tracking

### 📅 Interview Scheduling
- **Interview Details**: Log interview dates, times, and meeting links (Zoom/Google Meet URLs)
- **Upcoming Interviews Widget**: View your next 3 scheduled interviews at a glance on the dashboard
- **Interview Notes**: Prepare with detailed interview preparation notes and key takeaways

### 📊 Analytics Dashboard
- **Real-time Statistics**: View total applications, under-review count, scheduled interviews, and offer count
- **Status Distribution**: Visual breakdown of application status across all applications
- **Progress Insights**: Monitor your job search performance with key metrics

### 🔐 Security & Authentication
- **Secure Authentication**: NextAuth.js with JWT-based session management
- **Password Encryption**: bcryptjs encryption for secure password storage
- **User Isolation**: Each user's applications are completely isolated and private

## 🛠 Technology Stack

### Frontend
- **Next.js 16.0.4**: React framework with App Router
- **React 19.2.0**: UI component library
- **Tailwind CSS 4**: Utility-first CSS styling
- **next-auth 4.24.13**: Authentication and authorization

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB 9.0.0**: NoSQL database for data persistence
- **Mongoose**: Object modeling for MongoDB
- **bcryptjs**: Password hashing and security

### Development Tools
- **ESLint 9**: Code quality and linting
- **PostCSS 4**: CSS transformation

## 📦 Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── api/
│   │   ├── auth/                # Authentication endpoints
│   │   │   ├── [...nextauth]/   # NextAuth configuration
│   │   │   └── register/        # User registration
│   │   └── applications/        # Application CRUD endpoints
│   ├── dashboard/               # Dashboard pages
│   │   ├── page.js             # Main dashboard
│   │   ├── new/page.js         # New application form
│   │   └── [id]/page.js        # Application details
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── page.js                 # Home page
│   ├── layout.js               # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ApplicationCard.js       # Application display component
│   ├── StatsCard.js            # Statistics display
│   ├── InterviewWidget.js      # Upcoming interviews widget
│   └── SessionProvider.js      # NextAuth session provider
├── lib/
│   └── mongoose.js             # MongoDB connection handler
├── models/
│   ├── User.js                 # User schema
│   └── ApplicationRecord.js    # Application schema
└── middleware.js               # NextAuth middleware

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB database (local or cloud)
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key_here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/[...nextauth]` - NextAuth endpoints (signin, callback, etc.)

### Applications
- `GET /api/applications` - Fetch all applications with filters
- `POST /api/applications` - Create new application
- `GET /api/applications/[id]` - Get single application details
- `PUT /api/applications/[id]` - Update application
- `DELETE /api/applications/[id]` - Delete application
- `GET /api/applications/[id]/download` - Download resume file
- `GET /api/applications/stats` - Get dashboard statistics

## 🎨 UI Features

### Dashboard
- Real-time statistics cards
- Upcoming interviews widget
- Application grid with cards
- Advanced search and filtering
- Responsive design for all devices

### Application Management
- Create new application with form validation
- View detailed application information
- Edit application status and notes
- Delete applications
- Download tailored resumes
- Interview scheduling interface

### Styling
- **Gradient UI**: Beautiful gradient backgrounds and buttons
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Ready**: Color scheme adaptable for themes
- **Smooth Animations**: Transitions and hover effects for better UX

## 🔒 Authentication & Security

- **JWT-based Sessions**: Secure token management
- **Password Hashing**: bcryptjs with salt rounds
- **Middleware Protection**: Automatic redirection to login for unauthenticated users
- **User Isolation**: Middleware ensures users can only access their own data
- **CORS Ready**: Configured for secure API access

## 🎯 Usage Guide

### Creating an Account
1. Visit the home page
2. Click "Sign Up"
3. Enter your name, email, and password
4. Account is created automatically

### Tracking an Application
1. Go to Dashboard
2. Click "+ New Application"
3. Fill in company name, job title, and job description
4. Optionally upload your tailored resume
5. Set the application status
6. Add tags for organization
7. Submit to save

### Scheduling an Interview
1. Open application details
2. Click "Edit"
3. Enter interview date, time, and meeting link
4. Add preparation notes
5. Save changes

### Managing Applications
1. Use search to find applications
2. Filter by status or tags
3. Sort by date, company, or other criteria
4. Click any application card for full details
5. Download resume files as needed

## 📊 Dashboard Statistics

- **Total Applications**: Count of all job applications
- **Under Review**: Applications being reviewed by companies
- **Interviews Scheduled**: Applications with confirmed interviews
- **Offers Received**: Applications resulting in job offers

## 🚀 Future Enhancements

- AI-powered resume matching score
- Smart job description analyzer
- Interview preparation recommendations
- Email reminders for upcoming interviews
- Export applications to CSV/PDF
- Integration with job boards (LinkedIn, Indeed)
- Mobile app version
- Collaborative features for job search groups

## 📄 License

MIT License 

This project is private and confidential.

## 👨‍💻 Author

Created with ❤️ for job seekers everywhere.

---

**Start organizing your job search today with ResumiX!** 🎯

For questions or support, please refer to the project documentation or contact the development team.