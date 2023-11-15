import React, { useState, useEffect } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Severity } from './SnackbarProvider';

interface SnackbarWrapperProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: Severity;
}

const SnackbarWrapper: React.FC<SnackbarWrapperProps> = ({ open, onClose, message, severity }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (_event?: Event | React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
    onClose();
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarWrapper;
