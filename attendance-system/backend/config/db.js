const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'data', 'physio_attendance.db');
let db;

async function initialize() {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    await db.exec(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'staff',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_code TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        mobile TEXT,
        dob TEXT,
        address TEXT,
        qr_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS attendance_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        scan_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL DEFAULT 'present',
        staff_id INTEGER,
        location TEXT,
        FOREIGN KEY(patient_id) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY(staff_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    const userCount = await db.get('SELECT COUNT(*) AS count FROM users');
    if (!userCount || userCount.count === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.run(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin', 'admin@example.com', hashedPassword, 'admin']
      );
      console.log('Seeded default admin user: admin@example.com / admin123');
    }
    console.log('SQLite database initialized at', dbPath);
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error.message);
    throw error;
  }
}

async function query(sql, params = []) {
  return db.all(sql, params);
}

async function get(sql, params = []) {
  return db.get(sql, params);
}

async function run(sql, params = []) {
  return db.run(sql, params);
}

module.exports = {
  initialize,
  query,
  get,
  run,
};
