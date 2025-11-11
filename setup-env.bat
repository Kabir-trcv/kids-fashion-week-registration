@echo off
setlocal enabledelayedexpansion
echo ============================================
echo Environment Setup Script
echo Kids Junior Fashion Week Registration System
echo ============================================
echo.
echo This script will help you create your .env file
echo for production deployment.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul
echo.

REM Check if .env already exists
if exist ".env" (
    echo.
    echo WARNING: A .env file already exists!
    echo.
    choice /C YN /M "Do you want to overwrite it"
    if errorlevel 2 (
        echo.
        echo Setup cancelled. Your existing .env file was not modified.
        pause
        exit /b 0
    )
)

echo.
echo ============================================
echo Step 1: Server Configuration
echo ============================================
echo.

set /p PORT="Enter server port [default: 3000]: "
if "!PORT!"=="" set PORT=3000

echo.
echo ============================================
echo Step 2: Admin Authentication
echo ============================================
echo.
echo IMPORTANT: These credentials will protect your admin dashboard!
echo.

set /p ADMIN_USER="Enter admin username [default: admin]: "
if "!ADMIN_USER!"=="" set ADMIN_USER=admin

:password_input
set /p ADMIN_PASS="Enter admin password (min 8 characters): "
if "!ADMIN_PASS!"=="" (
    echo Password cannot be empty!
    goto password_input
)

echo.
echo ============================================
echo Step 3: Email Notifications (Optional)
echo ============================================
echo.
echo Would you like to enable email notifications?
echo This will send you an email whenever someone registers.
echo.
choice /C YN /M "Enable email notifications"

if errorlevel 2 (
    set EMAIL_ENABLED=false
    set EMAIL_SERVICE=
    set EMAIL_USER=
    set EMAIL_PASS=
    set NOTIFY_EMAIL=
) else (
    set EMAIL_ENABLED=true
    echo.
    echo Email Setup:
    echo ------------
    echo.
    echo For Gmail:
    echo 1. Enable 2-Factor Authentication
    echo 2. Create App Password at: https://myaccount.google.com/apppasswords
    echo 3. Use the 16-character app password below
    echo.
    
    set /p EMAIL_SERVICE="Email service [default: gmail]: "
    if "!EMAIL_SERVICE!"=="" set EMAIL_SERVICE=gmail
    
    set /p EMAIL_USER="Your email address: "
    set /p EMAIL_PASS="Email password or app password: "
    set /p NOTIFY_EMAIL="Email to receive notifications: "
)

echo.
echo ============================================
echo Creating .env file...
echo ============================================

REM Create .env file
(
echo # Server Configuration
echo PORT=!PORT!
echo NODE_ENV=production
echo.
echo # Admin Dashboard Authentication
echo ADMIN_USERNAME=!ADMIN_USER!
echo ADMIN_PASSWORD=!ADMIN_PASS!
echo.
echo # Email Notifications
echo ENABLE_EMAIL_NOTIFICATIONS=!EMAIL_ENABLED!
echo EMAIL_SERVICE=!EMAIL_SERVICE!
echo EMAIL_USER=!EMAIL_USER!
echo EMAIL_PASSWORD=!EMAIL_PASS!
echo NOTIFICATION_EMAIL=!NOTIFY_EMAIL!
echo.
echo # Application Settings
echo MAX_FILE_SIZE_MB=50
echo MAX_PHOTO_SIZE_MB=5
echo ALLOWED_VIDEO_DURATION_SECONDS=35
) > .env

echo.
echo ============================================
echo SUCCESS! .env file created
echo ============================================
echo.
echo Your configuration:
echo -------------------
echo Port: !PORT!
echo Admin Username: !ADMIN_USER!
echo Admin Password: ********
echo Email Notifications: !EMAIL_ENABLED!
echo.
echo IMPORTANT SECURITY NOTES:
echo -------------------------
echo 1. Keep your .env file secure - NEVER commit it to Git
echo 2. Use a strong admin password in production
echo 3. Change these credentials regularly
echo.
echo Next Steps:
echo -----------
echo 1. Run: npm install
echo 2. Run: npm start
echo 3. Access admin at: http://localhost:!PORT!/admin
echo.
echo For deployment, see: DEPLOYMENT_GUIDE.md
echo.
pause

