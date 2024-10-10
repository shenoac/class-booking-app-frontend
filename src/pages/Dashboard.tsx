import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with your color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8', // Mauve for buttons
    },
    secondary: {
      main: '#4B0082', // Dark red for logout button
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Font customization
  },
});

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.clear();
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,  // White background
          padding: 3,  // Padding around the entire form
          borderRadius: '8px',  // Rounded corners
          border: '1px solid white',  // White border around the content
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',  // Optional: light shadow for effect
          maxWidth: '600px',  // Restrict width if needed
          margin: '50px auto',  // Center the content and add margin from top
          textAlign: 'center', // Center-align the text
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Dashboard
        </Typography>

        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
