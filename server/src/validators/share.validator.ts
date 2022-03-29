import { body } from 'express-validator';
import PermissionEnum from '../types/enums/permission-enum';

class ShareValidator {
  public create = [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Must provide a valid email to share this document with.'),
    body('permission').custom((value) => {
      if (!Object.values(PermissionEnum).includes(value))
        throw new Error('Must provide a valid document permission.');
      else return true;
    }),
  ];
}
const shareValidator = new ShareValidator();

export { shareValidator };
