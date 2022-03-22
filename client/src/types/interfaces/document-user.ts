import PermissionEnum from '../enums/permission-enum';

interface DocumentUser {
  permission: PermissionEnum;
  userId: number;
  documentId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
  };
}

export default DocumentUser;
