# 🎭 Kids Junior Fashion Week - Registration System

A beautiful, modern, and fully-functional registration system for kids fashion events with file upload capabilities and an admin dashboard.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

---

## ✨ Features

### Registration Form
- 📝 **Comprehensive Information Collection**
  - Child details (name, age, measurements)
  - Parent/Guardian contact information
  - Emergency contacts
  
- 📸 **Media Uploads**
  - 3 required photos (Left, Right, Front views)
  - 30-second introduction video
  - Drag & drop support
  - Real-time preview
  - File size validation
  
- 🎨 **Beautiful UI/UX**
  - Modern gradient design
  - Video background
  - Smooth animations
  - Confetti celebration on submission
  - Fully responsive (mobile, tablet, desktop)
  
- ✅ **Smart Validation**
  - Real-time form validation
  - Age calculation from date of birth
  - Phone number formatting
  - File type and size checks

### Admin Dashboard
- 📊 **Statistics Dashboard**
  - Total registrations count
  - Status breakdown (Pending/Approved/Rejected)
  
- 🔍 **Powerful Filtering**
  - Filter by status
  - Search by name, email, or ID
  - Real-time results
  
- 👀 **Registration Management**
  - View all submission details
  - Approve/Reject applications
  - Delete registrations
  - View uploaded photos and videos
  
- 📥 **Data Export**
  - Export to CSV format
  - All registration data included

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### For Local Testing

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - Registration Form: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

That's it! 🎉

### For Production Deployment

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Security** (IMPORTANT!)
   ```bash
   # Windows: Use setup wizard
   setup-env.bat
   
   # Or manually create .env file
   ```
   
   Set secure admin credentials:
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=YourSecurePassword123!
   ```

3. **Deploy to Platform**
   - See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions
   - Recommended: Railway, Render, or Vercel

📚 **Full guides:** [QUICK_START.md](QUICK_START.md) | [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📁 Project Structure

```
Registration Form/
├── index.html              # Main registration form
├── admin.html              # Admin dashboard
├── script.js               # Frontend JavaScript
├── styles.css              # Styling
├── server.js               # Backend server
├── package.json            # Dependencies
├── vercel.json            # Vercel deployment config
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── SETUP_INSTRUCTIONS.md  # Detailed setup guide
├── logo.png               # Company logo
├── background-video.mp4   # Background video
├── data/                  # Registration data (auto-created)
│   └── registrations.json
└── uploads/               # Uploaded files (auto-created)
    ├── photos/
    └── videos/
```

---

## 🖥️ Technologies Used

### Frontend
- HTML5
- CSS3 (Modern Flexbox & Grid)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js - Web framework
- Multer - File upload handling
- CORS - Cross-origin resource sharing

### Data Storage
- JSON file-based storage (data/registrations.json)
- File system for media uploads

---

## 📸 Screenshots

### Registration Form
Beautiful, user-friendly registration form with video background and smooth animations.

### Admin Dashboard
Comprehensive dashboard to manage all registrations with filtering, search, and export capabilities.

---

## 🔧 Configuration

### Change Server Port
Edit `server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your desired port
```

### Customize Colors
Edit `styles.css` (`:root` section):
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --accent-color: #ffa502;
}
```

### File Upload Limits
Edit `server.js`:
```javascript
limits: {
    fileSize: 50 * 1024 * 1024 // Current: 50MB, adjust as needed
}
```

---

## 🌐 Deployment

### Quick Deploy Options

#### Vercel (Recommended for Static)
```bash
npm install -g vercel
vercel
```

#### Railway (Recommended for File Uploads)
```bash
npm install -g @railway/cli
railway init
railway up
```

#### Render
1. Connect your GitHub repo
2. Set build command: `npm install`
3. Set start command: `npm start`

For detailed deployment instructions, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

## 🔐 Security Features

### ✅ Admin Authentication (IMPLEMENTED!)

The admin dashboard is now protected with HTTP Basic Authentication!

**Setup (Required for Production):**

