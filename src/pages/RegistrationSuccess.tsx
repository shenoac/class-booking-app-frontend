import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const RegistrationSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
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
        <Typography variant="h4" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Please check your email for the verification link.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
          onClick={handleLoginRedirect}
        >
          Go to Login
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default RegistrationSuccess;
