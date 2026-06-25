# 🚀 Production Deployment Checklist

**Application**: Physio Attendance Management System  
**Version**: 1.0.0  
**Last Updated**: June 23, 2026

---

## ✅ Pre-Deployment Verification (Local Testing)

### Functionality Testing
- [ ] **Login**: Test admin login, verify JWT token stored
- [ ] **Forgot Password**: Test password reset flow
- [ ] **Patient CRUD**: Create, read, update, delete patients
- [ ] **QR Generation**: Verify QR auto-generates on patient creation
- [ ] **QR Preview**: Click QR icon and preview modal displays
- [ ] **QR Scanning**: Test scanning with mobile device/QR code scanner
- [ ] **Attendance**: Scan once per day, test duplicate prevention
- [ ] **Reports**: Download Excel and PDF reports
- [ ] **Search**: Search patients by name, mobile, code
- [ ] **Pagination**: Test patient list pagination if >20 patients
- [ ] **Error Handling**: Test all error scenarios, verify messages display
- [ ] **Responsive Design**: Test on mobile (375px), tablet (768px), desktop (1920px)
- [ ] **Cross-browser**: Test Chrome, Firefox, Safari, Edge

### Security Testing
- [ ] **Login Required**: Verify unauthenticated users cannot access dashboard
- [ ] **JWT Validation**: Test with invalid tokens
- [ ] **CORS**: Verify only frontend domain can access API
- [ ] **Password Hashing**: Verify passwords are hashed in database
- [ ] **Input Validation**: Test SQL injection attempts, XSS payloads
- [ ] **Rate Limiting**: (Optional) Test brute force protection

### Performance Testing
- [ ] **Load Time**: Frontend loads in <3 seconds
- [ ] **API Response**: API responds in <500ms for most requests
- [ ] **Database**: Can handle 1000+ patients without slowdown
- [ ] **Reports**: Large reports (1000+ records) export in <10 seconds

---

## 🔐 Security Hardening

### Before Going Live ⚠️

- [ ] **Change Admin Password**: 
  - [ ] Login to app
  - [ ] Go to Profile
  - [ ] Change from `admin123` to strong password
  - [ ] Store securely (password manager recommended)

- [ ] **Regenerate JWT Secret**:
  - [ ] Generate new 32+ character secret
  - [ ] Update `.env`: `JWT_SECRET=<new-secret>`
  - [ ] Remove old secrets from version control

- [ ] **Database Backup Strategy**:
  - [ ] Set up automated daily backups
  - [ ] Test restore procedure
  - [ ] Store backups in secure location
  - [ ] Document recovery process

- [ ] **Environment Variables**:
  - [ ] Remove all hardcoded secrets
  - [ ] Use `.env` for all sensitive data
  - [ ] Add `.env` to `.gitignore`
  - [ ] Document all required env vars

- [ ] **HTTPS/SSL Certificate**:
  - [ ] Obtain SSL certificate (Let's Encrypt free)
  - [ ] Install on web server
  - [ ] Enable HTTP redirect to HTTPS
  - [ ] Test HTTPS access

- [ ] **CORS Configuration**:
  ```javascript
  // Update backend to only allow your domain
  const cors = require('cors');
  app.use(cors({
    origin: 'https://yourdomain.com',
    credentials: true
  }));
  ```

- [ ] **Rate Limiting**:
  ```bash
  npm install express-rate-limit
  ```
  Add to routes to prevent abuse

- [ ] **Input Validation**:
  - [ ] Verify all user inputs are validated
  - [ ] Check for SQL injection attempts
  - [ ] Sanitize XSS attempts

---

## 📦 Build & Deployment Preparation

### Backend Build

```bash
cd backend

# Verify dependencies
npm list

# Security audit
npm audit
npm audit fix

# Test build
npm install --production

# Verify no console.logs (except important ones)
grep -r "console.log" .
```

### Frontend Build

```bash
cd frontend

# Install dependencies
npm install

# Security audit
npm audit
npm audit fix

# Build optimized bundle
npm run build

# Verify build output
ls -la build/
# Should have: index.html, js/, css/, static/

# Test build locally (optional)
npm install -g serve
serve -s build
# Test at http://localhost:5000
```

---

## 🌍 Deployment Platform Setup

### Option A: Heroku Deployment

#### Backend (Heroku)
```bash
# Install Heroku CLI
# Create Procfile in backend/:
echo "web: node index.js" > Procfile

# Create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_strong_secret_here
heroku config:set PORT=5000

# Deploy
git push heroku main

# Verify
heroku logs --tail
heroku open
```

#### Frontend (Netlify)
1. Build React app: `npm run build`
2. Connect GitHub to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL=https://your-heroku-app.herokuapp.com/api`
6. Deploy

### Option B: AWS EC2

#### Setup Ubuntu Server
```bash
# SSH into server
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone or upload project
git clone your-repo-url
# Or upload via SCP: scp -r react-p-app ubuntu@server:/home/ubuntu/

# Install dependencies
cd react-p-app/backend
npm install --production

# Start with PM2
pm2 start index.js --name "physio-api"
pm2 startup
pm2 save
```

#### Setup Nginx Reverse Proxy
```bash
sudo apt install nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /home/ubuntu/react-p-app/frontend/build;
        try_files $uri /index.html;
    }
}
```

```bash
# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

#### Install SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option C: DigitalOcean App Platform (Easiest)

1. Create App on DigitalOcean
2. Connect GitHub repo
3. Set build command: `npm install --prefix backend`
4. Set run command: `node backend/index.js`
5. Add environment variables (JWT_SECRET, etc.)
6. Deploy

---

## 📊 Post-Deployment Configuration

### Database Setup (Production)

#### If Using PostgreSQL Instead of SQLite

```bash
# Install PostgreSQL driver
npm install pg

# Update backend/config/db.js with PostgreSQL connection

# Create database and tables
psql -U postgres
CREATE DATABASE physio_attendance;
\c physio_attendance
CREATE TABLE users (...);  # Run migration scripts
```

### Monitoring & Logging

- [ ] Set up error tracking (Sentry)
- [ ] Set up monitoring (New Relic, DataDog)
- [ ] Configure log aggregation (CloudWatch, LogRocket)
- [ ] Set up uptime monitoring (Pingdom, Uptime.com)
- [ ] Create alerts for critical errors

### Backups

```bash
# Automated backup script
#!/bin/bash
BACKUP_DIR="/home/backup/physio"
mkdir -p $BACKUP_DIR
cp backend/data/physio_attendance.db $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).db

