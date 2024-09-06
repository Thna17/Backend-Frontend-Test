import React, { useState } from 'react';
import { useAddTodoMutation } from '../store/apis/todosApi'; // Import the mutation hook
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, CircularProgress } from '@mui/material';

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = { title, description, status };
      await addTodo(newTodo).unwrap();
      setTitle('');
      setDescription('');
      setStatus(false);
      if (onTodoAdded) onTodoAdded(); // Notify parent component if needed
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 4 }}>
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
        fullWidth
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Add Todo'}
      </Button>
    </Box>
  );
};

export default TodoForm;
