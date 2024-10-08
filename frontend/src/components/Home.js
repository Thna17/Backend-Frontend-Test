// components/Home.js

import React, { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import Navbar from './Navbar'; // Import the Navbar component
import '../style.css';

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    const handleTodoAdded = (newTodo) => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <Navbar /> {/* Add the Navbar component */}
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h3" component="h1" align="center" gutterBottom>
                        Todo App
                    </Typography>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <TodoForm onTodoAdded={handleTodoAdded} />
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <TodoList key={refresh} />
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default Home;
