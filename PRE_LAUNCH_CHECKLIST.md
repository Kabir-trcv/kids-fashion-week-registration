# ✅ Pre-Launch Checklist

Use this checklist to ensure your Kids Junior Fashion Week Registration System is ready for production!

---

## 📋 Phase 1: Local Setup & Testing

### Installation
- [ ] Node.js installed (version 14+)
- [ ] Project files downloaded/extracted
- [ ] Opened terminal in project directory
- [ ] Ran `npm install` successfully
- [ ] No error messages during installation

### Basic Functionality Test
- [ ] Server starts with `npm start`
- [ ] Can access form at http://localhost:3000
- [ ] Can access admin at http://localhost:3000/admin
- [ ] No console errors

### Registration Form Test
- [ ] Fill out all child information fields
- [ ] Fill out all parent/guardian fields
- [ ] Upload 3 photos (left, right, front)
- [ ] Upload 30-second video
- [ ] Add Instagram handle (optional field)
- [ ] Check both agreement checkboxes
- [ ] Submit form successfully
- [ ] See success message with registration ID

### Admin Dashboard Test
- [ ] Can access admin dashboard
- [ ] See the test registration
- [ ] Can click to view full details
- [ ] Can view uploaded photos
- [ ] Can view uploaded video
- [ ] Can change status (Pending → Approved)
- [ ] Can change status (Approved → Rejected)
- [ ] Can search for registration by name
- [ ] Can filter by status
- [ ] Can export to CSV
- [ ] CSV file downloads correctly
- [ ] Can refresh to reload data

### Data Persistence Test
- [ ] Stop server (Ctrl+C)
- [ ] Restart server (`npm start`)
- [ ] Registration still appears in admin
- [ ] Photos still accessible
- [ ] Video still accessible
- [ ] All data intact

---

## 🔐 Phase 2: Security Configuration

### Environment Variables Setup
- [ ] Created `.env` file (or ran `setup-env.bat`)
- [ ] Set `ADMIN_USERNAME` (not "admin" in production!)
- [ ] Set `ADMIN_PASSWORD` (strong password, 12+ chars)
- [ ] Set `NODE_ENV=production`
- [ ] Saved `.env` file

### Security Test
- [ ] Restart server after creating `.env`
- [ ] Visit http://localhost:3000/admin
- [ ] Browser prompts for username/password
- [ ] Can login with correct credentials
- [ ] Cannot access with wrong credentials
- [ ] See security status in console on startup

### Credentials Strength Check
- [ ] Password is at least 12 characters
- [ ] Password includes uppercase letters
- [ ] Password includes lowercase letters
- [ ] Password includes numbers
- [ ] Password includes special characters
- [ ] Username is NOT "admin" (for production)
- [ ] Password is NOT saved in Git
- [ ] `.env` file is in `.gitignore`

---

## 📧 Phase 3: Email Notifications (Optional)

If you want email notifications:

### Gmail App Password Setup
- [ ] Enabled 2-Factor Authentication on Gmail
- [ ] Created App Password at https://myaccount.google.com/apppasswords
- [ ] Copied 16-character app password

### Email Configuration
- [ ] Set `ENABLE_EMAIL_NOTIFICATIONS=true` in `.env`
- [ ] Set `EMAIL_SERVICE=gmail` in `.env`
- [ ] Set `EMAIL_USER` with your Gmail address
- [ ] Set `EMAIL_PASSWORD` with app password
- [ ] Set `NOTIFICATION_EMAIL` where you want notifications
- [ ] Restart server

### Email Test
- [ ] Submit a test registration
- [ ] Receive email notification within 1 minute
- [ ] Email contains registration details
- [ ] Email formatting looks good
- [ ] Registration ID is included
- [ ] Timestamp is correct

If not using email:
- [ ] Set `ENABLE_EMAIL_NOTIFICATIONS=false` in `.env`

---

## 💾 Phase 4: Backup Strategy

### Backup Test
- [ ] Run backup script (`backup-data.bat` on Windows)
- [ ] Check `backups/` folder created
- [ ] See timestamped backup files
- [ ] Can read backup JSON file
- [ ] Backup includes all registrations

