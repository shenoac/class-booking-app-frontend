import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');  // Clear previous messages
    setIsError(false);  // Reset error state

    try {
      // API call to request password reset
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/request-password-reset`, { email });

      setMessage('A password reset link has been sent to your email.');
      setIsError(false);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMessage('Email not found. Please try again.');
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
      setIsError(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <Typography variant="h4">Reset Password</Typography>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Send Reset Link
      </Button>

      {message && (
        <Alert severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default PasswordResetRequest;
