# Email Setup Guide for Bug Reports

## Overview
Bug reports will be automatically sent to: **tasleemhadiqa76@gmail.com**

## Setup Steps

### 1. Enable Gmail App Password
1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. If not enabled, enable 2-Step Verification first
5. Once enabled, click **App passwords**
6. Select app: **Mail**
7. Select device: **Other (Custom name)**
8. Enter name: **HG Resume Craft**
9. Click **Generate**
10. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### 2. Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace `your-gmail-app-password-here` with the generated app password
3. Save the file

Example:
```
GMAIL_USER=tasleemhadiqa76@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### 3. Restart Development Server
```bash
npm run dev
```

## How It Works

### When a user reports a bug:
1. **You receive an email** with:
   - Bug details (priority, type, location)
   - Issue description
   - Steps to reproduce
   - Reporter's contact info
   - Timestamp

2. **User receives confirmation** with:
   - Thank you message
   - Report summary
   - Report ID for tracking

### Email Features:
- ✅ Professional HTML formatting
- ✅ Priority color coding
- ✅ Automatic timestamps
- ✅ Reporter contact information
- ✅ Confirmation emails to users
- ✅ Report ID for tracking

## Testing
1. Click the 🐛 bug report button (bottom left)
2. Fill out the form
3. Submit
4. Check your email: tasleemhadiqa76@gmail.com

## Troubleshooting
- If emails don't send, check the app password is correct
- Make sure 2-Step Verification is enabled on your Google account
- Check spam folder for test emails
- Restart the development server after changing .env.local