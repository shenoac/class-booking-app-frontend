import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');  // State for current password
  const [newPassword, setNewPassword] = useState('');  // State for new password
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    const token = localStorage.getItem('authToken');
    console.log('Got token from storage:', token);

    if (!token) {
      setMessage('You must be logged in to change your password.');
      setIsError(true);
      return;
    }

    try {
      // API call to change password with currentPassword, newPassword, and token
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/change-password`, {
        currentPassword,  // Send the current password
        newPassword,  // Send the new password
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
        }
      });

      setMessage('Password changed successfully!');
      setIsError(false);
      navigate('/dashboard');  // Redirect to dashboard after success
    } catch (error: any) {
      setMessage('Failed to change password. Please try again.');
      setIsError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,  // White background
          padding: 3,  // Padding around the form
          borderRadius: '8px',  // Rounded corners
          border: '1px solid white',  // White border around the content
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',  // Optional: light shadow for effect
          maxWidth: '400px',  // Restrict width if needed
          margin: '50px auto',  // Center the content and add margin from top
          textAlign: 'center', // Center-align the text
        }}
      >
        <Typography variant="h4" gutterBottom>
          Change Your Password
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
            label="Current Password"
            type="password"
            value={currentPassword}  // Add field for current password
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="New Password"
            type="password"
            value={newPassword}  // Use new password state
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Change Password
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

export default ChangePassword;
