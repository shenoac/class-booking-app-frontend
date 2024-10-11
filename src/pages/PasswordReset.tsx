import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with your color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8', // Mauve for buttons
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Font customization
  },
});

const PasswordReset: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // To get the token from URL

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }

    const token = searchParams.get('token'); // Get the token from the URL

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
        token,
        newPassword,
      });

      setMessage('Password reset successfully!');
      navigate('/login'); // Redirect to login page after success
    } catch (error) {
      setMessage('Failed to reset password. Please try again.');
      setIsError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: 3,
          borderRadius: '8px',
          border: '1px solid white',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          margin: '50px auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
      </Box>
    </ThemeProvider>
  );
};

export default PasswordReset;
