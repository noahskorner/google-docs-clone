import DocumentInterface from '../types/interfaces/document';
import API from './api';

const DocumentService = {
  create: (accessToken: string) => {
    return API.post(
      'document',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  },
  get: (accessToken: string, documentId: number) => {
    return API.get(`document/${documentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  list: (accessToken: string) => {
    return API.get('document', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  update: (accessToken: string, payload: DocumentInterface) => {
    return API.put(`document/${payload.id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  remove: (accessToken: string, documentId: number) => {
    return API.delete(`document/${documentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default DocumentService;
