# 🏥 Physio Attendance Management System

A complete **patient attendance tracking application** for physiotherapy clinics with QR code scanning, patient management, and reporting features.

---

## ✨ Key Features

### 👥 Patient Management
- ✅ Create, Read, Update, Delete (CRUD) patients
- ✅ Search patients by name, mobile, or patient code
- ✅ View detailed patient profiles
- ✅ Attendance count displayed per patient
- ✅ Patient data export (Excel/PDF)

### 📱 QR Code Management
- ✅ Auto-generate unique QR code for each patient
- ✅ QR preview in patient table
- ✅ Print-ready QR codes
- ✅ One QR per patient, auto-generated on creation
- ✅ QR contains patient info: code, name, mobile

### 🔐 Attendance Tracking
- ✅ Real-time QR code scanning
- ✅ One attendance entry per patient per day (enforced)
- ✅ Attendance timestamp recording
- ✅ Staff member tracking
- ✅ Location logging (optional)
- ✅ Attendance history per patient
- ✅ Duplicate scan prevention with user feedback

### 📊 Reports & Analytics
- ✅ Attendance summary by patient
- ✅ Download Excel reports (`.xlsx`)
- ✅ Download PDF reports
- ✅ Attendance history visualization
- ✅ Visit count statistics
- ✅ Authenticated download (requires login)

### 🔑 Authentication & Authorization
- ✅ Login system with email & password
- ✅ JWT token-based authentication
- ✅ Role-based access control (Admin, Staff)
- ✅ Forgot password functionality
- ✅ User profile management
- ✅ Session management

### 📈 Dashboard
- ✅ Real-time patient list
- ✅ Quick search functionality
- ✅ Attendance statistics
- ✅ Recent activity tracking
- ✅ Easy access to all features

---

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **SQLite** | Embedded database |
| **JWT** | Authentication token |
| **bcryptjs** | Password hashing |
| **QRCode** | QR generation |
| **ExcelJS** | Excel export |
| **PDFKit** | PDF export |
| **CORS** | Cross-origin requests |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **Material UI v5** | Component library |
| **Axios** | HTTP client |
| **React Router v6** | Client-side routing |
| **QRCode.react** | QR display |
| **react-qr-reader** | QR scanner |
| **Recharts** | Data visualization |

---

## 📋 System Requirements

### Minimum
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **RAM**: 512 MB
- **Storage**: 100 MB

### Recommended
- **Node.js**: v16+ or v18+
- **npm**: v8+
- **RAM**: 2 GB
- **Storage**: 500 MB
- **OS**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Start Servers
```bash
# Terminal 1: Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm start
# Runs on http://localhost:3001
```

### 3. Login
- **URL**: http://localhost:3001
- **Email**: admin@example.com
- **Password**: admin123

---

## 📁 Project Structure

```
react-p-app/
├── backend/                    # Express server
│   ├── config/db.js           # SQLite config
│   ├── middleware/auth.js     # JWT middleware
│   ├── routes/                # API endpoints
│   ├── data/                  # Database file
│   ├── index.js               # Server entry
│   └── package.json
│
├── frontend/                   # React app
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── App.js             # Main component
│   │   └── index.js           # Entry point
│   ├── public/
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md        # Production setup
├── QUICK_SETUP.md             # Quick reference
└── README.md                  # This file
```

---

## 📚 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Password reset |

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | List patients (search, paginate) |
| POST | `/api/patients` | Create patient (returns QR) |
| GET | `/api/patients/:id` | Get patient details |
| PUT | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Delete patient |
| GET | `/api/patients/:id/qrcode` | Get QR code |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attendance/scan` | Scan QR code |
| GET | `/api/attendance/history/:patientId` | Get history |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/summary` | Attendance summary |
| GET | `/api/reports/export?type=excel` | Export Excel |
| GET | `/api/reports/export?type=pdf` | Export PDF |

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes
- ✅ CORS enabled for frontend
- ✅ Input validation & sanitization
- ✅ One-time session per login
- ✅ Automatic token expiration

---

## 💡 Usage Examples

### Creating a Patient
1. Click "New Patient" button
2. Fill in: Name, Mobile, DOB, Address
3. Click Save
4. QR code auto-generates
5. QR preview available immediately

### Scanning Attendance
1. Go to "QR Attendance Scanner"
2. Allow camera access
3. Scan generated QR code
4. System marks attendance
5. One entry per day enforced

### Exporting Reports
1. Click "Download Excel" or "Download PDF"
2. Report auto-downloads with all attendance records
3. File includes: Date, Patient, Mobile, Status, Staff, Location

---

## 🐛 Known Limitations

- **SQLite**: Single-user database, not suitable for high concurrency
- **QR Scanner**: Requires camera access and HTTPS in production
- **Reports**: Limited to authenticated users
- **Concurrent Users**: Recommend PostgreSQL/MySQL for production with 10+ users

---

## 🔄 Database

### SQLite (Current - Development)
- **Location**: `backend/data/physio_attendance.db`
- **Auto-initialized**: On first run
- **Seeded data**: Admin user (admin@example.com / admin123)

### Schema
- **users**: Admin/staff accounts
- **patients**: Patient profiles
- **attendance_records**: Scan entries

---

## 📱 Browser Support

| Browser | Support | Min Version |
|---------|---------|------------|
| Chrome | ✅ | 90+ |
| Firefox | ✅ | 88+ |
| Safari | ✅ | 14+ |
| Edge | ✅ | 90+ |
| IE | ❌ | N/A |

---

## 🚨 Important Notes

1. **Change Default Password**: Update admin@example.com password immediately
2. **Database**: Backup regularly before deploying to production
3. **JWT Secret**: Use strong, unique secret in production
4. **HTTPS**: Required for camera access in production
5. **Port Conflicts**: Ensure ports 5000 & 3001 are free

---

## 📖 Documentation

- **Quick Setup**: See `QUICK_SETUP.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **API Details**: Check inline comments in `backend/routes/`
- **Component Guide**: Check `frontend/src/components/`

---

## 🤝 Contributing

1. Follow existing code style
2. Test features before committing
3. Update documentation
4. Add comments for complex logic

---

## 📄 License

This project is proprietary and for authorized use only.

---

## 📞 Support

For issues or questions:
1. Check `QUICK_SETUP.md` troubleshooting section
2. Review browser console for errors
3. Check server logs: Terminal where `npm run dev` runs
4. Verify database exists: `backend/data/physio_attendance.db`

---

## 🎯 Roadmap

### Future Enhancements
- [ ] SMS/Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Therapist scheduling
- [ ] Payment integration
- [ ] Multiple clinic support
- [ ] Patient self-service portal
- [ ] Video call integration

---

## ✅ Verification After Setup

```bash
# Backend health check
curl http://localhost:5000/api/health

# Frontend accessibility
http://localhost:3001

# Test login
admin@example.com / admin123

# Features to test:
- [ ] Create patient
- [ ] View QR code
- [ ] Download report
- [ ] Scan attendance (if camera available)
```

---

**Version**: 1.0.0  
**Last Updated**: June 23, 2026  
**Status**: ✅ Ready for Deployment  
**Node.js Required**: v14.0.0+
