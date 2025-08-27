# Authentication Setup Guide

This guide will help you set up Google OAuth authentication for your Resume Craft application.

## 🚀 Features Added

- ✅ Google OAuth Sign-in/Sign-out
- ✅ User profile management with MongoDB
- ✅ Protected routes middleware
- ✅ Beautiful authentication UI with animations
- ✅ User profile dropdown with avatar
- ✅ Database integration for user data
- ✅ Profile page for editing user information

## 📋 Prerequisites

1. **MongoDB Database**: You need a MongoDB database (local or cloud)
2. **Google OAuth Credentials**: Set up Google OAuth in Google Cloud Console

## 🔧 Setup Instructions

### 1. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env.local` with your connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-craft?retryWrites=true&w=majority
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 3. Environment Variables

Your `.env.local` file should contain:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB Database
MONGODB_URI=mongodb://localhost:27017/resume-craft
```

### 4. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 5. Start the Application

```bash
npm run dev
```

## 🧪 Testing the Setup

1. **Test Database Connection**:
   Visit `http://localhost:3000/api/test-db` to verify MongoDB connection

2. **Test Authentication**:
   - Click "Sign In" button in header
   - Sign in with Google
   - Check if profile dropdown appears
   - Visit `/profile` to see user profile page

## 📱 How It Works

### Authentication Flow
1. User clicks "Sign In" → Redirected to Google OAuth
2. After successful authentication → User data saved to MongoDB
3. User session managed by NextAuth.js
4. Protected routes require authentication

### Components Added

- **`AuthProvider`**: Wraps app with NextAuth session provider
- **`AuthButton`**: Smart button that shows sign-in or user profile
- **`UserProfile`**: Dropdown with user info and navigation
- **`SignIn/SignOut Pages`**: Beautiful authentication pages
- **`Profile Page`**: User profile management
- **`Middleware`**: Protects routes requiring authentication

### Database Schema

Users are automatically stored in MongoDB with this structure:
```javascript
{
  _id: ObjectId,
  name: "User Name",
  email: "user@example.com",
  image: "https://profile-image-url",
  emailVerified: null,
  bio: "User bio",
  location: "City, Country",
  website: "https://website.com",
  phone: "+1234567890",
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Features

- **Responsive Design**: Works on all devices
- **Smooth Animations**: Framer Motion animations
- **Modern UI**: Tailwind CSS with gradients and shadows
- **Profile Pictures**: Google profile images integrated
- **Loading States**: Proper loading indicators
- **Error Handling**: Toast notifications for errors

## 🔒 Security Features

- **Protected Routes**: Middleware protects sensitive pages
- **Session Management**: Secure session handling
- **CSRF Protection**: Built-in NextAuth security
- **Environment Variables**: Sensitive data in env files

## 🚀 Next Steps

1. **Customize Styling**: Modify colors and design to match your brand
2. **Add More Providers**: Add GitHub, Facebook, etc.
3. **User Roles**: Implement admin/user roles
4. **Email Verification**: Add email verification flow
5. **Password Reset**: Add password reset functionality

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Check if MongoDB is running
   - Verify connection string in `.env.local`
   - Test with `/api/test-db` endpoint

2. **Google OAuth Error**:
   - Verify client ID and secret
   - Check redirect URIs in Google Console
   - Ensure NEXTAUTH_URL matches your domain

3. **Session Issues**:
   - Clear browser cookies
   - Restart development server
   - Check NEXTAUTH_SECRET is set

### Debug Mode

Add to `.env.local` for debugging:
```env
NEXTAUTH_DEBUG=true
```

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Check server logs in terminal
3. Verify all environment variables are set
4. Test database connection endpoint

Your authentication system is now ready! Users can sign in with Google, manage their profiles, and access protected features of your resume builder.