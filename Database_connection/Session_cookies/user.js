import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
}, { versionKey: false }); // Disable the __v field

UserSchema.pre('save', async function(next) {
   
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        return next(error); 
    }
});


export default mongoose.model('users', UserSchema);

