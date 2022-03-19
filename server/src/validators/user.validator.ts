import { body } from 'express-validator';
import { userService } from '../services/user.service';

class UserValidator {
  public register = [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Must provide a valid email address.'),
    body('email').custom(async (value) => {
      const user = await userService.findUserByEmail(value);

      if (user) {
        return Promise.reject('User with that email already exists.');
      }
      return true;
    }),
    body('password1')
      .isLength({ min: 8, max: 25 })
      .withMessage('Password must be between 8 to 25 characters.'),
    body('password1')
      .matches(/\d/)
      .withMessage('Password must contain at least 1 number'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password1) {
        throw new Error('Passwords must match.');
      }
      return true;
    }),
  ];
  public resetPassword = [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Must provide a valid email address.'),
  ];
  public confirmResetPassword = [
    body('password1')
      .isLength({ min: 8, max: 25 })
      .withMessage('Password must be between 8 to 25 characters.'),
    body('password1')
      .matches(/\d/)
      .withMessage('Password must contain at least 1 number'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password1) {
        throw new Error('Passwords must match.');
      }
      return true;
    }),
  ];
}
const userValidator = new UserValidator();

export { userValidator };
