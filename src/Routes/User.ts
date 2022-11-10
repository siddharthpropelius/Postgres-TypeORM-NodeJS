import express from 'express';
import authenticateToken from '../Middleware/authenticateToken';
import {
  users,
  userLogin,
  addUser,
  updatePassword,
  deleteUser,
  refreshToken,
} from '../Controllers/userController';
import {
  addUserValidate,
  loginUserValidate,
} from '../Validations/userValidator';

const router = express.Router();

router.get('/api/user/', authenticateToken, users);
router.post('/api/user/login', loginUserValidate, userLogin);
router.post('/api/user', authenticateToken, addUserValidate, addUser);
router.put('/api/user/update-password', authenticateToken, updatePassword);
router.delete('/api/user', authenticateToken, deleteUser);
router.get('/api/refresh-token', authenticateToken, refreshToken);

export { router as userRouter };
