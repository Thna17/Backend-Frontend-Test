import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
} from '@mui/material';


const TodoForm = ({ onTodoAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    

    //ADD To do
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/todos', {
                title,
                description,
                status
            });
            onTodoAdded(response.data);
            setTitle('');
            setDescription('');
            setStatus(false);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" gutterBottom>
                Add Todo
            </Typography>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                        color="primary"
                    />
                }
                label="Completed"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
            >
                {loading ? 'Adding...' : 'Add Todo'}
            </Button>
        </Box>
    );
};

export default TodoForm;
