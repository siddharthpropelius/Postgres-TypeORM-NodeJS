import express from 'express';
import authenticateToken from '../Middleware/authenticateToken';
import {
  users,
  userLogin,
  addUser,
  updatePassword,
  deleteUser,
  refreshToken,
  userById,
} from '../Controllers/userController';
import {
  addUserValidate,
  loginUserValidate,
  updatePasswordValidate,
} from '../Validations/userValidator';

const router = express.Router();

router.get('/api/users/', authenticateToken, users);
router.post('/api/user/login', loginUserValidate, userLogin);
router.post('/api/user', addUserValidate, addUser);
router.put(
  '/api/user/update-password',
  updatePasswordValidate,
  authenticateToken,
  updatePassword
);
router.delete('/api/user', authenticateToken, deleteUser);
router.get('/api/refresh-token', refreshToken);
router.get('/api/user', authenticateToken, userById);

export { router as userRouter };
