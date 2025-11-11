# 🚀 Deployment Guide - Making Your Form LIVE

This guide will help you deploy your Kids Junior Fashion Week Registration System to the internet so anyone can access it.

---

## 📋 Pre-Deployment Checklist

Before deploying, complete these steps:

### 1. Install New Dependencies

```bash
npm install
```

This will install the newly added packages:
- `dotenv` - Environment variable management
- `nodemailer` - Email notifications (optional)

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```bash
# Copy the example file
cp env.example .env
```

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# 🔐 IMPORTANT: Set Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!

# 📧 Email Notifications (Optional)
ENABLE_EMAIL_NOTIFICATIONS=false
```

**⚠️ CRITICAL**: Change the default password before going live!

### 3. Test Locally

```bash
npm start
```

Try to access:
- ✅ Registration Form: http://localhost:3000
- ✅ Admin Dashboard: http://localhost:3000/admin (should prompt for login)

---

## 🌐 Deployment Options

Choose the best option for your needs:

### Option 1: Railway (RECOMMENDED) ⭐

**Best for**: File uploads, persistent storage, easy setup

**Why Railway?**
- ✅ Free tier available
- ✅ Persistent file storage
- ✅ Automatic HTTPS
- ✅ Easy database integration
- ✅ Great for production

**Steps:**

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub or email

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login**
   ```bash
   railway login
   ```

4. **Initialize Project**
   ```bash
   railway init
   ```
   - Choose "Create new project"
   - Name it: "kids-fashion-week"

5. **Set Environment Variables**
   ```bash
   railway variables set ADMIN_USERNAME=admin
   railway variables set ADMIN_PASSWORD=YourSecurePassword123!
   railway variables set NODE_ENV=production
   ```

6. **Deploy**
   ```bash
   railway up
   ```

7. **Generate Public Domain**
   ```bash
   railway domain
   ```

8. **Your site is LIVE!** 🎉
   - Railway will provide a URL like: https://kids-fashion-week.up.railway.app
   - Share this URL with users!

**Custom Domain (Optional):**
```bash
railway domain your-domain.com
```

---

### Option 2: Render

**Best for**: Simple deployment, free tier, GitHub integration

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose the repository

4. **Configure Service**
   - **Name**: kids-fashion-week
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables**
   - Click "Environment" tab
   - Add these variables:
     ```
     ADMIN_USERNAME = admin
     ADMIN_PASSWORD = YourSecurePassword123!
     NODE_ENV = production
     ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)

7. **Your site is LIVE!** 🎉
   - URL: https://kids-fashion-week.onrender.com

**⚠️ Note**: Render free tier spins down after inactivity, may take 30s to wake up.

---

### Option 3: Vercel

**Best for**: Quick deployment, great for demos

