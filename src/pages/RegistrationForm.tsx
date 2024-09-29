import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
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
    grey: {
      300: '#F0F0F0', // Light grey for cards
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Font customization
  },
});

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // Error flag
  const navigate = useNavigate();

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : process.env.REACT_APP_API_URL;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');  // Reset message
    setIsError(false);  // Reset error flag

    try {
      await axios.post(`${apiUrl}/auth/register/buyer`, {
        name,
        email,
        password,
      });
      setMessage('Registration successful!');
      navigate('/registration-success');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      setIsError(true);  // Set error flag
    }
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
          maxWidth: '400px',  // Restrict width if needed
          margin: '50px auto',  // Center the content and add margin from top
          textAlign: 'center', // Center-align the text
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
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
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
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

export default RegistrationForm;
