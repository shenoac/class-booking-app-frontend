import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      {status === 'success' ? (
        <>
          <Typography variant="h4" color="primary">Email Verified Successfully!</Typography>
          <Typography variant="body1">You can now log in to your account.</Typography>
          <Button variant="contained" color="primary" onClick={handleRedirect}>
            Go to Login
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" color="error">Verification Failed</Typography>
          <Typography variant="body1">The token might be expired or invalid.</Typography>
          <Button variant="contained" color="primary" onClick={handleRedirect}>
            Try Logging In
          </Button>
        </>
      )}
    </Box>
  );
};

export default VerifyEmail;
