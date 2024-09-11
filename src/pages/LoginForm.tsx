import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });
      
      
      const token = response.data.token;
      localStorage.setItem('authToken', token);
    
      
      setMessage('Login successful!');
      navigate('/dashboard'); 
    
    } catch (error) {
      setMessage('Login failed. Please try again.');
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
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default LoginForm;
