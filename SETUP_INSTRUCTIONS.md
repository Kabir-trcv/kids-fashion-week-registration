# Kids Junior Fashion Week - Registration System
## Setup & Deployment Instructions

---

## 📋 Table of Contents
1. [Local Setup](#local-setup)
2. [Running Locally](#running-locally)
3. [Deployment Options](#deployment-options)
4. [Admin Dashboard Access](#admin-dashboard-access)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Local Setup

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Step 1: Install Dependencies
Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- `express` - Web server framework
- `multer` - File upload handling
- `cors` - Cross-origin resource sharing

### Step 2: Create Required Directories
The server will automatically create these directories on first run:
- `uploads/photos/` - Stores uploaded photos
- `uploads/videos/` - Stores uploaded videos
- `data/` - Stores registration data (JSON file)

---

## 💻 Running Locally

### Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### Access the Application

Once the server is running, open your browser:

- **Registration Form**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

You should see a message in the terminal:
```
Kids Junior Fashion Week Registration System
Server running on http://localhost:3000
Admin Dashboard: http://localhost:3000/admin
```

---

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Recommended - Free)

Vercel is perfect for Node.js applications and offers free hosting.

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy
   - Link to existing project? **No**
   - Project name: **kids-fashion-week**
   - Directory: **./** (current directory)
   - Override settings? **No**

5. **Production Deployment**:
   ```bash
   vercel --prod
   ```

**Note**: Vercel has limitations with file uploads. For production use with file uploads, consider Option 2 or 3.

---

### Option 2: Deploy to Railway (Recommended for File Uploads)

Railway provides persistent storage and is great for applications with file uploads.

1. **Create Railway Account**: Visit https://railway.app

2. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

3. **Login**:
   ```bash
   railway login
   ```

4. **Initialize Project**:
   ```bash
   railway init
   ```

5. **Deploy**:
   ```bash
   railway up
   ```

6. **Generate Domain**:
   ```bash
   railway domain
   ```

Your app will be live with a Railway-provided URL!

---

### Option 3: Deploy to Render (Free Tier Available)

1. **Create Render Account**: Visit https://render.com

2. **Create New Web Service**:
   - Connect your GitHub repository (recommended) or deploy from local
   - Choose "Web Service"
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Configure**:
   - Environment: Node
   - Region: Choose closest to your users
   - Branch: main

4. **Deploy**: Click "Create Web Service"

---

### Option 4: Deploy to Heroku

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli

2. **Login**:
   ```bash
   heroku login
   ```

3. **Create App**:
   ```bash
   heroku create kids-fashion-week
   ```

4. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

5. **Open App**:
   ```bash
   heroku open
   ```

---

### Option 5: Traditional Web Hosting (VPS/Shared Hosting)

If you have a traditional web host with SSH access:

1. **Upload Files**: Use FTP/SFTP to upload all files

2. **SSH into Server**:
   ```bash
   ssh username@your-server.com
   ```

3. **Navigate to Project**:
   ```bash
   cd /path/to/project
   ```

4. **Install Dependencies**:
   ```bash
   npm install
   ```

5. **Install PM2** (Process Manager):
   ```bash
   npm install -g pm2
   ```

6. **Start with PM2**:
   ```bash
   pm2 start server.js --name "fashion-week"
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx/Apache** to proxy to port 3000

---

## 🔐 Admin Dashboard Access

### Accessing the Dashboard

- **Local**: http://localhost:3000/admin
- **Production**: https://your-domain.com/admin

### Features

1. **View All Registrations**: See all submitted registrations in cards
2. **Filter by Status**: Filter by pending/approved/rejected
3. **Search**: Search by name, email, or registration ID
4. **Approve/Reject**: Update registration status
5. **Delete**: Remove registrations permanently
6. **View Media**: Click on photos/videos to view full size
7. **Export CSV**: Download all registration data as CSV

### Security Recommendations

⚠️ **Important**: The admin dashboard is currently unprotected!

For production, add authentication:

1. **Basic Auth** (Quick Solution):
   Add this to `server.js` before routes:
   ```javascript
   const basicAuth = require('express-basic-auth');
   
   app.use('/admin', basicAuth({
       users: { 'admin': 'your-secure-password' },
       challenge: true
   }));
   ```

2. **Install the package**:
   ```bash
   npm install express-basic-auth
   ```

3. **Better Solution**: Implement proper JWT-based authentication

---

## 🔧 Troubleshooting

### Server Won't Start

**Problem**: Port 3000 is already in use

**Solution**: Change the port in `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Changed to 3001
```

---

### File Uploads Failing

**Problem**: File size too large

**Solution**: Increase limit in `server.js`:
```javascript
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Increase to 100MB
    }
});
```

---

### Photos/Videos Not Displaying

**Problem**: Uploaded files not accessible

**Solution**: Ensure the uploads directory is served:
```javascript
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

This line should already be in `server.js` (via `express.static`).

---

### Registration Data Lost

**Problem**: Data disappears after server restart

**Solution**: 
- Ensure `data/registrations.json` has proper write permissions
- For production, consider using a proper database (MongoDB, PostgreSQL)

---

### Background Video Not Playing

**Problem**: Video doesn't autoplay on mobile

**Solution**: This is a browser limitation. The overlay will show instead.
Add a fallback background in `styles.css` for the `.video-overlay` class.

---

## 📊 Data Storage

### Current Implementation
- Registration data is stored in `data/registrations.json`
- Photos are stored in `uploads/photos/`
- Videos are stored in `uploads/videos/`

### Upgrading to Database (Optional)

For production with many registrations, consider using a database:

**MongoDB Example**:
```bash
npm install mongoose
```

**PostgreSQL Example**:
```bash
npm install pg
```

---

## 🔄 Updating the Application

### Local Updates
```bash
# Pull latest changes
git pull

# Install any new dependencies
npm install

# Restart server
npm start
```

### Production Updates

**Vercel/Railway/Render**: Push to GitHub, automatic deployment

**Heroku**:
```bash
git add .
git commit -m "Update message"
git push heroku main
```

**VPS**:
```bash
git pull
npm install
pm2 restart fashion-week
```

---

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablet (768px - 1366px)
- ✅ Mobile (320px - 768px)

---

## 🎨 Customization

### Change Colors
Edit `styles.css` in the `:root` section:
```css
:root {
    --primary-color: #ff6b9d;  /* Change to your brand color */
    --secondary-color: #c44569;
    --accent-color: #ffa502;
}
```

### Change Logo
Replace `logo.png` with your company logo (recommended size: 200x200px)

### Change Background Video
Replace `background-video.mp4` with your video

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the troubleshooting section
3. Check server logs for error messages
4. Ensure all dependencies are installed

---

## 📄 License

MIT License - Feel free to modify and use for your events!

---

**🎉 Congratulations! Your registration system is ready to go live!**

