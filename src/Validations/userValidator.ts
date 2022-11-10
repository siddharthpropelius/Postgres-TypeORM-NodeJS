import { body } from 'express-validator';

export const addUserValidate =
  (body('email').isEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be minimum of 6 letters'));

export const loginUserValidate = body('email')
  .isEmail()
  .withMessage('Invalid email address!');
module.exports = { addUserValidate, loginUserValidate };
