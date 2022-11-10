import express from 'express';
import { food, addFood, deleteFood } from '../Controllers/FoodController';
import authenticateToken from '../Middleware/authenticateToken';

const router = express.Router();

router.get('/api/food', authenticateToken, food);

router.post('/api/food/add', authenticateToken, addFood);

router.delete('/api/food/delete/:id', authenticateToken, deleteFood);

export { router as foodRouter };
