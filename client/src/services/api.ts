import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default API;

// interface LoginPayload {
//   email: String;
//   password: String;
// }

// const login = (payload: LoginPayload) => {
//   return apiClient.post('auth/login', payload);
// };

// interface RegisterPayload {
//   email: String;
//   password1: String;
//   password2: String;
// }

// const register = (payload: RegisterPayload) => {
//   return apiClient.post('user', payload);
// };

// const refreshToken = (refreshToken: string) => {
//   return apiClient.post('auth/refresh-token', { token: refreshToken });
// };

// const logout = (accessToken: string) => {
//   return apiClient.delete('auth/logout', {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
// };

// const createDocument = (accessToken: string) => {
//   return apiClient.post(
//     'document',
//     {},
//     {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }
//   );
// };

// const getDocument = (accessToken: string, id: number) => {
//   return apiClient.get(`document/${id}`, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
// };

// const getAllDocuments = (accessToken: string) => {
//   return apiClient.get('document', {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
// };

// interface UpdateDocumentPayload {
//   id: number;
//   title?: string;
//   content?: string;
//   isPublic?: boolean;
// }

// const updateDocument = (
//   accessToken: string,
//   { id, ...payload }: UpdateDocumentPayload
// ) => {
//   return apiClient.put(`document/${id}`, payload, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
// };

// const removeDocument = (accessToken: string, id: number) => {
//   return apiClient.delete(`document/${id}`, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
// };

// interface CreateDocumentUserPayload {
//   email: string;
//   id: number;
//   permission: PermissionEnum;
// }

// const createDocumentUser = (
//   accessToken: string,
//   payload: CreateDocumentUserPayload
// ) => {
//   return apiClient.post(
//     `document/${payload.id}/share`,
//     {
//       email: payload.email,
//       permission: payload.permission,
//     },
//     {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     }
//   );
// };

// const verifyEmail = (token: string) => {
//   return apiClient.put(`user/verify-email/${token}`);
// };

// const API = {
//   login,
//   register,
//   refreshToken,
//   logout,
//   createDocument,
//   getDocument,
//   getAllDocuments,
//   updateDocument,
//   removeDocument,
//   createDocumentUser,
//   verifyEmail,
// };
