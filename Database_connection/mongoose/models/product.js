import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { versionKey: false }); // Disable the __v field

export default mongoose.model('Products', ProductSchema);
