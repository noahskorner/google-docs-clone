import { body } from 'express-validator';

class DocumentValidator {
  public update = [
    body('title')
      .optional()
      .isLength({ min: 0, max: 25 })
      .withMessage('Title must be between 0 and 25 characters.'),
    body('content')
      .optional()
      .custom((value) => {
        try {
          JSON.parse(value);
        } catch (error) {
          console.log(error);
          throw new Error('Invalid document content.');
        }
        return true;
      }),
  ];
}
const documentValidator = new DocumentValidator();

export { documentValidator };
