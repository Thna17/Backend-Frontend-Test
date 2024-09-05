import React, { useState } from 'react';
import { useLoginMutation } from '../store/apis/todosApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, user } = await login({ email, password }).unwrap();
            dispatch(setCredentials({ token, user }));
            alert('Login successful');
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" gutterBottom>
                Sign In
            </Typography>
            {isError && <Alert severity="error">{error.data.message}</Alert>}
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                fullWidth
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
        </Box>
    );
};

export default SignInForm;
