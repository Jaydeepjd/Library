import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
      setMessage(null);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Forgot Password</Typography>
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>Send Reset Link</Button>
      </Box>
    </Paper>
  );
}

export default ForgotPasswordPage;
