const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Load environment variables (Vercel provides them automatically)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Only enable authentication if credentials are set
const ADMIN_AUTH_ENABLED = process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD;

// Email configuration (optional)
const EMAIL_ENABLED = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true';
let nodemailer;
let transporter;

if (EMAIL_ENABLED) {
    try {
        nodemailer = require('nodemailer');
        transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    } catch (error) {
        console.warn('⚠️  Email notifications disabled: nodemailer not installed');
    }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Admin Authentication Middleware
const adminAuthMiddleware = (req, res, next) => {
    if (!ADMIN_AUTH_ENABLED) {
        // No authentication configured, allow access
        return next();
    }

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Dashboard"');
        return res.status(401).json({ error: 'Authentication required' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Admin Dashboard"');
        return res.status(401).json({ error: 'Invalid credentials' });
    }
};

// Email notification function
async function sendEmailNotification(registration) {
    if (!EMAIL_ENABLED || !transporter) {
        return;
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: `New Registration: ${registration.childInfo.firstName} ${registration.childInfo.lastName}`,
            html: `
                <h2>🎭 New Fashion Week Registration</h2>
                <hr>
                <h3>Registration ID: ${registration.id}</h3>
                
                <h4>Child Information:</h4>
                <ul>
                    <li><strong>Name:</strong> ${registration.childInfo.firstName} ${registration.childInfo.lastName}</li>
                    <li><strong>Age:</strong> ${registration.childInfo.age} years</li>
                    <li><strong>Gender:</strong> ${registration.childInfo.gender}</li>
                    <li><strong>Height:</strong> ${registration.childInfo.height} cm</li>
                </ul>
                
                <h4>Parent/Guardian Information:</h4>
                <ul>
                    <li><strong>Name:</strong> ${registration.parentInfo.firstName} ${registration.parentInfo.lastName}</li>
                    <li><strong>Email:</strong> ${registration.parentInfo.email}</li>
                    <li><strong>Phone:</strong> ${registration.parentInfo.phone}</li>
                    <li><strong>Relationship:</strong> ${registration.parentInfo.relationship}</li>
                </ul>
                
                <p><strong>Submitted at:</strong> ${new Date(registration.submittedAt).toLocaleString()}</p>
                
                <p>View full details in the admin dashboard.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email notification sent for registration: ${registration.id}`);
    } catch (error) {
        console.error('❌ Failed to send email notification:', error.message);
    }
}

// Create necessary directories (use /tmp for Vercel serverless)
const isVercel = process.env.VERCEL === '1';
const baseDir = isVercel ? '/tmp' : __dirname;

const uploadsDir = path.join(baseDir, 'uploads');
const photosDir = path.join(uploadsDir, 'photos');
const videosDir = path.join(uploadsDir, 'videos');
const dataDir = path.join(baseDir, 'data');

// Create directories with proper error handling
try {
    [uploadsDir, photosDir, videosDir, dataDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
} catch (error) {
    console.warn('⚠️ Could not create directories:', error.message);
    console.log('Files will be stored in memory only (Vercel serverless limitation)');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.fieldname === 'photos') {
            cb(null, photosDir);
        } else if (file.fieldname === 'introVideo') {
            cb(null, videosDir);
        }
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    },
    fileFilter: function(req, file, cb) {
        if (file.fieldname === 'photos') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed for photos!'), false);
            }
        } else if (file.fieldname === 'introVideo') {
            if (file.mimetype.startsWith('video/')) {
                cb(null, true);
            } else {
                cb(new Error('Only video files are allowed!'), false);
            }
        }
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', adminAuthMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// API endpoint to get all registrations (protected)
app.get('/api/registrations', adminAuthMiddleware, (req, res) => {
    try {
        const dataFile = path.join(dataDir, 'registrations.json');
        
        if (!fs.existsSync(dataFile)) {
            return res.json([]);
        }
        
        const data = fs.readFileSync(dataFile, 'utf8');
        const registrations = JSON.parse(data);
        
        // Sort by submission date (newest first)
        registrations.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        
        res.json(registrations);
    } catch (error) {
        console.error('Error reading registrations:', error);
        res.status(500).json({ error: 'Failed to load registrations' });
    }
});

// API endpoint to get a single registration (protected)
app.get('/api/registrations/:id', adminAuthMiddleware, (req, res) => {
    try {
        const dataFile = path.join(dataDir, 'registrations.json');
        
        if (!fs.existsSync(dataFile)) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        
        const data = fs.readFileSync(dataFile, 'utf8');
        const registrations = JSON.parse(data);
        
        const registration = registrations.find(r => r.id === req.params.id);
        
        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        
        res.json(registration);
    } catch (error) {
        console.error('Error reading registration:', error);
        res.status(500).json({ error: 'Failed to load registration' });
    }
});

