import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/response.js';

const JWT_SECRET = 'jwt_secret_mongoose';

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json(new ApiResponse(false, null, 'Access denied. No token provided.'));
    }

     
    const token = authHeader.split(" ")[1];//Bearer <token>
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        console.log(verified);
        
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json(new ApiResponse(false, null, 'Invalid token'));
    }
};

export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(new ApiResponse(false, null, 'Access denied'));
        }
        next();
    };
};
