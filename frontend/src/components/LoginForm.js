import React, { useState } from 'react';
import { useLoginMutation } from '../store/apis/authApi'; // Login API hook
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material'; // MUI components

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Handle login errors
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const { token } = await login({ email, password }).unwrap();
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      dispatch(setCredentials({ token, userId }));
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
