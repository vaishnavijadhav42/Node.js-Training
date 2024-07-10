import express from 'express';
import  con from './config.js'// Ensure the correct path to config.js
import bcrypt from 'bcrypt';
const app = express();

app.use(express.json()); // To parse JSON bodies

// Get all users
app.get('/', (req, res) => {
    con.query('SELECT * FROM userdata', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

// Get user by ID
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    con.query('SELECT * FROM userdata WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

// Create a new user
app.post('/user', async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    req.body.password = hashedPassword;
    const { name, email,password } = req.body;
    const query = 'INSERT INTO userdata (name, email,password) VALUES (?, ?,?)';
    con.query(query, [name, email ,password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else {
            console.log(result);
            res.status(201).send('User created successfully');
        }
    });
});

// Update a user by ID
app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const query = 'UPDATE userdata SET name = ?, email = ? WHERE id = ?';
    con.query(query, [name, email, userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            console.log(result);
            res.send('User updated successfully');
        }
    });
});

// Delete a user by ID
app.delete('/user/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM userdata WHERE id = ?';
    con.query(query, [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred');
        } else if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            console.log(result);
            res.send('User deleted successfully');
        }
    });
});

app.listen(3000);
