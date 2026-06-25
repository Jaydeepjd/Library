import React, { useState, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { QrReader } from 'react-qr-reader';

function QrScannerPanel({ onScan }) {
  const [message, setMessage] = useState('Ready to scan');
  const lastScanTime = useRef(0);

  const handleResult = (result, error) => {
    if (!!result) {
      const now = Date.now();
      if (now - lastScanTime.current > 2000) {
        setMessage('QR scanned successfully');
        onScan(result?.text);
        lastScanTime.current = now;
      }
    }
    if (!!error) {
      /* ignore scan errors while previewing */
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">QR Attendance Scanner</Typography>
      <Box sx={{ width: '100%', height: 320, mt: 2 }}>
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: 'environment' }}
          containerStyle={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Typography sx={{ mt: 2 }}>{message}</Typography>
    </Paper>
  );
}

export default QrScannerPanel;
