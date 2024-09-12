import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <Typography variant="h4">Login</Typography>

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
    </Box>
  );
};

export default LoginForm;
