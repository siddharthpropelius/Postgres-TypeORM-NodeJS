import express from 'express';
import { orders, deleteOrder, addOrder } from '../Controllers/orderController';
import authenticateToken from '../Middleware/authenticateToken';

const router = express.Router();

router.get('/api/orders', authenticateToken, orders);

router.delete('/api/order', authenticateToken, deleteOrder);

router.post('/api/orders', authenticateToken, addOrder);

export { router as ordersRouter };
