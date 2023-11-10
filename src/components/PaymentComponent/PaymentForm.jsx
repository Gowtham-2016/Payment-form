import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PaymentForm = ({ formData, onChange }) => {

  const handleInputChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div data-testid="form-container">
      <TextField
        label="To"
        variant="outlined"
        inputProps={{ 'data-testid': 'to-input' }}
        fullWidth
        required
        value={formData.to}
        onChange={(e) => handleInputChange('to', e.target.value)}
      />
      <FormControl variant="outlined" fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="from-label">From</InputLabel>
        <Select
          label="From"
          labelId="from-label"
          inputProps={{ 'data-testid': 'from-input' }}
          value={formData.from}
          onChange={(e) => handleInputChange('from', e.target.value)}
          required
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Amount"
        variant="outlined"
        inputProps={{ 'data-testid': 'amount-input' }}
        fullWidth
        required
        type="number"
        value={formData.amount}
        onChange={(e) => handleInputChange('amount', e.target.value)}
        sx={{ marginTop: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        inputProps={{ 'data-testid': 'description-input' }}
        fullWidth
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        sx={{ marginTop: 2 }}
      />
    </div>
  );
};

export default PaymentForm;
