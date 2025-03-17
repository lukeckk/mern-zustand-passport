import Router from 'express'
import { signup, login, updatePassword, logout, getProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/password', authenticate, updatePassword);
router.get('/profile', authenticate, getProfile);

export default router;