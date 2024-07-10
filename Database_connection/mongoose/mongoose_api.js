import express from 'express';
import './config.js'; // Import your MongoDB connection setup
import Product from './product.js'; // Import your Product model
import  ApiResponse from './response.js'; // Import the ApiResponse class
 

const app = express();
app.use(express.json());


// POST: Create a new product
app.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(new ApiResponse(true, savedProduct));
    } catch (error) {
        res.status(400).json(new ApiResponse(false, null, error.message));
    }
});

// GET: Fetch all products
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
    
        res.json(new ApiResponse(true, products));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to fetch products'));
    }
});

// GET: Fetch a single product by ID
app.get('/:id', async (req, res) => {
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
app.put('/update/:id', async (req, res) => {
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
app.delete('/delete/:id', async (req, res) => {
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
app.get('/search/:key', async (req, res) => {
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
