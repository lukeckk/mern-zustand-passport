import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/stripeController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Create payment intent (protected route)
router.post('/create-payment-intent', authenticate, createPaymentIntent);

// Webhook endpoint (no auth required, but needs raw body)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 