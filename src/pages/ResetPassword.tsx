import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');  // Get the token from URL

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      // API call to reset password
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
        token,
        newPassword: password,
      });
      setMessage('Password reset successfully!');
      setIsError(false);
      navigate('/login');  // Redirect to login after success
    } catch (error: any) {
      setMessage('Failed to reset password. Please try again.');
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
      <Typography variant="h4">Reset Your Password</Typography>

      <TextField
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Reset Password
      </Button>

      {message && (
        <Alert severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default ResetPassword;