# Add to crontab for daily backups
crontab -e
# Add: 0 2 * * * /home/scripts/backup.sh
```

---

## ✅ Final Deployment Checklist

### 24 Hours Before Deployment
- [ ] All tests passing locally
- [ ] Database backups tested
- [ ] SSL certificate obtained
- [ ] Domain DNS configured
- [ ] All environment variables documented
- [ ] Admin password changed
- [ ] Team notified of deployment time
- [ ] Rollback plan documented

### Deployment Day
- [ ] Backup production database
- [ ] Deploy backend
- [ ] Verify backend health: GET `/api/health`
- [ ] Deploy frontend
- [ ] Test all features on live
- [ ] Verify SSL certificate working
- [ ] Check error logs
- [ ] Verify backups working
- [ ] Monitor for errors

### Post-Deployment (48 Hours)
- [ ] Monitor error logs
- [ ] Verify database backups running
- [ ] Check performance metrics
- [ ] Test all features thoroughly
- [ ] Monitor user feedback
- [ ] Verify SSL auto-renewal scheduled
- [ ] Document any issues

---

## 🚨 Rollback Plan

If deployment fails:

```bash
# Option 1: Rollback code
git revert <commit-hash>
git push

# Option 2: Restore database
cp backup-database.db physio_attendance.db

# Option 3: Restart services
pm2 restart all
systemctl restart nginx

# Option 4: Revert to previous version
pm2 delete all
pm2 start index.js --name "physio-api"
```

---

## 📋 Critical Configuration Files

### Backend .env (Production)
```env
PORT=5000
JWT_SECRET=your_production_secret_min_32_chars_very_strong
NODE_ENV=production
DB_PATH=/secure/location/physio_attendance.db
```

### Frontend .env (if needed)
```env
REACT_APP_API_URL=https://your-api.yourdomain.com/api
```

### Nginx config
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Add security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

---

## 📞 Emergency Contacts

- [ ] Your contact number
- [ ] Server provider support
- [ ] Database admin contact
- [ ] Security team contact

---

## 📈 Performance Targets

| Metric | Target |
|--------|--------|
| Page Load Time | < 3 seconds |
| API Response Time | < 500ms |
| Database Query | < 200ms |
| Uptime | > 99.5% |
| Error Rate | < 0.1% |

---

## 🔄 Maintenance Schedule

- **Daily**: Monitor error logs, check backups
- **Weekly**: Review performance metrics
- **Monthly**: Update dependencies, security audit
- **Quarterly**: Capacity planning, performance optimization
- **Annually**: Full security assessment, disaster recovery drill

---

## ✅ Sign-Off

- [ ] QA Manager: Approved for production
- [ ] Security Officer: Security review passed
- [ ] DevOps: Infrastructure ready
- [ ] Product Manager: Feature complete
- [ ] Date Approved: ________________
- [ ] Deployment Date: ________________
- [ ] Time: ________________ (preferably off-peak)

---

**Status**: ✅ Ready for Production Deployment  
**Version**: 1.0.0  
**Node.js**: v14.0.0+  
**Last Review**: June 23, 2026
