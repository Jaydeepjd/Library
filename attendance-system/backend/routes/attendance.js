const express = require('express');
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

router.post('/scan', async (req, res) => {
  const { qrData, staffId, location } = req.body;
  if (!qrData) return res.status(400).json({ message: 'QR data is required' });

  let payload;
  try {
    payload = JSON.parse(qrData);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid QR code payload' });
  }

  const patient = await db.get('SELECT * FROM patients WHERE patient_code = ?', [payload.patient_code]);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const existingRecord = await db.get(
    'SELECT * FROM attendance_records WHERE patient_id = ? AND scan_time BETWEEN ? AND ? LIMIT 1',
    [patient.id, todayStart.toISOString(), todayEnd.toISOString()]
  );

  if (existingRecord) {
    return res.status(409).json({ message: 'Attendance already recorded for this patient today' });
  }

  const result = await db.run(
    'INSERT INTO attendance_records (patient_id, status, staff_id, location) VALUES (?, ?, ?, ?)',
    [patient.id, 'present', staffId || req.user.userId, location || null]
  );

  res.json({ recordId: result.lastID, patient, scannedAt: new Date() });
});

router.get('/history/:patientId', async (req, res) => {
  const records = await db.query(
    'SELECT a.*, u.name AS staff_name FROM attendance_records a LEFT JOIN users u ON a.staff_id = u.id WHERE a.patient_id = ? ORDER BY a.scan_time DESC',
    [req.params.patientId]
  );
  res.json({ history: records });
});

module.exports = router;
