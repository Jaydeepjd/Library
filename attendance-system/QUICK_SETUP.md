# Physio Attendance App - Quick Setup Checklist

## ⚡ Quick Local Setup (5-10 minutes)

### ✅ Pre-Flight Check
- [ ] Node.js installed? Check: `node --version` (v14+ required)
- [ ] npm installed? Check: `npm --version` (v6+ required)
- [ ] Project folder copied to this PC
- [ ] Ports 5000 and 3001 are free

### ✅ Backend Setup
```bash
cd backend
npm install
npm run dev
```
✓ Server should start on http://localhost:5000
✓ Database auto-created at `backend/data/physio_attendance.db`
✓ Admin seeded: admin@example.com / admin123

### ✅ Frontend Setup
```bash
cd frontend
npm install
npm start
```
✓ App should open at http://localhost:3001

### ✅ Login
- Email: `admin@example.com`
- Password: `admin123`

---

## 🔧 Troubleshooting - Common Issues

### Issue: `npm install` fails
**Fix**: 
```bash
rm package-lock.json
npm cache clean --force
npm install
```

### Issue: Port 5000 or 3001 already in use
**Fix (Windows)**:
```bash
# Find process
netstat -ano | findstr :5000
# Kill it
taskkill /PID <PID> /F
```

### Issue: "Cannot find module" errors
**Fix**:
```bash
npm install --save-dev nodemon   # Backend
npm install ajv ajv-keywords     # Frontend
```

### Issue: QR Scanner not working
- Allow camera permissions in browser
- Refresh page if permissions were denied
- Check browser console for permission errors

### Issue: Reports not downloading
- Ensure you're logged in (JWT token in localStorage)
- Refresh page and try again
- Check browser DevTools > Network tab for 401 errors

---

## 📦 Package Versions Used

### Backend
- express: ^4.18.2
- sqlite3: ^5.1.6
- jwt: ^9.0.0
- qrcode: ^1.5.1
- exceljs: ^4.3.0
- pdfkit: ^0.13.0

### Frontend
- react: ^18.3.1
- @mui/material: ^5.14.0
- axios: ^1.5.1
- qrcode.react: ^4.2.0
- react-qr-reader: 3.0.0-beta-1
- recharts: ^2.10.0

---

## 📝 Default Admin Credentials

> ⚠️ **IMPORTANT**: Change these immediately after first login in production!

- **Email**: admin@example.com
- **Password**: admin123

---

## 🌐 API Testing (Optional)

### Test Backend Health
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## 📊 Default Database

- **Location**: `backend/data/physio_attendance.db`
- **Type**: SQLite (embedded, no setup needed)
- **Auto-initialized**: Yes, on first run
- **Default data**: Admin user + sample data

---

## 🔄 Restart Services

### Restart Backend
```bash
# Stop: Ctrl+C in terminal
# Restart: npm run dev
```

### Restart Frontend
```bash
# Stop: Ctrl+C in terminal
# Restart: npm start
```

### Full Reset
```bash
# Delete database and reinstall
rm backend/data/physio_attendance.db
rm -rf backend/node_modules
rm -rf frontend/node_modules
npm install --prefix backend
npm install --prefix frontend
npm run dev --prefix backend    # Terminal 1
npm start --prefix frontend     # Terminal 2
```

---

## 💾 Backup Instructions

### Backup Database
```bash
cp backend/data/physio_attendance.db backend/data/physio_attendance.db.backup
```

### Backup Entire Project
```bash
# Create zip
# Or use: tar -czf physio-backup.tar.gz react-p-app/
```

---

## 🚀 Production Deployment

For detailed production setup, see `DEPLOYMENT_GUIDE.md`

**Quick Summary**:
- Build frontend: `cd frontend && npm run build`
- Use Node process manager (PM2)
- Set up reverse proxy (Nginx)
- Enable HTTPS
- Use strong JWT_SECRET in `.env`
- Enable database backups

---

## ✅ Verification Checklist

After setup, verify these work:

- [ ] Login with admin credentials
- [ ] Create a new patient
- [ ] QR code displays in table
- [ ] Click QR icon to preview code
- [ ] Download Excel report
- [ ] Download PDF report
- [ ] Attendance count shows in table
- [ ] Add 2-3 test patients
- [ ] Test QR scanner with generated codes

---

**Setup Time**: ~5-10 minutes
**First Time Users**: Expect ~30 minutes including npm install time
