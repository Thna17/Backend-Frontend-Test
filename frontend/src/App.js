import React, { useState, useEffect } from 'react';

function App() {
    const [actors, setActors] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001/api/users')
            .then(response => response.json())
            .then(data => setActors(data));
    }, []);

    const addUser = () => {
        fetch('http://localhost:5001/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then(response => response.json())
            .then(user => {
                // Update UI with the new user
                setActors([...actors, user]);
            });
    };

    return (
        <div className="App">
            <h1>Actor List</h1>
            <ul>
                {actors.map(actor => (
                    <li key={actor.actor_id}>
                        {actor.first_name} {actor.last_name} - Last Update: {new Date(actor.last_update).toLocaleString()}
                    </li>
                ))}
            </ul>
            <h2>Add User</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={addUser}>Add</button>
        </div>
    );
}

export default App;
