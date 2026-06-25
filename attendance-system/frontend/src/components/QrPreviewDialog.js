import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

function QrPreviewDialog({ open, onClose, qrValue, title }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title || 'QR Code'}</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        {qrValue ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <QRCodeSVG value={qrValue} size={240} />
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{qrValue}</Typography>
          </Box>
        ) : (
          <Typography>No QR data available</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={() => window.print()} variant="contained">Print</Button>
      </DialogActions>
    </Dialog>
  );
}

export default QrPreviewDialog;
