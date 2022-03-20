import { Router } from 'express';
import { documentController } from '../controllers/document.controller';
import { authenticate } from '../middleware/auth';
import { documentValidator } from '../validators/document.validator';

const router = Router();
router.get('/:id', authenticate, documentController.read);
router.put(
  '/:id',
  authenticate,
  documentValidator.update,
  documentController.update
);
router.post('/', authenticate, documentController.create);

export default router;
