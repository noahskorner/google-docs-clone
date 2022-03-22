import catchAsync from '../../../middleware/catch-async';
import { Request, Response } from 'express';
import { User } from '../../../db/models/user.model';
import { Document } from '../../../db/models/document.model';
import { DocumentUser } from '../../../db/models/document-user.model';
import { validationResult } from 'express-validator';

class ShareController {
  public create = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (!document) return res.sendStatus(400);
    // this document can only be shared by it's original creator
    if (!req.user?.id || document.userId !== parseInt(req.user?.id)) {
      return res.sendStatus(401);
    }

    const { email, permission } = req.body;
    const sharedUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!sharedUser) return res.sendStatus(400);

    await DocumentUser.create({
      documentId: id,
      userId: sharedUser.id,
      permission: permission,
    });

    return res.sendStatus(201);
  });
}
const shareController = new ShareController();

export { shareController };