// API endpoint to handle form submission
app.post('/api/submit', upload.fields([
    { name: 'photos', maxCount: 3 },
    { name: 'introVideo', maxCount: 1 }
]), async (req, res) => {
    // Ensure we always return JSON
    res.setHeader('Content-Type', 'application/json');
    
    try {
        // Generate unique ID
        const registrationId = 'REG-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Prepare file paths
        const photoPaths = req.files['photos'] ? req.files['photos'].map(file => 
            'uploads/photos/' + file.filename
        ) : [];
        
        const videoPath = req.files['introVideo'] ? 
            'uploads/videos/' + req.files['introVideo'][0].filename : '';
        
        // Create registration object
        const registration = {
            id: registrationId,
            childInfo: {
                firstName: req.body.childFirstName,
                lastName: req.body.childLastName,
                dateOfBirth: req.body.dateOfBirth,
                age: req.body.age,
                gender: req.body.gender,
                height: req.body.height,
                weight: req.body.weight || '',
                shoeSize: req.body.shoeSize || ''
            },
            parentInfo: {
                firstName: req.body.parentFirstName,
                lastName: req.body.parentLastName,
                relationship: req.body.relationship,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                emergencyContact: req.body.emergencyContact
            },
            media: {
                photos: photoPaths,
                video: videoPath
            },
            socialMedia: {
                instagram: req.body.instagram || ''
            },
            consent: {
                termsAgree: req.body.termsAgree === 'true',
                photoConsent: req.body.photoConsent === 'true'
            },
            submittedAt: new Date().toISOString(),
            status: 'pending' // pending, approved, rejected
        };
        
        // Save to JSON file
        const dataFile = path.join(dataDir, 'registrations.json');
        let registrations = [];
        
        if (fs.existsSync(dataFile)) {
            const data = fs.readFileSync(dataFile, 'utf8');
            registrations = JSON.parse(data);
        }
        
        registrations.push(registration);
        
        // Try to save to file (may fail on Vercel serverless)
        try {
            fs.writeFileSync(dataFile, JSON.stringify(registrations, null, 2));
            console.log(`✅ Registration saved to file: ${registrationId}`);
        } catch (writeError) {
            console.warn('⚠️ Could not save to file (Vercel limitation):', writeError.message);
            console.log('Registration stored in memory only - will be lost on redeployment');
        }
        
        console.log(`New registration received: ${registrationId}`);
        console.log(`Child: ${registration.childInfo.firstName} ${registration.childInfo.lastName}`);
        console.log(`Parent: ${registration.parentInfo.firstName} ${registration.parentInfo.lastName}`);
        
        // Send email notification (if enabled)
        if (EMAIL_ENABLED && transporter) {
            sendEmailNotification(registration).catch(err => {
                console.error('Email notification error:', err);
            });
        }
        
        res.json({
            success: true,
            message: 'Registration submitted successfully!',
            registrationId: registrationId,
            note: isVercel ? 'Files uploaded to temporary storage (Vercel serverless)' : null
        });
        
    } catch (error) {
        console.error('Error processing registration:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process registration. Please try again.',
            details: error.message
        });
    }
});

// API endpoint to update registration status (protected)
app.patch('/api/registrations/:id/status', adminAuthMiddleware, (req, res) => {
    try {
        const { status } = req.body;
        const dataFile = path.join(dataDir, 'registrations.json');
        
        if (!fs.existsSync(dataFile)) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        
        const data = fs.readFileSync(dataFile, 'utf8');
        let registrations = JSON.parse(data);
        
        const index = registrations.findIndex(r => r.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        
        registrations[index].status = status;
        registrations[index].updatedAt = new Date().toISOString();
        
        fs.writeFileSync(dataFile, JSON.stringify(registrations, null, 2));
        
        res.json({
            success: true,
            message: 'Status updated successfully',
            registration: registrations[index]
        });
        
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// API endpoint to delete a registration (protected)
app.delete('/api/registrations/:id', adminAuthMiddleware, (req, res) => {
    try {
        const dataFile = path.join(dataDir, 'registrations.json');
        
        if (!fs.existsSync(dataFile)) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        
        const data = fs.readFileSync(dataFile, 'utf8');
        let registrations = JSON.parse(data);
        
        const index = registrations.findIndex(r => r.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Registration not found' });
        }
        
        // Delete associated files
        const registration = registrations[index];
        
        // Delete photos
        if (registration.media.photos) {
            registration.media.photos.forEach(photoPath => {
                const fullPath = path.join(__dirname, photoPath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });
        }
        
        // Delete video
        if (registration.media.video) {
            const fullPath = path.join(__dirname, registration.media.video);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }
        
        // Remove from array
        registrations.splice(index, 1);
        
        fs.writeFileSync(dataFile, JSON.stringify(registrations, null, 2));
        
        res.json({
            success: true,
            message: 'Registration deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting registration:', error);
        res.status(500).json({ error: 'Failed to delete registration' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File too large. Maximum size is 50MB.'
            });
        }
    }
    
    res.status(500).json({
        success: false,
        error: error.message || 'Something went wrong!'
    });
});

// Start server (only if not in serverless environment)
if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log('===========================================');
        console.log('Kids Junior Fashion Week Registration System');
        console.log('===========================================');
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Admin Dashboard: http://localhost:${PORT}/admin`);
        console.log('===========================================');
        
        // Security status
        if (ADMIN_AUTH_ENABLED) {
            console.log('✅ Admin authentication: ENABLED');
            console.log(`   Username: ${process.env.ADMIN_USERNAME}`);
        } else {
            console.log('⚠️  Admin authentication: DISABLED');
            console.log('   Set ADMIN_USERNAME and ADMIN_PASSWORD in .env to enable');
        }
        
        // Email notification status
        if (EMAIL_ENABLED && transporter) {
            console.log('✅ Email notifications: ENABLED');
            console.log(`   Sending to: ${process.env.NOTIFICATION_EMAIL}`);
        } else {
            console.log('ℹ️  Email notifications: DISABLED');
        }
        
        console.log('===========================================');
    });
}

// Export for serverless (Vercel)
module.exports = app;

