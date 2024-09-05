import React, { useState } from 'react';
import { useLoginMutation } from '../store/apis/todosApi';
import { setCredentials } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Box } from '@mui/material';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, user } = await login({ email, password }).unwrap();
            dispatch(setCredentials({ token, user }));
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
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
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </Box>
    );
};

export default LoginForm;
