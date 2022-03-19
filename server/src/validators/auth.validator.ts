import { body } from 'express-validator';

class AuthValidator {
  public login = [
    body('email').isEmail().withMessage('Must provide a valid email address.'),
    body('password').exists().withMessage('Must provide a password.'),
  ];
  public refreshToken = [
    body('token').exists().withMessage('Must provide a valid token.'),
  ];
}
const authValidator = new AuthValidator();

export { authValidator };
