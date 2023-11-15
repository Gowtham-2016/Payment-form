import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog } from '@mui/material';
import PaymentForm, { PaymentFormData } from './PaymentForm';
import styled from '@emotion/styled';
import { sendPayment, PaymentError } from '../../api/mockApi';
import { useSnackbar } from '../SnackbarComponent/SnackbarProvider';
import { useNavigate } from 'react-router';

type PaymentDialogProps = {
  open: boolean;
  handleClose: () => void;
};

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialogContent-root': {
    padding: 16,
  },
  '& .MuiDialogActions-root': {
    padding: 10,
  },
}));

const PaymentDialog: React.FC<PaymentDialogProps> = ({ open, handleClose }) => {
  const { openSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setPaymentFormData] = useState<PaymentFormData>({
    to: '',
    from: '',
    amount: 0,
    description: '',
  });

  const navigate = useNavigate();

  const isFormValid = (): boolean => {
    const { to, from, amount } = formData;
    return !!to && /\S+@\S+\.\S+/.test(to) && !!from && amount !== 0 && !isNaN(Number(amount)) && Number(amount) > 0;
  };

  const handleFormChange = (newPaymentFormData: PaymentFormData): void => {
    setPaymentFormData(newPaymentFormData);
  };

  const handleSaveChanges = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await sendPayment({
        to: formData.to,
        from: formData.from,
        amount: Number(formData.amount),
        description: formData.description,
        mockStatusCode: 200,
      });
      openSnackbar('Payment Success!', 'success');
      setIsSubmitting(false);
      setPaymentFormData({
        to: '',
        from: '',
        amount: 0,
        description: '',
      });
      handleClose();
    } catch (error) {
      const paymentError = error as PaymentError;
      if (paymentError.status === 400) {
        openSnackbar(paymentError.message, 'error');
      } else if (paymentError.status === 401) {
        openSnackbar(paymentError.message, 'error');
        navigate('/login');
      } else if (paymentError.status >= 500 && paymentError.status < 600) {
        openSnackbar(paymentError.message, 'error');
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
