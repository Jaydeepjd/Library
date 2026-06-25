import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import AnalyticsPage from './pages/AnalyticsPage';
import PatientProfilePage from './pages/PatientProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="/patients/:id" element={<ProtectedRoute><PatientProfilePage /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
