import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from '@mui/material';

function HistoryDialog({ open, onClose, history }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Patient Visit History</DialogTitle>
      <DialogContent>
        <List>
          {history.map((record) => (
            <ListItem key={record.id} divider>
              <ListItemText
                primary={`${new Date(record.scan_time).toLocaleString()} — ${record.status}`}
                secondary={`Staff: ${record.staff_name || 'N/A'} | Location: ${record.location || 'N/A'}`}
              />
            </ListItem>
          ))}
          {history.length === 0 && <ListItem><ListItemText primary="No history available" /></ListItem>}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default HistoryDialog;
