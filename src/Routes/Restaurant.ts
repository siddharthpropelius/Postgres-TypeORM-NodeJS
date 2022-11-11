import express from 'express';
const router = express.Router();
import {
  restaurant,
  restaurantById,
  addRestaurant,
  deleteRestaurant,
  updateRestaurant,
  linkCategory,
  deleteCategory,
} from '../Controllers/restaurantController';

import authenticateToken from '../Middleware/authenticateToken';

router.get('/api/restaurant', authenticateToken, restaurant);

router.get(
  '/api/restaurant/by-restaurantId',
  authenticateToken,
  restaurantById
);

router.post(
  '/api/restaurant',
  authenticateToken,
  addRestaurant
);

router.delete(
  '/api/restaurant/',
  authenticateToken,
  deleteRestaurant
);

router.post(
  '/api/restaurant/link',
  authenticateToken,
  linkCategory
);

router.patch(
  '/api/restaurant/',
  authenticateToken,
  updateRestaurant
);

router.delete(
  '/api/restaurant/delete-category',
  authenticateToken,
  deleteCategory
);

export { router as restaurantRouter };
