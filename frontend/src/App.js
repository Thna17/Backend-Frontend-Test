import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './style.css';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handleTodoAdded = (newTodo) => {
        setRefresh(!refresh);
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <TodoForm onTodoAdded={handleTodoAdded} />
            <TodoList key={refresh} />
        </div>
    );
};

export default App;
