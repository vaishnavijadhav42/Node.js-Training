import express from 'express';
import './config.js'; // Import your MongoDB connection setup
import Product from './product.js'; // Import your Product model
import  ApiResponse from './utils/response.js'; // Import the ApiResponse class
import User from './user.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const JWT_SECRET = 'jwt_secret_mongoose';

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, email, role, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json(new ApiResponse(false, null, 'User already exists'));
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            role,
            password
        });

        // Save user to database
        const savedUser = await newUser.save();

        res.status(201).json(new ApiResponse(true, savedUser));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to register user', error.message));
    }
});

// Login a user and generate a JWT
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(new ApiResponse(false, null, 'Invalid email or password'));
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            return res.status(401).json(new ApiResponse(false, null, 'Invalid email or password'));
        }

        // Generate a JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send the success message and token
        res.status(200).json(new ApiResponse(true, { token, message: 'Login successful' }));
    } catch (error) {
        console.error('Error logging in user:', error); 
        res.status(500).json(new ApiResponse(false, null, 'Failed to login user'));
    }
});



const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json(new ApiResponse(false, null, 'Access denied. No token provided.'));
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        console.log(verified);
        req.user=verified;
        next();
    } catch (error) {
        res.status(400).json(new ApiResponse(false, null, 'Invalid token'));
    }
};

// Middleware to authorize roles
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(new ApiResponse(false, null, 'Access denied'));
        }
        next();
    };
};

// POST: Create a new product
app.post('/', authenticateJWT,authorizeRole(['admin', 'user']),async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(new ApiResponse(true, savedProduct));
    } catch (error) {
        res.status(400).json(new ApiResponse(false, null, error.message));
    }
});

// GET: Fetch all products
app.get('/',authenticateJWT,authorizeRole(['admin', 'user']), async (req, res) => {
    try {
        const products = await Product.find();
    
        res.json(new ApiResponse(true, products));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to fetch products'));
    }
});

// GET: Fetch a single product by ID
app.get('/:id',authenticateJWT,authorizeRole(['admin', 'user']), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json(new ApiResponse(false, null, 'Product not found'));
        }
        res.json(new ApiResponse(true, product));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to fetch product'));
    }
});

// PUT: Update a product by ID
app.put('/update/:id',authenticateJWT, authorizeRole(['admin']),async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json(new ApiResponse(false, null, 'Product not found or no changes made'));
        }
        res.json(new ApiResponse(true, updatedProduct));
    } catch (error) {
        res.status(400).json(new ApiResponse(false, null, error.message));
    }
});

// DELETE: Delete a product by ID
app.delete('/delete/:id', authenticateJWT,authorizeRole(['admin']),async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json(new ApiResponse(false, null, 'Product not found'));
        }
        res.json(new ApiResponse(true, { message: 'Product deleted successfully' }));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to delete product'));
    }
});

// GET: Search products by name or brand (case-insensitive)
app.get('/search/:key',authenticateJWT, authorizeRole(['admin', 'user']),async (req, res) => {
    try {
        const key = req.params.key;
        const response = await Product.find({
            $or: [
                { name: { $regex: key, $options: 'i' } },
                { brand: { $regex: key, $options: 'i' } }
            ]
        });
        res.json(new ApiResponse(true, response));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to search products'));
    }
});

// Handle all other routes (404 Not Found)
app.all('*', (req, res) => {
    res.status(404).json(new ApiResponse(false, null, `Cannot find ${req.originalUrl}`));
});

// Start the server

app.listen(5000);
