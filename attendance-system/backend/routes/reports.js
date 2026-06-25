const express = require('express');
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const { parse } = require('json2csv');

const router = express.Router();
router.use(authenticate);

router.get('/summary', async (req, res) => {
  const counts = await db.query(
    `SELECT p.id AS patient_id, p.name, p.mobile, COUNT(a.id) AS visits
     FROM patients p
     LEFT JOIN attendance_records a ON p.id = a.patient_id
     GROUP BY p.id ORDER BY visits DESC`
  );
  res.json({ summary: counts });
});

router.get('/export', async (req, res) => {
  const { type = 'excel' } = req.query;
  const records = await db.query(
    `SELECT a.id, p.patient_code, p.name, p.mobile, a.scan_time, a.status, u.name AS staff_name, a.location
     FROM attendance_records a
     LEFT JOIN patients p ON a.patient_id = p.id
     LEFT JOIN users u ON a.staff_id = u.id
     ORDER BY a.scan_time DESC`
  );

  if (type === 'pdf') {
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="attendance.pdf"');
    doc.pipe(res);
    doc.fontSize(18).text('Attendance Records', { align: 'center' });
    doc.moveDown();
    records.forEach((r) => {
      doc.fontSize(10).text(`${r.scan_time} | ${r.patient_code} | ${r.name} | ${r.status} | ${r.staff_name || 'N/A'} | ${r.location || 'N/A'}`);
      doc.moveDown(0.2);
    });
    doc.end();
    return;
  }

  if (type !== 'excel') {
    return res.status(400).json({ message: 'Invalid export type' });
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Attendance');
  sheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Patient Code', key: 'patient_code', width: 20 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Mobile', key: 'mobile', width: 15 },
    { header: 'Scan Time', key: 'scan_time', width: 20 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Staff', key: 'staff_name', width: 20 },
    { header: 'Location', key: 'location', width: 20 },
  ];
  sheet.addRows(records);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="attendance.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
