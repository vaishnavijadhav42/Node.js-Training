import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import './config.js'; // MongoDB connection setup
import ApiResponse from './utils/response.js';
const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Handle all other routes (404 Not Found)
app.all('*', (req, res) => {
    res.status(404).json(new ApiResponse(false, null, `Cannot find ${req.originalUrl}`));
});

// Start the server

app.listen(5000);
