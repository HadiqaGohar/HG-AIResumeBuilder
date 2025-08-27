# 🚀 Free Deployment Guide

## MongoDB Atlas Setup (100% Free)

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up with Google/Email (FREE)
3. Create new project: "Resume Craft"

### Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose **M0 Sandbox (FREE FOREVER)**
3. Select closest region
4. Cluster Name: `resume-craft-cluster`
5. Click "Create Cluster"

### Step 3: Database Access
1. Go to "Database Access"
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `resumeuser`
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0)
4. Comment: "Vercel deployment"
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

Example connection string:
```
mongodb+srv://resumeuser:YOUR_PASSWORD@resume-craft-cluster.abc123.mongodb.net/resume-craft?retryWrites=true&w=majority
```

## Vercel Deployment

### Step 1: Prepare Environment Variables
Create `.env.production` file:
```env
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=mongodb+srv://resumeuser:YOUR_PASSWORD@resume-craft-cluster.abc123.mongodb.net/resume-craft?retryWrites=true&w=majority
```

### Step 2: Deploy to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Step 3: Update Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "Credentials"
4. Edit your OAuth 2.0 Client
5. Add authorized redirect URI:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

## Free Tier Limits

### MongoDB Atlas Free (M0)
- ✅ 512 MB storage
- ✅ Shared RAM and vCPU
- ✅ No time limit
- ✅ Automatic backups
- ✅ SSL encryption

### Vercel Free
- ✅ 100 GB bandwidth/month
- ✅ 100 deployments/day
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Edge functions

## Cost Breakdown
- **MongoDB Atlas**: $0/month (forever)
- **Vercel Hosting**: $0/month
- **Google OAuth**: $0 (free)
- **Domain** (optional): $10-15/year

## Scaling Options (When you grow)

### MongoDB Atlas Paid Tiers
- **M10**: $9/month (2 GB RAM, 10 GB storage)
- **M20**: $25/month (4 GB RAM, 20 GB storage)

### Vercel Pro
- **Pro**: $20/month (400 GB bandwidth, faster builds)

## Troubleshooting

### Common Issues
1. **Connection timeout**: Check Network Access whitelist
2. **Authentication failed**: Verify username/password
3. **Database not found**: Check database name in connection string

### Testing Connection
```bash
# Test MongoDB connection
curl -X GET http://localhost:3001/api/test-db

# Or after deployment
curl -X GET https://your-app.vercel.app/api/test-db
```

## Backup Strategy (Free)
1. MongoDB Atlas automatic backups (included)
2. GitHub repository (code backup)
3. Export user data via API (manual)

## Security Best Practices
1. Use strong passwords
2. Rotate secrets regularly
3. Monitor database access logs
4. Enable 2FA on all accounts
5. Use environment variables for secrets

Your app will be 100% free to run with these services! 🎉