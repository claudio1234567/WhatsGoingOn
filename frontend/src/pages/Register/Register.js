import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Register.css';


function Register() {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL+"/api/auth/register" || 'http://localhost:5000/api/auth/register';
    try {
      const response = await axios.post(API_URL, { nome, cognome, email, password });
      console.log('Registration successful:', response.data);
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Reindirizza dopo 2 secondi
    } catch (error) {
      setError('Registration failed. Please check your details.');
      console.error('Registration error:', error);
    }
  };

  return (
    <Container maxWidth="xs" className="register-container">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h5">Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="given-name"
          autoFocus
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="cognome"
          label="Cognome"
          name="cognome"
          autoComplete="family-name"
          value={cognome}
          onChange={(e) => setCognome(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Typography variant="body2" align="center">
          Already have an account? <a href="/login">Login here</a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;