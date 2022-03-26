import axios, { AxiosError } from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';
import AuthService from '../services/auth-service';
import useLocalStorage from './use-local-storage';
import jwt_decode from 'jwt-decode';
import Token from '../types/interfaces/token';

const useAuth = () => {
  const {
    accessToken,
    setAccessToken,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
    loadingAuth,
    setLoadingAuth,
    errors,
    setErrors,
    userId,
    setUserId,
    email,
    setEmail,
  } = useContext(AuthContext);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    'refreshToken',
    null
  );

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await AuthService.login({ email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      setAuth(newAccessToken, newRefreshToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        setErrors([response?.data?.errors?.[0].msg]);
      } else {
        setErrors(['An unknown error has occured. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    if (refreshToken === null) {
      destroyAuth();
      setLoadingAuth(false);
      return;
    }
    try {
      const response = await AuthService.refreshToken({ token: refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      setAuth(newAccessToken, newRefreshToken);
    } catch (error) {
      destroyAuth();
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = async () => {
    if (!accessToken) return;
    try {
      await AuthService.logout(accessToken);
    } catch {
    } finally {
      destroyAuth();
    }
  };

  const silentRefresh = (exp: number) => {
    const msExpiration = Math.abs(
      new Date().getTime() - new Date(exp * 1000).getTime()
    );
    setTimeout(() => {
      refreshAccessToken();
    }, msExpiration);
  };

  const setAuth = (accessToken: string, refreshToken: string) => {
    const { exp, id, email } = jwt_decode<Token>(accessToken);
    silentRefresh(exp);
    setUserId(id);
    setEmail(email);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const destroyAuth = () => {
    setRefreshToken(null);
    setAccessToken(null);
    setUserId(null);
    setEmail(null);
    setIsAuthenticated(false);
  };

  return {
    accessToken,
    isAuthenticated,
    loading,
    loadingAuth,
    errors,
    userId,
    email,
    login,
    logout,
    refreshAccessToken,
  };
};

export default useAuth;
