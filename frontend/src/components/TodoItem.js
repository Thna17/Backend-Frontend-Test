import React from 'react';

const TodoItem = ({ todo, onDelete }) => {
    return (
        <li>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status ? 'Completed' : 'Pending'}</p>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
