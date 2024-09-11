import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.clear();
    navigate('/login'); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center the content vertically
        height: '80vh', // Fill most of the viewport height
        gap: 4, // Add space between elements
      }}
    >
      <Typography variant="h3">Welcome to the Dashboard</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
