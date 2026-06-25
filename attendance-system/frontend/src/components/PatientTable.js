import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import QrCodeIcon from '@mui/icons-material/QrCode';

function PatientTable({ patients, onEdit, onDelete, onViewHistory, onPreview }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Code</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Attendance</TableCell>
          <TableCell>Mobile</TableCell>
          <TableCell>DOB</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id} hover>
            <TableCell>{patient.patient_code}</TableCell>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.attendance_count || 0}</TableCell>
            <TableCell>{patient.mobile}</TableCell>
            <TableCell>{patient.dob || '—'}</TableCell>
            <TableCell>
              <Tooltip title="Edit">
                <IconButton onClick={() => onEdit(patient)} size="small"><EditIcon /></IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => onDelete(patient.id)} size="small"><DeleteIcon /></IconButton>
              </Tooltip>
              <Tooltip title="View history">
                <IconButton onClick={() => onViewHistory(patient)} size="small"><HistoryIcon /></IconButton>
              </Tooltip>
              <Tooltip title="Preview QR">
                <IconButton onClick={() => onPreview && onPreview(patient)} size="small"><QrCodeIcon /></IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PatientTable;
