import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import api from './api';

function ReportPanel() {
  const download = async (type) => {
    try {
      const response = await api.get(`/reports/export?type=${type}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const extension = type === 'excel' ? 'xlsx' : type === 'pdf' ? 'pdf' : 'csv';
      link.href = url;
      link.setAttribute('download', `attendance.${extension}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Report download failed', error);
      alert(error.response?.data?.message || 'Unable to download report');
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Reports & Export</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => download('excel')}>Download Excel</Button>
        <Button variant="contained" onClick={() => download('pdf')}>Download PDF</Button>
      </Box>
    </Paper>
  );
}

export default ReportPanel;
