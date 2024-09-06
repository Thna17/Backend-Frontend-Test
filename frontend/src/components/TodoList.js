import React from 'react';
import { useFetchTodosQuery } from '../store/apis/todosApi';
import { Container, Typography, List, Divider, CircularProgress, Alert } from '@mui/material';
import TodoItem from './TodoItem'; // Import TodoItem component

const TodoList = () => {
  const { data, error, isLoading } = useFetchTodosQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const todos = data || [];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <List>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <React.Fragment key={todo.id}>
              <TodoItem todo={todo} />
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1">No todos available</Typography>
        )}
      </List>
    </Container>
  );
};

export default TodoList;
