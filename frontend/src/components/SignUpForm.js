import React, { useState } from 'react';
import { useRegisterMutation } from '../store/apis/todosApi';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [register, { isLoading, isError, error }] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await register({ email, password }).unwrap();
            alert('Registration successful');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" gutterBottom>
                Sign Up
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
            <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
        </Box>
    );
};

export default SignUpForm;
