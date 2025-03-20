import Router from 'express'
import { getAllProducts, getProductById, addProduct, updateProductById, deleteProductById } from './../controllers/productControllers.js'
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = Router()

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes - require authentication and admin privileges
router.post('/', authenticate, isAdmin, addProduct);
router.put('/:id', authenticate, isAdmin, updateProductById);
router.delete('/:id', authenticate, isAdmin, deleteProductById);

export default router;