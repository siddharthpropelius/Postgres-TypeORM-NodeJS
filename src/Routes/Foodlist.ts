import express from 'express';
import {
  food,
  addFood,
  deleteFood,
  searchFood,
  getFoodPagination,
} from '../Controllers/FoodController';
import authenticateToken from '../Middleware/authenticateToken';

const router = express.Router();

router.get('/api/food', authenticateToken, food);

router.post('/api/food/add', authenticateToken, addFood);

router.delete('/api/food/delete/:id', authenticateToken, deleteFood);

router.get('/api/food/search', searchFood);
router.get('/api/food/page', getFoodPagination);

export { router as foodRouter };
