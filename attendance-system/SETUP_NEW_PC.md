# 🔄 Moving Physio Attendance App to Another PC

## 📋 Pre-Migration Checklist

- [ ] Backup current database: `backend/data/physio_attendance.db`
- [ ] Note down any custom data (patients, attendance records)
- [ ] Export any important reports
- [ ] Document custom environment variables
- [ ] Take screenshot of running features

---

## 📦 Step 1: Prepare for Transfer

### Backup Complete Project
```bash
# Option A: ZIP (Windows)
# Right-click react-p-app folder > Send to > Compressed folder

# Option B: Command line (Windows)
tar -czf physio-attendance-backup.tar.gz react-p-app/

# Option C: Copy entire folder to external drive
xcopy /E /H /C /I react-p-app "E:\Backup\react-p-app"
```

### Backup Database Only (Optional)
```bash
cp backend/data/physio_attendance.db backend/physio_attendance.db.backup
```

---

## 🖥️ Step 2: Setup on New PC

### Phase 1: Verify Prerequisites (5 minutes)

#### Check Node.js
```bash
node --version
# Required: v14.0.0 or higher
# Recommended: v16+ or v18+
```

If not installed:
1. Download from https://nodejs.org/
2. Install LTS version
3. Restart computer
4. Verify again: `node --version`

#### Check npm
```bash
npm --version
# Required: v6.0.0 or higher
```

#### Check Ports
```bash
# Windows - Check if ports 5000 & 3001 are free
netstat -ano | findstr :5000
netstat -ano | findstr :3001
# Should return empty (no processes using these ports)

# Mac/Linux
lsof -i :5000
lsof -i :3001
# Should return empty
```

---

### Phase 2: Copy Project (5 minutes)

#### Option A: From USB/External Drive
```bash
# Simply copy the entire react-p-app folder
# Paste to desired location (e.g., C:\Projects\react-p-app)
```

#### Option B: From ZIP
```bash
# Extract the ZIP file
# Navigate into the extracted folder
cd react-p-app
```

#### Option C: From Network/Cloud
```bash
# Download from OneDrive/Google Drive/etc.
# Extract and navigate to folder
```

---

### Phase 3: Install Dependencies (3-5 minutes)

#### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Expected output:
# added XXX packages in Xs
```

#### Frontend Setup (in new terminal)
```bash
cd frontend

# Install dependencies
npm install

# Expected output:
# added XXX packages in Ys
```

**Note**: On slower connections, this may take 5-10 minutes.

---

### Phase 4: Configure Environment

#### Backend Environment (.env)
```bash
cd backend
```

Create or verify `.env` file contains:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_minimum_32_characters
```

**Important**: Change `JWT_SECRET` for production!

#### Frontend API Configuration
Verify `frontend/src/components/api.js`:
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Correct for local development
});
```

---

### Phase 5: Start Services (2 minutes)

#### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

**Expected Output**:
```
> nodemon index.js

[nodemon] restarting due to changes...
Server started on port 5000
SQLite database initialized at ...physio_attendance.db
Seeded default admin user: admin@example.com / admin123
```

⏳ **Wait until you see**: "Server started on port 5000"

#### Terminal 2: Start Frontend
```bash
cd frontend
npm start
```

**Expected Output**:
```
> react-scripts start

Starting the development server...
Compiled successfully!

You can now view physio-attendance-frontend in the browser.
Local: http://localhost:3001
```

⏳ **Wait until browser opens automatically**

---

### Phase 6: Verify Installation

#### 1. Check Backend Health
```bash
# In any terminal/PowerShell
curl http://localhost:5000/api/health

# Should return:
# {"status":"ok"}
```

#### 2. Open Frontend
- Browser should open automatically at http://localhost:3001
- If not, manually open: http://localhost:3001

#### 3. Test Login
- Email: `admin@example.com`
- Password: `admin123`

#### 4. Quick Feature Test
- [ ] Create a new patient
- [ ] Verify QR code appears
- [ ] Click QR icon to preview
- [ ] Download an Excel report
- [ ] Check patient attendance count

---

## 🚨 Troubleshooting Transfer Issues

### Issue: "npm install" fails
```bash
# Clear cache and retry
npm cache clean --force
rm package-lock.json
npm install
```

### Issue: Port already in use
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Issue: "Cannot find module" errors
```bash
# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database not found
```bash
# Database auto-creates on first run
# If missing, just restart backend:
npm run dev

# Or delete and restart:
rm backend/data/physio_attendance.db
npm run dev  # Database auto-creates
```

### Issue: Browser shows "Cannot reach server"
- Verify backend is running: Look for "Server started on port 5000"
- Check if port 5000 is in use: `netstat -ano | findstr :5000`
- Try accessing: `http://localhost:5000/api/health` in browser

