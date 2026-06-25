import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, Button, Box } from '@mui/material';
import api from '../components/api';
import { QRCodeSVG } from 'qrcode.react';

function PatientProfilePage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await api.get(`/patients/${id}`);
      setPatient(response.data.patient);
    };
    fetchPatient();
  }, [id]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Patient Profile</Typography>
      {patient && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">{patient.name}</Typography>
            <Typography>Code: {patient.patient_code}</Typography>
            <Typography>Mobile: {patient.mobile || 'N/A'}</Typography>
            <Typography>DOB: {patient.dob || 'N/A'}</Typography>
            <Typography>Address: {patient.address || 'N/A'}</Typography>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" onClick={() => window.print()}>Print Profile</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>QR Code</Typography>
            <QRCodeSVG value={patient.qr_data || ''} size={240} />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default PatientProfilePage;
