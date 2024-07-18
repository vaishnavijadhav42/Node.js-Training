import express from 'express';
import './config/db';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json() )


// Routes
app.use('/api', userRoutes);

app.listen(3000);