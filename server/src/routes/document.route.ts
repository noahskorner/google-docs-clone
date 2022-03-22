import { Router } from 'express';
import { documentController } from '../controllers/document/document.controller';
import { authenticate } from '../middleware/auth';
import { documentValidator } from '../validators/document.validator';

const router = Router();
router.get('/:id', authenticate, documentController.getOne);
router.get('/', authenticate, documentController.getAll);
router.put(
  '/:id',
  authenticate,
  documentValidator.update,
  documentController.update
);
router.post('/', authenticate, documentController.create);
router.delete('/:id', authenticate, documentController.remove);

export default router;
