import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onTodoAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);

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
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Todo</h2>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Status:
                <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
            </label>
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
