import catchAsync from '../../middleware/catch-async';
import { Request, Response } from 'express';
import { Document } from '../../db/models/document.model';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';

class DocumentController {
  public getOne = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const document = await Document.findOne({
      where: {
        [Op.or]: [
          {
            id: id,
            userId: req.user?.id,
          },
          {
            id: id,
            isPublic: true,
          },
        ],
      },
    });

    if (!document) return res.sendStatus(404);

    return res.status(200).json(document);
  });

  public getAll = catchAsync(async (req: Request, res: Response) => {
    const documents = await Document.findAll({
      where: {
        userId: req.user?.id,
      },
    });

    return res.status(200).json(documents);
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    const document = await Document.create({
      userId: req.user?.id,
    });
    return res.status(201).json(document);
  });

  public update = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const { id } = req.params;
    const { title, content, isPublic } = req.body;

    const document = await Document.findOne({
      where: {
        id: id,
        userId: req.user?.id,
      },
    });

    if (!document) return res.sendStatus(404);

    if (title !== undefined && title !== null) document.title = title;
    if (content) document.content = content;
    if (isPublic !== undefined) document.isPublic = isPublic;
    document.save();

    return res.sendStatus(200);
  });

  public remove = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await Document.destroy({
      where: {
        id: id,
        userId: req.user?.id,
      },
    });

    return res.sendStatus(200);
  });
}
const documentController = new DocumentController();

export { documentController };
