import API from './api';

const AuthService = {
  login: (payload: { email: string; password: string }) => {
    return API.post('auth/login', payload);
  },
  register: (payload: {
    email: string;
    password1: string;
    password2: string;
  }) => {
    return API.post('user', payload);
  },
  refreshToken: (payload: { token: string }) => {
    return API.post('auth/refresh-token', payload);
  },
  logout: (accessToken: string) => {
    return API.delete('auth/logout', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  // verifyEmail
};

export default AuthService;
