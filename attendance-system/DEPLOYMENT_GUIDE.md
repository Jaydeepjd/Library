# Physio Attendance App - Deployment & Setup Guide

## 📋 Application Overview

**Physio Attendance Management System**
- Full-stack application for managing patient attendance in physiotherapy clinics
- Frontend: React 18 with Material UI
- Backend: Node.js + Express with SQLite database
- Authentication: JWT-based with role management
- QR Code: Generation, printing, and scanning for attendance
- Reports: Excel/PDF exports of attendance records

---

## 🔧 Prerequisites

### For Development/Local Setup:
- **Node.js**: v14.0.0 or higher (Recommended: v16+)
- **npm**: v6.0.0 or higher
- **Windows/Mac/Linux**: Windows 10+ recommended for development
- **Git** (optional, for version control)

### For Live Deployment:
- **Node.js** server or hosting platform (Heroku, AWS, DigitalOcean, etc.)
- **HTTPS certificate** (for production)
- **Domain name** (optional)

---

## 📁 Project Structure

```
react-p-app/
├── backend/
│   ├── config/
│   │   └── db.js              # SQLite database configuration
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js            # Login & Forgot Password
│   │   ├── patients.js        # Patient CRUD + QR generation
│   │   ├── attendance.js      # Scan & attendance history
│   │   └── reports.js         # Reports & exports (Excel/PDF)
│   ├── data/
│   │   └── physio_attendance.db    # SQLite database file
│   ├── index.js               # Main server entry point
│   ├── .env                   # Environment variables
│   ├── .env.example           # Example env file
│   └── package.json           # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── api.js                # Axios API helper
│   │   │   ├── PatientTable.js       # Patient list table
│   │   │   ├── PatientForm.js        # Create/edit patient form
│   │   │   ├── QrScannerPanel.js     # QR code scanner
│   │   │   ├── QrPreviewDialog.js    # QR preview modal
│   │   │   ├── ReportPanel.js        # Reports & export buttons
│   │   │   ├── HistoryDialog.js      # Attendance history
│   │   │   ├── NavBar.js             # Navigation bar
│   │   │   ├── ProtectedRoute.js     # Route protection
│   │   │   └── LoginPage.js          # Login page
│   │   ├── pages/
│   │   │   ├── DashboardPage.js      # Main dashboard
│   │   │   ├── ForgotPasswordPage.js # Password reset
│   │   │   └── ProfilePage.js        # User profile
│   │   ├── App.js             # Main app component
│   │   └── index.js           # React entry point
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # Frontend dependencies
│   └── package-lock.json
│
├── DEPLOYMENT_GUIDE.md        # This file
└── README.md                  # Project readme
```

---

## 🚀 Setup Instructions

### 1️⃣ Setup on Another Local PC

#### Step 1: Clone/Copy Project
```bash
# Option A: Copy the entire project folder to new PC
# Or Option B: Use Git
git clone <repository-url>
cd react-p-app
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 3: Configure Environment Variables
Create or update `.env` file in `backend/` folder:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

Note: SQLite database will be auto-created at `backend/data/physio_attendance.db`

#### Step 4: Start Backend Server
```bash
# Terminal 1: Backend
cd backend
npm run dev
```
Expected output:
```
Server started on port 5000
SQLite database initialized at [path]/physio_attendance.db
Seeded default admin user: admin@example.com / admin123
```

#### Step 5: Install Frontend Dependencies
```bash
# In a new terminal
cd frontend
npm install
```

#### Step 6: Configure Frontend API URL
Update `frontend/src/components/api.js`:
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Or your backend server URL
});
```

#### Step 7: Start Frontend Development Server
```bash
# Terminal 2: Frontend
cd frontend
npm start
```
Expected output:
```
Compiled successfully!
You can now view physio-attendance-frontend in the browser.
Local: http://localhost:3001
```

#### Step 8: Access Application
- Open browser: `http://localhost:3001`
- Login credentials:
  - Email: `admin@example.com`
  - Password: `admin123`

---

### 2️⃣ Production/Live Deployment

#### Option A: Deploy on Heroku

##### Backend Deployment:
1. Install Heroku CLI
2. Create `Procfile` in backend root:
   ```
   web: node index.js
   ```

3. Create `package.json` script:
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```

4. Set environment variables on Heroku:
   ```bash
   heroku config:set JWT_SECRET=your_production_secret
   heroku config:set PORT=5000
   ```

5. Deploy:
   ```bash
   git push heroku main
   ```

##### Frontend Deployment:
1. Build React app:
   ```bash
   cd frontend
   npm run build
   ```

2. Update API URL in `frontend/src/components/api.js`:
   ```javascript
   baseURL: 'https://your-backend-heroku-url/api'
   ```

3. Deploy to Netlify/Vercel:
   - Connect GitHub repo
   - Build command: `npm run build`
   - Publish directory: `build`

#### Option B: Deploy on AWS/DigitalOcean/Linode

##### For Backend:
1. Create an Ubuntu server (18.04 or higher)
2. Install Node.js and npm
3. Clone repository
4. Install dependencies: `npm install --production`
5. Set environment variables
6. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "physio-backend"
   pm2 startup
   pm2 save
   ```