### Issue: Login fails
- Verify backend is running
- Clear browser cache & cookies
- Try incognito/private window
- Check browser console for errors (F12)

---

## 💾 Transferring Existing Data

### Option 1: Move Existing Database

If you want to keep patient data from old PC:

```bash
# On NEW PC:
# Replace the empty database with your backup

# Windows:
copy "C:\path\to\backup\physio_attendance.db" "backend\data\physio_attendance.db"

# Mac/Linux:
cp /path/to/backup/physio_attendance.db backend/data/physio_attendance.db
```

Then restart backend.

### Option 2: Fresh Database

Simply delete the old database, let it auto-create:
```bash
rm backend/data/physio_attendance.db
npm run dev  # Creates fresh database
```

---

## 🔧 Verification Checklist

After setup, verify all of these:

- [ ] Node.js installed (v14+)
- [ ] npm installed (v6+)
- [ ] Project copied to new PC
- [ ] Backend `npm install` completed
- [ ] Frontend `npm install` completed
- [ ] `.env` file configured (with JWT_SECRET)
- [ ] Backend starts without errors
- [ ] Frontend compiles successfully
- [ ] Can login with admin@example.com / admin123
- [ ] Can create new patient
- [ ] QR code displays in table
- [ ] Can download Excel report
- [ ] Can download PDF report
- [ ] Attendance count shows correctly
- [ ] All features working as before

---

## 📝 Quick Transfer Script

### Windows PowerShell
```powershell
# Run as Administrator
# Copy this script to new PC and run it

Write-Host "=== Physio Attendance Setup ===" -ForegroundColor Green

# Check Node.js
Write-Host "`nChecking Node.js..." -ForegroundColor Yellow
node --version
npm --version

# Navigate to project
cd react-p-app

# Backend setup
Write-Host "`nSetting up Backend..." -ForegroundColor Yellow
cd backend
npm install
Write-Host "Backend ready!" -ForegroundColor Green

# Frontend setup
Write-Host "`nSetting up Frontend..." -ForegroundColor Yellow
cd ../frontend
npm install
Write-Host "Frontend ready!" -ForegroundColor Green

Write-Host "`n=== Setup Complete ===" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open 2 terminals"
Write-Host "2. Terminal 1: cd backend && npm run dev"
Write-Host "3. Terminal 2: cd frontend && npm start"
Write-Host "4. Open http://localhost:3001 in browser"
Write-Host "5. Login: admin@example.com / admin123"
```

### Mac/Linux Bash
```bash
#!/bin/bash

echo "=== Physio Attendance Setup ==="

# Check Node.js
echo "Checking Node.js..."
node --version
npm --version

# Navigate to project
cd react-p-app

# Backend setup
echo "Setting up Backend..."
cd backend
npm install
echo "Backend ready!"

# Frontend setup
echo "Setting up Frontend..."
cd ../frontend
npm install
echo "Frontend ready!"

echo "=== Setup Complete ==="
echo "Next steps:"
echo "1. Open 2 terminals"
echo "2. Terminal 1: cd backend && npm run dev"
echo "3. Terminal 2: cd frontend && npm start"
echo "4. Open http://localhost:3001 in browser"
echo "5. Login: admin@example.com / admin123"
```

---

## 🔑 Important Notes for New PC

1. **First-Time Setup**: Allow 10-15 minutes for complete installation (including npm install time)
2. **Slow Internet**: npm install can take longer on slower connections
3. **Antivirus**: Some antivirus may slow npm install - temporarily disable if needed
4. **Admin Rights**: May need admin rights for npm install on Windows
5. **Database**: Auto-created on first run, no manual setup needed
6. **Default Credentials**: Change admin password immediately in production

---

## ✅ Final Verification

After completing all steps, test these:

```bash
# Terminal 1: Backend running
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}

# Browser: Frontend running
http://localhost:3001
# Should show login page

# Login test
# Email: admin@example.com
# Password: admin123
# Should redirect to dashboard
```

---

## 🆘 Still Having Issues?

1. **Check logs**: Look at terminal where `npm run dev` is running
2. **Browser console**: Press F12, check Console tab for errors
3. **Try restart**: Kill both terminals (Ctrl+C), restart services
4. **Full reset**: Delete node_modules, reinstall: `npm install`
5. **Nuclear option**: 
   ```bash
   rm -rf backend/node_modules frontend/node_modules
   rm backend/data/physio_attendance.db
   npm install --prefix backend
   npm install --prefix frontend
   npm run dev --prefix backend  # Terminal 1
   npm start --prefix frontend   # Terminal 2
   ```

---

**Estimated Total Time**: 15-25 minutes  
**Success Rate**: 95%+ with these instructions  
**Need Help?**: See QUICK_SETUP.md or DEPLOYMENT_GUIDE.md
