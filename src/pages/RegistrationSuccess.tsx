// src/pages/RegistrationSuccess.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4">Registration Successful!</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Please check your email for the verification link.
      </Typography>
      <Button
        variant="contained"
        sx={{ marginTop: 4 }}
        onClick={handleLoginRedirect}
      >
        Go to Login
      </Button>
    </Box>
  );
};

export default RegistrationSuccess;
