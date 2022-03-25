import DocumentUser from './document-user';

interface DocumentInterface {
  id: number;
  title?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  users: Array<DocumentUser>;
  isPublic: boolean;
}

export default DocumentInterface;