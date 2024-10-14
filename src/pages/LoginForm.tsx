import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Alert, Link } from '@mui/material'; // Import Link component from MUI
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

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // Error or success message
  const [isError, setIsError] = useState(false);  // Flag for error
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');  // Clear any previous messages
    setIsError(false);  // Reset error flag

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      // On success
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      setMessage('Login successful!');
      navigate('/dashboard');  // Redirect to dashboard on success
    
    } catch (error: any) {
      // Handle error based on status code or error message
      if (error.response && error.response.status === 401) {
        setMessage('Incorrect email or password. Please try again.');
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
      setIsError(true);  // Set error flag to true
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
          Login
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
            Login
          </Button>

          {message && (
            <Alert severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
              {message}
            </Alert>
          )}

          {/* Add the Forgot Password link below the Login button */}
          <Link
            href="/reset-password-request" // Link to the reset password request page
            variant="body2" // Smaller text size
            sx={{ display: 'block', marginTop: 2, cursor: 'pointer' }} // Styling for spacing and pointer cursor
          >
            Forgot Password?
          </Link>
          <Link
            href="/register" // Link to the reset password request page
            variant="body2" // Smaller text size
            sx={{ display: 'block', marginTop: 0, cursor: 'pointer' }} // Styling for spacing and pointer cursor
          >
            Register
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
