import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from'react-redux';
import { useFetchTodosQuery } from '../store'
// import axios from 'axios';
import TodoItem from './TodoItem';
import { Typography, CircularProgress } from '@mui/material';

const TodoList = () => {
    const {data, error, isLoading} = useFetchTodosQuery();
    console.log('data:', data);
    

    if (isLoading) {
        return <CircularProgress />;
    }
    if (data.length === 0) {
        return <Typography variant="h6">No todos available. Add some!</Typography>;
    }
    if (error) {
        return <Typography variant="h6">Error fetching todos</Typography>;
    }

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {data.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onDelete={{}} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
