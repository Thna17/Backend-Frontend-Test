import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/todos');
            console.log(response)
            setTodos(response.data);
    
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
