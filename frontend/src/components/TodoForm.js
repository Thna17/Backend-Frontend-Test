import React, { useState } from 'react';
import { useAddTodoMutation } from '../store/apis/todosApi'; // Import the mutation hook
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

    // Get the addTodo mutation function
    const [addTodo, { isLoading }] = useAddTodoMutation();

    // Handle form submission using Redux Toolkit Query
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the mutation function to add a new todo
            const newTodo = { title, description, status };
            console.log('todo', newTodo);
            const response = await addTodo(newTodo).unwrap();
            console.log(response);
             // Unwrap to handle the response

            

            // Clear form fields
            setTitle('');
            setDescription('');
            setStatus(false);
        } catch (error) {
            console.error('Error adding todo:', error);
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
                disabled={isLoading}
                fullWidth
            >
                {isLoading ? 'Adding...' : 'Add Todo'}
            </Button>
        </Box>
    );
};

export default TodoForm;
