@echo off
echo ============================================
echo Data Backup Script
echo Kids Junior Fashion Week Registration System
echo ============================================
echo.

REM Create backups directory if it doesn't exist
if not exist "backups" mkdir backups

REM Get current date and time
set datetime=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set datetime=%datetime: =0%

echo Creating backup...
echo.

REM Backup registrations JSON file
if exist "data\registrations.json" (
    echo [1/2] Backing up registrations data...
    copy "data\registrations.json" "backups\registrations_%datetime%.json" >nul
    echo     - Saved to: backups\registrations_%datetime%.json
) else (
    echo     - No registration data found (this is normal for new installations)
)

REM Backup uploads directory
if exist "uploads" (
    echo [2/2] Backing up uploaded files...
    powershell Compress-Archive -Path "uploads\*" -DestinationPath "backups\uploads_%datetime%.zip" -Force
    echo     - Saved to: backups\uploads_%datetime%.zip
) else (
    echo     - No uploads directory found (this is normal for new installations)
)

echo.
echo ============================================
echo Backup Complete!
echo ============================================
echo.
echo Backup Location: backups\
echo.
echo To restore from backup:
echo 1. Copy the registrations JSON file to: data\registrations.json
echo 2. Extract the uploads ZIP file to: uploads\
echo.
pause

