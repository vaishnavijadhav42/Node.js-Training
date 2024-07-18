import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/response.js';

const JWT_SECRET = 'jwt_secret_mongoose';

export const registerUser = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json(new ApiResponse(false, null, 'User already exists'));
        }

        const newUser = new User({
            username,
            email,
            role,
            password
        });

        const savedUser = await newUser.save();
        res.status(201).json(new ApiResponse(true, savedUser));
    } catch (error) {
        if (error.name === 'ValidationError') {
            
            return res.status(400).json(new ApiResponse(false, null, error.message));
        }
        res.status(500).json(new ApiResponse(false, null, 'Failed to register user', error.message));
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(new ApiResponse(false, null, 'Invalid email or password'));
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json(new ApiResponse(false, null, 'Invalid email or password'));
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json(new ApiResponse(true, { token, message: 'Login successful' }));
    } catch (error) {
        
        res.status(500).json(new ApiResponse(false, null, 'Failed to login user'));
    }
};


