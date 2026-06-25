import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField, Paper, Divider, Grid, Snackbar, Alert } from '@mui/material';
import api from '../components/api';
import PatientTable from '../components/PatientTable';
import PatientForm from '../components/PatientForm';
import QrScannerPanel from '../components/QrScannerPanel';
import ReportPanel from '../components/ReportPanel';
import HistoryDialog from '../components/HistoryDialog';
import QrPreviewDialog from '../components/QrPreviewDialog';

function DashboardPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients', { params: { search } });
      setPatients(response.data.patients || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const handleSave = async (data) => {
    try {
      if (editingPatient) {
        await api.put(`/patients/${editingPatient.id}`, data);
        setNotification({ open: true, message: 'Patient updated', severity: 'success' });
      } else {
        await api.post('/patients', data);
        setNotification({ open: true, message: 'Patient added', severity: 'success' });
      }
      setDialogOpen(false);
      setEditingPatient(null);
      fetchPatients();
    } catch (error) {
      setNotification({ open: true, message: 'Save failed', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      setNotification({ open: true, message: 'Patient deleted', severity: 'success' });
      fetchPatients();
    } catch (error) {
      setNotification({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  const handleScan = async (qrText) => {
    try {
      await api.post('/attendance/scan', { qrData: qrText });
      setNotification({ open: true, message: 'Attendance marked', severity: 'success' });
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Scan failed';
      setNotification({ open: true, message, severity: 'error' });
    }
  };

  const handleViewHistory = async (patient) => {
    try {
      const response = await api.get(`/attendance/history/${patient.id}`);
      setHistoryRecords(response.data.history || []);
      setHistoryOpen(true);
    } catch (error) {
      setNotification({ open: true, message: 'Unable to load history', severity: 'error' });
    }
  };

  const handlePreview = (patient) => {
    setQrValue(patient.qr_data || JSON.stringify({ patient_code: patient.patient_code, name: patient.name }));
    setQrOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4">Physio Attendance Dashboard</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={8}>
            <TextField label="Search patients" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" fullWidth onClick={() => setDialogOpen(true)}>New Patient</Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Patient Management</Typography>
        <PatientTable patients={patients} onEdit={(patient) => { setEditingPatient(patient); setDialogOpen(true); }} onDelete={handleDelete} onViewHistory={handleViewHistory} onPreview={handlePreview} />
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <QrScannerPanel onScan={handleScan} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportPanel />
        </Grid>
      </Grid>

      <PatientForm open={dialogOpen} onClose={() => { setDialogOpen(false); setEditingPatient(null); }} onSave={handleSave} initial={editingPatient} />
      <HistoryDialog open={historyOpen} onClose={() => setHistoryOpen(false)} history={historyRecords} />
      <QrPreviewDialog open={qrOpen} onClose={() => setQrOpen(false)} qrValue={qrValue} title="Patient QR" />

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={() => setNotification((prev) => ({ ...prev, open: false }))}>
        <Alert severity={notification.severity} onClose={() => setNotification((prev) => ({ ...prev, open: false }))}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default DashboardPage;
