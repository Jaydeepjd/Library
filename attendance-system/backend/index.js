const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const attendanceRoutes = require('./routes/attendance');
const reportRoutes = require('./routes/reports');
const db = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  try {
    await db.initialize();
  } catch (error) {
    console.error('Database initialization failed. The application requires a working database connection.');
    process.exit(1);
  }
});
