import express from 'express';
import {
    createProduct,
    fetchAllProducts,
    fetchProductById,
    updateProduct,
    deleteProduct,
    searchProducts
} from '../controllers/productController.js';
import { authenticateJWT, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateJWT, authorizeRole(['admin', 'user']), createProduct);
router.get('/', authenticateJWT, authorizeRole(['admin', 'user']), fetchAllProducts);
router.get('/:id', authenticateJWT, authorizeRole(['admin', 'user']), fetchProductById);
router.put('/update/:id', authenticateJWT, authorizeRole(['admin']), updateProduct);
router.delete('/delete/:id', authenticateJWT, authorizeRole(['admin']), deleteProduct);
router.get('/search/:key', authenticateJWT, authorizeRole(['admin', 'user']), searchProducts);

export default router;