### Regular Backup Plan
- [ ] Decided on backup frequency (daily/weekly)
- [ ] Set up automated backup (Task Scheduler/Cron)
- [ ] Tested restore from backup
- [ ] Documented backup location
- [ ] Backup schedule documented

---

## 🎨 Phase 5: Customization (Optional)

### Branding
- [ ] Replaced `logo.png` with your logo
- [ ] Logo displays correctly on form
- [ ] Logo is appropriate size (~200x200px)
- [ ] Updated company name in HTML (if needed)
- [ ] Changed colors in `styles.css` (if needed)
- [ ] Replaced background video (if needed)

### Form Customization
- [ ] Event name is correct
- [ ] Year is correct (currently 2025)
- [ ] All required fields are appropriate
- [ ] Terms & conditions are accurate
- [ ] Contact information is up to date

---

## 🚀 Phase 6: Deployment Preparation

### Platform Selection
- [ ] Chosen hosting platform:
  - [ ] Railway (recommended for files)
  - [ ] Render (good free tier)
  - [ ] Vercel (fast deployment)
  - [ ] Heroku (traditional)
  - [ ] VPS/Traditional hosting
  - [ ] Other: _______________

### Pre-Deployment
- [ ] Read DEPLOYMENT_GUIDE.md for your platform
- [ ] Installed platform CLI (if needed)
- [ ] Created account on hosting platform
- [ ] Prepared deployment command
- [ ] Noted deployment requirements

### Environment Variables for Production
- [ ] List of all required environment variables
- [ ] Values prepared (without committing)
- [ ] Understand how to set them on platform
- [ ] Production credentials are different from dev

### Files Check
- [ ] All files in project directory
- [ ] `node_modules/` NOT being uploaded
- [ ] `.env` NOT being uploaded
- [ ] `uploads/` and `data/` NOT being uploaded initially
- [ ] `.gitignore` is working correctly

---

## 🌐 Phase 7: Deployment

### Deploy to Platform
- [ ] Followed platform-specific guide
- [ ] Deployment succeeded without errors
- [ ] Site is accessible at provided URL
- [ ] No 404 or 500 errors
- [ ] SSL/HTTPS is working

### Post-Deployment Test
- [ ] Registration form loads correctly
- [ ] Can submit a test registration
- [ ] Files upload successfully
- [ ] Admin dashboard accessible
- [ ] Admin login works with credentials
- [ ] Can view submissions in admin
- [ ] Photos display correctly
- [ ] Videos play correctly
- [ ] CSV export works
- [ ] Email notifications work (if enabled)

### Performance Check
- [ ] Page loads in under 3 seconds
- [ ] Form is responsive on mobile
- [ ] Admin dashboard is responsive
- [ ] No console errors in browser
- [ ] No broken links or images

---

## 🔒 Phase 8: Security Verification

### Production Security
- [ ] Admin dashboard requires login
- [ ] Strong password in use
- [ ] Cannot access admin without credentials
- [ ] HTTPS is working (padlock icon in browser)
- [ ] `.env` file is not in Git repository
- [ ] Environment variables set on hosting platform
- [ ] No sensitive data in source code

### Access Control
- [ ] Only authorized people have admin credentials
- [ ] Credentials documented securely (password manager)
- [ ] Backup admin account created (optional)
- [ ] Changed default username from "admin"

---

## 📊 Phase 9: Monitoring Setup

### Regular Checks
- [ ] Scheduled daily admin dashboard check
- [ ] Email notifications working (if enabled)
- [ ] Backup schedule set up
- [ ] Know how to view server logs
- [ ] Know how to restart server if needed

### Documentation
- [ ] Admin credentials documented (securely!)
- [ ] Deployment URL documented
- [ ] Hosting platform account details saved
- [ ] Emergency contacts defined
- [ ] Backup restoration process documented

---

## 📢 Phase 10: Launch Preparation

### URLs & Access
- [ ] Registration form URL ready to share:
  ```
  https://your-domain.com
  ```
