import Product from '../models/product.js';
import ApiResponse from '../utils/response.js';

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(new ApiResponse(true, savedProduct));
    } catch (error) {
        res.status(400).json(new ApiResponse(false, null, error.message));
    }
};

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(new ApiResponse(true, products));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to fetch products'));
    }
};

export const fetchProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json(new ApiResponse(false, null, 'Product not found'));
        }
        res.json(new ApiResponse(true, product));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to fetch product'));
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json(new ApiResponse(false, null, 'Product not found or no changes made'));
        }
        res.json(new ApiResponse(true, updatedProduct));
    } catch (error) {
        res.status(400).json(new ApiResponse(false, null, error.message));
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json(new ApiResponse(false, null, 'Product not found'));
        }
        res.json(new ApiResponse(true, { message: 'Product deleted successfully' }));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to delete product'));
    }
};

export const searchProducts = async (req, res) => {
    try {
        const key = req.params.key;
        const response = await Product.find({
            $or: [
                { name: { $regex: key, $options: 'i' } },
                { brand: { $regex: key, $options: 'i' } }
            ]
        });
        if(response.length===0)
        {
            res.json(new ApiResponse(true, "No record found..")); 
        }
        res.json(new ApiResponse(true, response));
    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, 'Failed to search products'));
    }
};
