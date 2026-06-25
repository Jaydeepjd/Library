const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const qrcode = require('qrcode');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.post(
  '/',
  [body('name').notEmpty(), body('mobile').optional().isMobilePhone('any')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, mobile, dob, address } = req.body;
    const code = `PAT-${Date.now()}`;
    const qrData = JSON.stringify({ patient_code: code, name, mobile });
    const result = await db.run(
      'INSERT INTO patients (patient_code, name, mobile, dob, address, qr_data) VALUES (?, ?, ?, ?, ?, ?)',
      [code, name, mobile, dob || null, address || null, qrData]
    );

    const qrCodeImage = await qrcode.toDataURL(qrData);
    const patient = await db.get('SELECT * FROM patients WHERE id = ?', [result.lastID]);
    res.json({ patient, qrCode: qrCodeImage });
  }
);

router.get('/', async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;
  let where = '';
  const params = [];

  if (search) {
    where = ' WHERE p.name LIKE ? OR p.mobile LIKE ? OR p.patient_code LIKE ?';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const query = `SELECT p.*, (
    SELECT COUNT(*) FROM attendance_records ar WHERE ar.patient_id = p.id
  ) AS attendance_count FROM patients p ${where} ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;

  params.push(Number(limit), (Number(page) - 1) * Number(limit));

  const patients = await db.query(query, params);
  // Ensure attendance_count is a number
  patients.forEach((p) => { p.attendance_count = p.attendance_count ? Number(p.attendance_count) : 0; });
  res.json({ patients });
});

router.get('/:id', async (req, res) => {
  const patient = await db.get(
    `SELECT p.*, (
      SELECT COUNT(*) FROM attendance_records ar WHERE ar.patient_id = p.id
    ) AS attendance_count FROM patients p WHERE p.id = ?`,
    [req.params.id]
  );
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  patient.attendance_count = patient.attendance_count ? Number(patient.attendance_count) : 0;
  res.json({ patient });
});

router.put('/:id', async (req, res) => {
  const { name, mobile, dob, address } = req.body;
  const result = await db.run(
    'UPDATE patients SET name = ?, mobile = ?, dob = ?, address = ? WHERE id = ?',
    [name, mobile, dob || null, address || null, req.params.id]
  );

  if (result.changes === 0) return res.status(404).json({ message: 'Patient not found' });
  const patient = await db.get('SELECT * FROM patients WHERE id = ?', [req.params.id]);
  res.json({ patient });
});

router.delete('/:id', async (req, res) => {
  const result = await db.run('DELETE FROM patients WHERE id = ?', [req.params.id]);
  if (result.changes === 0) return res.status(404).json({ message: 'Patient not found' });
  res.json({ message: 'Patient deleted' });
});

router.get('/:id/qrcode', async (req, res) => {
  const patient = await db.get('SELECT * FROM patients WHERE id = ?', [req.params.id]);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  const qrCodeImage = await qrcode.toDataURL(patient.qr_data);
  res.json({ qrCode: qrCodeImage });
});

module.exports = router;
