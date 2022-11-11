import express from 'express';
import { body, check } from 'express-validator';
import {
  getCategory,
  addCategory,
  deleteCategory,
} from '../Controllers/categoryController';

import authenticateToken from '../Middleware/authenticateToken';

const router = express.Router();

router.get('/api/category', authenticateToken, getCategory);

router.post('/api/category', authenticateToken, addCategory);

router.delete('/api/category', authenticateToken, deleteCategory);

export { router as categoryRouter };
