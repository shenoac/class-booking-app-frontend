import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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
          Reset Your Password
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
      </Box>
    </ThemeProvider>
  );
};

export default ResetPassword;
