import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import api from '../components/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function AnalyticsPage() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const loadSummary = async () => {
      const response = await api.get('/reports/summary');
      setSummary(response.data.summary || []);
    };
    loadSummary();
  }, []);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Analytics</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{ height: 360 }}>
          <Typography variant="h6">Most Frequent Patients</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={summary.slice(0, 5)} dataKey="visits" nameKey="name" outerRadius={120} fill="#8884d8">
                {summary.slice(0, 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6} sx={{ height: 360 }}>
          <Typography variant="h6">Visits by Patient</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AnalyticsPage;
