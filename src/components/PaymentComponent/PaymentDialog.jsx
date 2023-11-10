import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog } from '@mui/material';
import PaymentForm from './PaymentForm';
import styled from '@emotion/styled';
import { sendPayment } from '../../api/mockApi';
import { useSnackbar } from '../SnackbarComponent/SnackbarProvider';
import { useNavigate } from 'react-router';

const BootstrapDialog = styled(Dialog)(() => ({
    '& .MuiDialogContent-root': {
      padding: 16,
    },
    '& .MuiDialogActions-root': {
      padding: 10,
    },
  }));

const PaymentDialog = ({ open, handleClose }) => {
  const { openSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    amount: '',
    description: '',
  });

  const navigate = useNavigate();

  const isFormValid = () => {
    const { to, from, amount } = formData;
    return to && /\S+@\S+\.\S+/.test(to) && from && amount && !isNaN(amount) && amount > 0;
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    try {
        await sendPayment({
          to: formData.to,
          from: formData.from,
          amount: formData.amount,
          description: formData.description,
          mockStatusCode: 200,
        });
        openSnackbar('Payment Success!', 'success')
        setIsSubmitting(false);
        setFormData({
          to: '',
          from: '',
          amount: '',
          description: '',
        })
        handleClose();
      } catch (error) {
        if (error.status === 400) {
            openSnackbar(error.message, 'error')
        } else if (error.status === 401) {
            openSnackbar(error.message, 'error');
            navigate('/login')
        } else if (error.status >= 500 && error.status < 600) {
            openSnackbar(error.message, 'error')
        }
        setIsSubmitting(false);
      }
  };

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Payment
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <PaymentForm formData={formData} onChange={handleFormChange} />
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={isSubmitting} autoFocus onClick={handleSaveChanges} disabled={!isFormValid()}>
          Submit
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default PaymentDialog;
