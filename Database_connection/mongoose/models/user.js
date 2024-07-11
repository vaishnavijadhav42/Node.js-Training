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
    role:{
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

//comapre password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('users', UserSchema);

