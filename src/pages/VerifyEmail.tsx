import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with your color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8', // Mauve for buttons
    },
    error: {
      main: '#B22222', // Firebrick red for error messages
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Font customization
  },
});

const VerifyEmail: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');  // Get the token from the URL
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Call the backend API to verify the token
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify-email?token=${token}`);
        
        if (response.status === 200) {
          setStatus('success');
        } else {
          setStatus('failure');
        }
      } catch (error) {
        setStatus('failure');
      }
    };

    if (token) {
      verifyToken();  // Only call the backend if the token exists
    }
  }, [token]);

  const handleRedirect = () => {
    navigate('/login');  // Redirect to login after successful verification
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,  // White background
          padding: 3,  // Padding around the content
          borderRadius: '8px',  // Rounded corners
          border: '1px solid white',  // White border around the content
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',  // Optional: light shadow for effect
          maxWidth: '600px',  // Restrict width if needed
          margin: '50px auto',  // Center the content and add margin from top
          textAlign: 'center', // Center-align the text
        }}
      >
        {status === 'success' ? (
          <>
            <Typography variant="h4" color="primary">Email Verified Successfully!</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              You can now log in to your account.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRedirect} sx={{ marginTop: 4 }}>
              Go to Login
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" color="error">Verification Failed</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              The token might be expired or invalid.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRedirect} sx={{ marginTop: 4 }}>
              Try Logging In
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default VerifyEmail;
