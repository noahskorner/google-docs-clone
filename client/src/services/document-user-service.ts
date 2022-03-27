import PermissionEnum from '../enums/permission-enum';
import API from './api';

const DocumentUserService = {
  create: (
    accessToken: string,
    payload: { documentId: number; email: string; permission: PermissionEnum }
  ) => {
    return API.post(`document/${payload.documentId}/share`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default DocumentUserService;
