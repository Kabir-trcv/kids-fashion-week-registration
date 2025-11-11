# ⚡ Quick Start Guide

Get your Kids Junior Fashion Week Registration System up and running in 5 minutes!

---

## 🎯 For First-Time Setup (Local Testing)

### Windows Users (Easiest Way)

1. **Double-click:** `install-and-start.bat`
   - This will install everything and start the server automatically!

2. **Open your browser:**
   - Registration Form: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

**That's it!** 🎉

---

## 🎯 Manual Setup (All Platforms)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment (REQUIRED for production)

**Option A - Use Setup Script (Windows):**
```bash
setup-env.bat
```

**Option B - Manual:**
Create a `.env` file:
```env
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
ENABLE_EMAIL_NOTIFICATIONS=false
```

### Step 3: Start Server

```bash
npm start
```

### Step 4: Access Application

- 📝 **Registration Form:** http://localhost:3000
- 👨‍💼 **Admin Dashboard:** http://localhost:3000/admin

---

## 🌐 Make It LIVE (Production Deployment)

Choose one platform:

### Option 1: Railway (RECOMMENDED) ⭐

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up
railway domain
```

**Your site is LIVE!** Share the URL! 🎉

### Option 2: Render

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

### Option 3: Vercel (Quick & Easy)

```bash
# Install Vercel
npm install -g vercel

# Deploy
vercel
```

📚 **Full deployment instructions:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## ✅ What's Included

### ✨ Registration Form Features
- Beautiful, responsive design
- Photo uploads (3 required: left, right, front)
- Video upload (30-second intro)
- Real-time validation
- Smooth animations
- Success notifications

### 👨‍💼 Admin Dashboard Features
- View all registrations
- Filter by status (pending/approved/rejected)
- Search functionality
- Approve/Reject applications
- Delete registrations
- View uploaded photos and videos
- Export to CSV
- **🔒 Password protected** (when configured)

### 🔐 Security Features
- Admin authentication
- File type validation
- File size limits
- Input sanitization

### 📧 Optional Features
- Email notifications on new registrations
- Automated backups

---

## 🔒 Security Setup (IMPORTANT!)

### For Local Testing
You can skip authentication by not creating a `.env` file.

### For Production (REQUIRED!)
**ALWAYS** set admin credentials:

```env
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-secure-password
```

Without this, **anyone can access your admin dashboard!**

---

## 💾 Data Storage

Your data is stored locally in:
- **Registration Data:** `data/registrations.json`
- **Photos:** `uploads/photos/`
- **Videos:** `uploads/videos/`

### Backup Your Data

**Windows:**
```bash
backup-data.bat
```

**Manual:**
```bash
# Backup registrations
cp data/registrations.json backups/

# Backup uploads
zip -r backups/uploads.zip uploads/
```

---

## 📧 Email Notifications Setup (Optional)

Want to receive emails when someone registers?

### 1. Get Gmail App Password
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Create App Password: https://myaccount.google.com/apppasswords
4. Copy the 16-character password

### 2. Update .env
```env
ENABLE_EMAIL_NOTIFICATIONS=true
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
NOTIFICATION_EMAIL=where-to-receive@notifications.com
```

### 3. Restart Server
```bash
npm start
```

Done! You'll now receive email notifications! 📬

---

## 🎨 Customization

### Change Colors
Edit `styles.css` (lines 7-21):
```css
:root {
    --primary-color: #ff6b9d;  /* Your brand color */
    --secondary-color: #c44569;
    --accent-color: #ffa502;
}
```

### Change Logo
Replace `logo.png` with your logo (recommended: 200x200px)

### Change Background Video
Replace `background-video.mp4` with your video

### Change Port
Edit `.env`:
```env
PORT=3001
```

---

## 🆘 Troubleshooting

### "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org

### "Port 3000 already in use"
**Solution:** Change port in `.env` file or use:
```bash
PORT=3001 npm start
```

### Admin Login Not Working
**Solution:**
1. Create `.env` file with credentials
2. Restart server
3. Clear browser cache

### Files Not Uploading
**Solution:**
- Check file size (max 50MB for video, 5MB for photos)
- Check file types (images and videos only)
- Ensure `uploads/` directory exists

### Data Disappeared
**Solution:**
- Check `data/registrations.json` exists
- Check folder permissions
- Use backup script regularly

---

## 📱 Mobile Support

The system is fully responsive and works on:
- ✅ Desktop computers
- ✅ Laptops
- ✅ Tablets
- ✅ Mobile phones

---

## 🔄 Updates & Maintenance

### Update Dependencies
```bash
npm update
```

### View Registrations
1. Go to: http://localhost:3000/admin
2. Login with your credentials
3. View/manage all submissions

### Export Data
1. Open admin dashboard
2. Click "Export CSV" button
3. Save the file for backup

---

## 📚 Documentation

- **Overview:** [README.md](README.md)
- **Detailed Setup:** [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Start Here:** [START_HERE.txt](START_HERE.txt)

---

## 🎉 Success Checklist

- [x] Dependencies installed (`npm install`)
- [x] Server starts without errors
- [x] Can access registration form (localhost:3000)
- [x] Can submit test registration
- [x] Can access admin dashboard (localhost:3000/admin)
- [x] Can view submitted registrations
- [ ] Environment variables configured (`.env`)
- [ ] Deployed to production (Railway/Render/Vercel)
- [ ] Custom domain setup (optional)
- [ ] Email notifications working (optional)
- [ ] Backup strategy in place

---

## 🚀 Ready to Go Live?

1. ✅ Test thoroughly locally
2. ✅ Set up `.env` with secure credentials
3. ✅ Choose deployment platform
4. ✅ Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
5. ✅ Share your registration URL!

---

## 💡 Pro Tips

1. **Regular Backups:** Run `backup-data.bat` weekly
2. **Monitor Dashboard:** Check daily for new registrations
3. **Export CSV:** Keep offline copies of data
4. **Strong Password:** Use 12+ characters with symbols
5. **Test First:** Always test locally before deploying
6. **SSL Certificate:** Use HTTPS in production (automatic with Railway/Render/Vercel)

---

## 🎭 Your Registration System is Ready!

**Local URLs:**
- Registration: http://localhost:3000
- Admin: http://localhost:3000/admin

**After Deployment:**
- Registration: https://your-domain.com
- Admin: https://your-domain.com/admin

---

**Need help? Check the troubleshooting sections in our documentation!**

**Happy registering! 🎉**

