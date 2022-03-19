import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

interface LoginPayload {
  email: String;
  password: String;
}

const login = (payload: LoginPayload) => {
  return apiClient.post('auth/login', payload);
};

interface RegisterPayload {
  username: String;
  email: String;
  password1: String;
  password2: String;
}

const register = (payload: RegisterPayload) => {
  return apiClient.post('auth/register', payload);
};

interface RefreshTokenPayload {
  token: String;
}

const refreshToken = (payload: RefreshTokenPayload) => {
  return apiClient.post('auth/refresh-token', payload);
};

const logout = (accessToken: String) => {
  return apiClient.delete('auth/logout', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const api = {
  login,
  register,
  refreshToken,
  logout,
};

export default api;
