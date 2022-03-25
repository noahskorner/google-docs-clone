import { Op } from 'sequelize';
import { DocumentUser } from '../db/models/document-user.model';
import { Document } from '../db/models/document.model';

class DocumentService {
  public findDocumentById = async (id: number, userId: number) => {
    let document = await Document.findOne({
      where: {
        [Op.or]: [
          {
            id: id,
            userId: userId,
          },
          {
            id: id,
            isPublic: true,
          },
        ],
      },
    });

    if (!document) {
      const sharedDocument = await DocumentUser.findOne({
        where: {
          userId: userId,
          documentId: id,
        },
        include: {
          model: Document,
        },
      });

      if (!sharedDocument) return null;

      document = sharedDocument.document;
    }

    return document;
  };
}

export default new DocumentService();