7. Use Nginx as reverse proxy
8. Install SSL certificate (Let's Encrypt)

##### For Frontend:
1. Build React app: `npm run build`
2. Use Nginx to serve static files from `build/` directory
3. Point to backend API URL

---

## 🔐 Security Checklist for Production

- [ ] Change default admin credentials
- [ ] Set strong `JWT_SECRET` (min 32 characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Add rate limiting to API routes
- [ ] Implement database backups
- [ ] Use environment variables for all secrets
- [ ] Add input validation on backend
- [ ] Enable CORS only for your domain
- [ ] Keep Node.js and packages updated
- [ ] Use firewall rules to restrict access

---

## 📊 Database

### SQLite (Current - Development/Local)
- File-based database at `backend/data/physio_attendance.db`
- **Pros**: No setup required, portable, perfect for local dev
- **Cons**: Not suitable for concurrent users in production
- Auto-initialized on first run
- Seeded with default admin account

### For Production: Consider PostgreSQL/MySQL
- Better performance with multiple concurrent users
- Update `backend/config/db.js` to use your database
- Modify connection strings and SQL syntax as needed

---

## 🗄️ Database Schema

### Users Table
```sql
id, name, email, password (hashed), role, created_at
```

### Patients Table
```sql
id, patient_code (unique), name, mobile, dob, address, qr_data, created_at
```

### Attendance Records Table
```sql
id, patient_id (FK), scan_time, status, staff_id (FK), location
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Reset password request

### Patients
- `GET /api/patients` - List all patients (with search, pagination)
- `POST /api/patients` - Create patient (returns QR code)
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient
- `GET /api/patients/:id/qrcode` - Get QR code for patient

### Attendance
- `POST /api/attendance/scan` - Scan QR code (one entry per day per patient)
- `GET /api/attendance/history/:patientId` - Get patient attendance history

### Reports
- `GET /api/reports/summary` - Attendance summary by patient
- `GET /api/reports/export?type=excel` - Export as Excel
- `GET /api/reports/export?type=pdf` - Export as PDF

---

## 🐛 Troubleshooting

### Issue: "Authorization required" on Reports
**Solution**: Ensure JWT token is stored in localStorage after login. Check browser DevTools > Application > Local Storage for `token` key.

### Issue: Scanner not working
**Solution**: 
- Allow camera permission in browser
- Use HTTPS in production (QR Reader requires secure context)
- Check browser console for permission errors

### Issue: Port already in use
```bash
# Windows: Find process on port 5000
netstat -ano | findstr :5000
# Kill process by PID
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue: Database locked
- Restart backend server
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Issue: CORS errors
- Ensure backend `CORS` is enabled
- Check frontend API base URL matches backend server

---

## 📱 Mobile/QR Scanning Tips

- Use a dedicated QR scanner or phone camera app
- QR codes contain: `{ patient_code, name, mobile }`
- One scan per patient per calendar day (enforced)
- Duplicate scan returns: `Attendance already recorded for this patient today`

---

## 🔄 Backup & Recovery

### Backup Database (SQLite)
```bash
# Copy database file
cp backend/data/physio_attendance.db backend/data/physio_attendance.db.backup
```

### Backup Complete Project
```bash
# Archive entire project
tar -czf physio-attendance-backup.tar.gz react-p-app/
```

---

## 📈 Performance Tips

1. **Pagination**: API supports `?limit=20&page=1`
2. **Search**: Use patient search to filter large datasets
3. **Database**: Regularly export and archive old attendance records
4. **Caching**: Consider Redis for session management in production
5. **CDN**: Serve static frontend assets via CDN

---

## 🚨 Important Notes

1. **Default Admin Account**: Change immediately after first login
2. **JWT Secret**: Use unique, strong secret in production
3. **Database**: Back up regularly, implement automated backups
4. **Updates**: Keep Node.js and npm packages updated for security
5. **Monitoring**: Set up error logging (Sentry, LogRocket, etc.)

---

## 📞 Support & Maintenance

- Keep logs: `pm2 logs physio-backend`
- Monitor server: `pm2 monit`
- Update packages: `npm outdated` and `npm update`
- Check security advisories: `npm audit` and `npm audit fix`

---

## ✅ Deployment Checklist

**Before Going Live:**
- [ ] Change admin password
- [ ] Set production JWT_SECRET
- [ ] Enable HTTPS
- [ ] Configure domain DNS
- [ ] Set up database backups
- [ ] Test all features on staging
- [ ] Enable logging/monitoring
- [ ] Configure firewall rules
- [ ] Set up SSL certificate
- [ ] Test QR scanning (requires HTTPS for camera access)
- [ ] Verify email notifications (if added)
- [ ] Load test with expected user count

---

**Last Updated**: June 23, 2026
**Application Version**: 1.0.0
**Node.js Requirement**: v14.0.0+