**⚠️ Limitation**: Vercel has limited file storage. Use for testing only.

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Scope: Choose your account
   - Link to existing project? **No**
   - Project name: **kids-fashion-week**
   - Directory: **./** (current)
   - Override settings? **No**

4. **Set Environment Variables**
   ```bash
   vercel env add ADMIN_USERNAME
   # Enter: admin
   
   vercel env add ADMIN_PASSWORD
   # Enter: YourSecurePassword123!
   ```

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

6. **Your site is LIVE!** 🎉

---

### Option 4: Heroku

**Steps:**

1. **Install Heroku CLI**
   - Download from: https://devcenter.heroku.com/articles/heroku-cli

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create kids-fashion-week
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set ADMIN_USERNAME=admin
   heroku config:set ADMIN_PASSWORD=YourSecurePassword123!
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

---

### Option 5: Traditional VPS/Hosting

**For**: cPanel, Hostinger, DigitalOcean, AWS EC2, etc.

**Requirements:**
- SSH access
- Node.js installed on server
- PM2 for process management

**Steps:**

1. **Upload Files**
   - Use FTP/SFTP or Git to upload all files

2. **SSH into Server**
   ```bash
   ssh username@your-server.com
   ```

3. **Navigate to Project**
   ```bash
   cd /path/to/your/project
   ```

4. **Install Dependencies**
   ```bash
   npm install --production
   ```

5. **Create .env File**
   ```bash
   nano .env
   ```
   Add your environment variables

6. **Install PM2** (Process Manager)
   ```bash
   npm install -g pm2
   ```

7. **Start with PM2**
   ```bash
   pm2 start server.js --name "fashion-week"
   pm2 save
   pm2 startup
   ```

8. **Configure Reverse Proxy**
   
   **For Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Setup SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🔒 Post-Deployment Security

### 1. Verify Admin Protection

Visit: `https://your-domain.com/admin`

You should see a login prompt. If not:
- Check that `.env` file has `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- Restart the server
- Check server logs

### 2. Test Registration

1. Go to: `https://your-domain.com`
2. Fill out the form completely
3. Upload test photos and video
4. Submit
5. Check admin dashboard for the submission

### 3. Setup Backups

**Automated Backup Script** (see `backup-data.bat` for Windows):

```bash
# Create backup directory
mkdir -p backups

# Backup registrations
cp data/registrations.json backups/registrations_$(date +%Y%m%d_%H%M%S).json

# Backup uploads
tar -czf backups/uploads_$(date +%Y%m%d_%H%M%S).tar.gz uploads/
```

**Schedule Regular Backups:**

**Windows Task Scheduler:**
- Create task to run `backup-data.bat` daily

**Linux Cron:**
```bash
# Run daily at 2 AM
0 2 * * * /path/to/backup-script.sh
```

---

## 📧 Email Notifications Setup (Optional)

To receive email notifications when someone registers:

### 1. Enable Gmail App Password

1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to: https://myaccount.google.com/apppasswords
4. Create new app password
5. Copy the 16-character password

### 2. Update .env File

```env
ENABLE_EMAIL_NOTIFICATIONS=true
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
NOTIFICATION_EMAIL=where-to-receive@notifications.com
```

### 3. Restart Server

The system will now send email notifications for new registrations!

---

## 🎨 Custom Domain Setup

### Railway

```bash
railway domain your-domain.com
```

Add DNS records:
```
Type: CNAME
Name: www
Value: your-app.up.railway.app
```

### Render

1. Go to Dashboard → Settings → Custom Domain
2. Add: your-domain.com
3. Update DNS:
   ```
   Type: CNAME
   Name: www
   Value: your-app.onrender.com
   ```

### Vercel

```bash
vercel domains add your-domain.com
```

---

## 📊 Monitoring & Maintenance

### View Server Logs

**Railway:**
```bash
railway logs
```

**Render:**
- Dashboard → Logs tab

**Heroku:**
```bash
heroku logs --tail
```

**VPS (PM2):**
```bash
pm2 logs fashion-week
```

### Monitor Registrations

- Access admin dashboard regularly
- Check email notifications (if enabled)
- Export CSV periodically for backup

### Update Application

**Railway/Render/Vercel:**
```bash
git push origin main
# Automatic deployment!
```

**Heroku:**
```bash
git push heroku main
```

**VPS:**
```bash
git pull
npm install
pm2 restart fashion-week
```

---

## 🆘 Troubleshooting

### Site is Down

1. **Check Server Status**
   - Railway: Check dashboard
   - Render: Check status page
   - VPS: `pm2 status`

2. **View Logs**
   - Look for error messages
   - Check for port conflicts

3. **Verify Environment Variables**
   - Ensure all required variables are set
   - No typos in variable names

### Admin Login Not Working

1. **Check .env file**
   - Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
   - No spaces or quotes needed

2. **Try clearing browser cache**
   - Or use incognito mode

3. **Restart server**

### File Uploads Failing

1. **Check file size limits**
   - Current limit: 50MB per file
   - Photos: 5MB each
   - Video: 50MB

2. **Check storage space**
   - Ensure server has enough space

3. **Check upload directory permissions**
   ```bash
   chmod -R 755 uploads/
   ```

### Email Notifications Not Working

1. **Check .env settings**
   - `ENABLE_EMAIL_NOTIFICATIONS=true`
   - Valid Gmail app password
   - Correct email addresses

2. **Check server logs**
   - Look for email-related errors

3. **Test email configuration**
   - Try sending a test email

---

## 📈 Scaling for High Traffic

### Use a CDN
- Cloudflare (Free)
- KeyCDN
- AWS CloudFront

### Upgrade Database
Replace JSON file storage with:
- **MongoDB Atlas** (Free tier available)
- **PostgreSQL** (Railway includes it)
- **MySQL**

### Upgrade Hosting Plan
- Railway: Upgrade to Hobby plan
- Render: Upgrade from Free tier
- Use load balancer for multiple instances

---

## ✅ Success! Your Form is Live!

**Share these URLs:**

📝 **Registration Form:**
```
https://your-domain.com
```

👨‍💼 **Admin Dashboard:**
```
https://your-domain.com/admin
Username: [as set in .env]
Password: [as set in .env]
```

---

## 🎉 Next Steps

1. ✅ Test the registration form thoroughly
2. ✅ Share the URL with participants
3. ✅ Monitor the admin dashboard daily
4. ✅ Setup automated backups
5. ✅ Configure email notifications
6. ✅ Add your custom domain
7. ✅ Promote your event!

---

## 📞 Need Help?

- Check server logs for errors
- Review the troubleshooting section
- Check documentation:
  - [Railway Docs](https://docs.railway.app)
  - [Render Docs](https://render.com/docs)
  - [Vercel Docs](https://vercel.com/docs)

---

**🚀 Congratulations! Your registration system is now LIVE and accepting submissions!**

