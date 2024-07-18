// server.js

import express from 'express';
import mongoose from 'mongoose';
import './config.js'; // Ensure this file is connecting to MongoDB
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import User from './user.js';
import MongoStore from 'connect-mongo';

const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'session_secret_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/session_cookies_crud_auth',
        collectionName: 'sessions'
    }),
}));

// Routes
app.get('/login', (req, res) => {
    //console.log("Hii")
    res.render('login');
});

// Register Page
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, email, contact, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ username, email, contact, password });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login Page
// app.get('/login', (req, res) => {
//     console.log("Hii")
//     res.render('login');
// });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid email or password');
        }

        req.session.user = { _id: user._id, username: user.username, email: user.email, contact: user.contact };
        res.redirect('/profile');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Profile Page
app.get('/profile', (req, res) => {
    res.render('profile', { user: req.session.user });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
