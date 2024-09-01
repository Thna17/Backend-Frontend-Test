const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Setup
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'dvdrental',
    user: 'postgres',
    password: 'Mybirthday17072004'
});

// Route to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM actor');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Route to add a new user
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

