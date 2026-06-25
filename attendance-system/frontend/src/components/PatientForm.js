import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function PatientForm({ open, onClose, onSave, initial }) {
  const [patient, setPatient] = useState({ name: '', mobile: '', dob: '', address: '' });

  useEffect(() => {
    if (initial) setPatient({ name: initial.name || '', mobile: initial.mobile || '', dob: initial.dob || '', address: initial.address || '' });
  }, [initial]);

  const handleChange = (field) => (event) => {
    setPatient((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    onSave(patient);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initial ? 'Edit Patient' : 'New Patient'}</DialogTitle>
      <DialogContent>
        <TextField label="Name" fullWidth margin="normal" value={patient.name} onChange={handleChange('name')} />
        <TextField label="Mobile" fullWidth margin="normal" value={patient.mobile} onChange={handleChange('mobile')} />
        <TextField label="DOB" type="date" fullWidth margin="normal" value={patient.dob} onChange={handleChange('dob')} InputLabelProps={{ shrink: true }} />
        <TextField label="Address" fullWidth margin="normal" multiline rows={3} value={patient.address} onChange={handleChange('address')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PatientForm;
