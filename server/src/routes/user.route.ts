import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';
import { userValidator } from '../validators/user.validator';

const router = Router();
router.post('/', userValidator.register, userController.register);
router.put('/verify-email/:token', userController.verifyEmail);
router.get('/:id', authenticate, userController.getUser);
router.post(
  '/reset-password',
  userValidator.resetPassword,
  userController.resetPassword
);
router.put(
  '/password/:token',
  userValidator.confirmResetPassword,
  userController.confirmResetPassword
);

export default router;
