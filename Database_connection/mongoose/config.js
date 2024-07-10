import mongoose from 'mongoose';
const database='e-com';

mongoose.connection.on('connected', async () => {
    console.log('Connection established');
    
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
    
});


export default mongoose.connect(`mongodb://localhost:27017/${database}`)
    