- [ ] Admin dashboard URL saved:
  ```
  https://your-domain.com/admin
  ```
- [ ] Custom domain configured (if using)
- [ ] URLs tested from multiple devices

### Communication
- [ ] Registration URL added to event materials
- [ ] QR code generated for registration (optional)
- [ ] Social media posts prepared
- [ ] Email announcements ready
- [ ] Website updated with registration link

### Capacity Planning
- [ ] Understand hosting plan limits
- [ ] Know storage limits for files
- [ ] Have upgrade plan if needed
- [ ] Monitoring set up for usage

### Support Plan
- [ ] Technical contact designated
- [ ] Know how to troubleshoot common issues
- [ ] Have DEPLOYMENT_GUIDE.md accessible
- [ ] Server logs accessible
- [ ] Can make quick updates if needed

---

## ✅ Final Pre-Launch Verification

### Critical Checks (Do Not Skip!)
- [ ] ✅ Registration form works perfectly
- [ ] ✅ File uploads work (photos + video)
- [ ] ✅ Admin dashboard accessible
- [ ] ✅ Admin authentication working
- [ ] ✅ Data persists after server restart
- [ ] ✅ Backups can be created
- [ ] ✅ CSV export works
- [ ] ✅ HTTPS enabled (production)
- [ ] ✅ Mobile responsive
- [ ] ✅ Email notifications working (if enabled)

### Nice-to-Have (Recommended)
- [ ] 📧 Email notifications configured
- [ ] 🎨 Custom branding applied
- [ ] 🌐 Custom domain configured
- [ ] 📱 QR code for easy access
- [ ] 📊 Analytics/monitoring set up
- [ ] 🔄 Automated backups scheduled

---

## 🎉 Launch Checklist

### Day of Launch
- [ ] **2 hours before:** Test registration form
- [ ] **2 hours before:** Test admin dashboard
- [ ] **2 hours before:** Create backup
- [ ] **1 hour before:** Monitor server logs
- [ ] **At launch:** Share registration URL
- [ ] **After launch:** Monitor first few submissions
- [ ] **After launch:** Verify emails arriving (if enabled)
- [ ] **End of day:** Export CSV backup

### First Week Tasks
- [ ] **Daily:** Check admin dashboard for new registrations
- [ ] **Daily:** Respond to submissions promptly
- [ ] **Every 2-3 days:** Create backup
- [ ] **Weekly:** Export CSV
- [ ] **Weekly:** Review server logs
- [ ] **As needed:** Update registration status

---

## 🆘 Emergency Contacts

Document these before launch:

**Hosting Platform:**
- Platform: _______________
- Account email: _______________
- Dashboard URL: _______________

**Admin Access:**
- Username: _______________ (stored securely)
- Password: _______________ (stored in password manager)

**Technical Support:**
- Primary contact: _______________
- Backup contact: _______________
- Emergency email: _______________

**Important URLs:**
- Registration form: _______________
- Admin dashboard: _______________
- Hosting dashboard: _______________

---

## 📈 Success Metrics

Track these after launch:

- [ ] Total registrations received: _______
- [ ] Average registrations per day: _______
- [ ] Form completion rate: _______
- [ ] Technical issues encountered: _______
- [ ] Response time to registrations: _______
- [ ] User feedback: _______

---

## ✨ You're Ready to Launch!

If all critical items are checked, you're ready to go live! 🚀

### Final Steps:
1. **Create backup** of current state
2. **Document** all credentials securely
3. **Share** registration URL
4. **Monitor** first submissions closely
5. **Celebrate** your successful launch! 🎉

---

## 📞 Need Help?

**Resources:**
- [QUICK_START.md](QUICK_START.md) - Quick reference
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Detailed deployment
- [WHATS_NEW.md](WHATS_NEW.md) - Recent features
- [README.md](README.md) - Complete overview

**Common Issues:**
- Server won't start → Check port availability
- Admin login fails → Verify .env credentials
- Files won't upload → Check file size limits
- No email notifications → Verify email settings

---

**🎭 Ready to collect registrations for Kids Junior Fashion Week! Good luck! ✨**

