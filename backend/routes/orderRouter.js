import Router from 'express'
import { authenticate } from '../middleware/auth.js';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';

const router = Router()
// Create a new order (checkout)
router.post('/', authenticate, createOrder);

// Get all orders for the logged-in user
router.get('/', authenticate, getOrders);

// Get a specific order by ID
router.get('/:id', authenticate, getOrderById);

export default router;