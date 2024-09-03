import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { List, Typography, CircularProgress } from '@mui/material';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/todos');
            console.log(response)
            setTodos(response.data);
            setLoading(false);
    
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };


    if (loading) {
        return <CircularProgress />;
    }
    if (todos.length === 0) {
        return <Typography variant="h6">No todos available. Add some!</Typography>;
    }

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