1. **Create `.env` file:**
   ```bash
   # Windows
   setup-env.bat
   ```
   
   Or manually create:
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=YourSecurePassword123!
   ```

2. **Restart server:**
   ```bash
   npm start
   ```

3. **Access admin dashboard:**
   - Visit: http://localhost:3000/admin
   - Enter your credentials
   - Done! 🔒

**Security Features:**
- ✅ Password-protected admin dashboard
- ✅ All admin API endpoints secured
- ✅ Environment variable management
- ✅ HTTP Basic Authentication
- ✅ Configurable credentials

**For Local Testing:**
- Authentication is optional (disabled if no .env file)
- Create .env for production deployment

**⚠️ IMPORTANT:** Always use strong passwords in production!

---

## 📧 Email Notifications (Optional)

Get instant email alerts when someone registers!

**Setup:**

1. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Factor Authentication
   - Create App Password: https://myaccount.google.com/apppasswords

2. **Update `.env`:**
   ```env
   ENABLE_EMAIL_NOTIFICATIONS=true
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   NOTIFICATION_EMAIL=where-to-receive@notifications.com
   ```

3. **Restart server** - You'll now receive email notifications! 📬

**What you get:**
- ✅ Instant notification on new registration
- ✅ Child and parent information in email
- ✅ Registration ID for tracking
- ✅ Timestamp of submission

---

## 📊 Data Management

### Backup Data

**Windows:**
```bash
backup-data.bat
```

**Manual:**
```bash
# Backup registrations
cp data/registrations.json data/registrations_backup_$(date +%Y%m%d).json

# Backup uploads
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

**Backups are saved to:** `backups/` folder with timestamps

### View Registration Data
The data is stored in `data/registrations.json` in a readable JSON format.

### Export to CSV
Use the "Export CSV" button in the admin dashboard.

---

## 🔄 API Endpoints

### GET `/api/registrations`
Get all registrations

### GET `/api/registrations/:id`
Get a specific registration

### POST `/api/submit`
Submit a new registration (with multipart/form-data)

### PATCH `/api/registrations/:id/status`
Update registration status
```json
{
  "status": "approved" | "rejected" | "pending"
}
```

### DELETE `/api/registrations/:id`
Delete a registration

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Kill the process or change port in server.js
```

### File Upload Issues
- Check file size limits
- Ensure `uploads/` directory has write permissions
- Verify file types are allowed (images and videos only)

### Data Not Persisting
- Ensure `data/` directory exists and has write permissions
- Check server logs for errors
- Verify JSON file is not corrupted

For more troubleshooting, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

## ✨ Recently Added

- [x] **Admin authentication** - Password-protected dashboard ✅
- [x] **Email notifications** - Get notified on new registrations ✅
- [x] **Environment variables** - Secure configuration management ✅
- [x] **Backup scripts** - One-click data backup (Windows) ✅
- [x] **Comprehensive deployment guides** - Railway, Render, Vercel, etc. ✅
- [x] **Production-ready security** - All admin endpoints protected ✅

## 🚧 Future Enhancements

- [ ] Payment integration
- [ ] Multiple event support
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Image optimization/compression
- [ ] PDF export of registrations
- [ ] Multi-language support
- [ ] SMS notifications
- [ ] Calendar integration
- [ ] Bulk email to participants
- [ ] QR code generation for registrations

---

## 📝 Development

### Run in Development Mode
```bash
npm run dev
```
Uses nodemon for auto-reload on file changes.

### Project Requirements
- Node.js >= 14.0.0
- npm >= 6.0.0

---

## 🤝 Contributing

Feel free to fork this project and customize it for your events!

---

## 📄 License

MIT License - Free to use and modify

---

## 👨‍💻 Support

For detailed setup instructions and deployment guides, please refer to:
- [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

## 🎉 Credits

Built with ❤️ for kids fashion events

---

**Ready to go live? Follow the [setup instructions](SETUP_INSTRUCTIONS.md) to deploy your registration system!**
