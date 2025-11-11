@echo off
echo ============================================
echo Kids Junior Fashion Week Registration System
echo First Time Setup
echo ============================================
echo.
echo Step 1: Installing dependencies...
echo Please wait, this may take a minute...
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please make sure Node.js is installed.
    echo Download from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo Step 2: Starting server...
echo.

node server.js

pause

