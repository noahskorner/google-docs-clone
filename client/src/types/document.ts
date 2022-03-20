interface DocumentInterface {
  id: number;
  title?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export default DocumentInterface;
