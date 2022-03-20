import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';
import jwt_decode from 'jwt-decode';
import useLocalStorage from '../hooks/use-local-storage';
import axios, { AxiosError } from 'axios';

interface AuthInterface {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: Function;
  refreshAccessToken: Function;
}

export const AuthContext = createContext<AuthInterface | null>(null);

interface AuthProviderInterface {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    'refreshToken',
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();

  const login = async (email: string, password: string, callback: Function) => {
    setLoading(true);
    try {
      const response = await API.login({ email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      setAuth(newAccessToken, newRefreshToken);
      setLoading(false);
      callback(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        setLoading(false);
        callback(response?.data?.errors?.[0].msg);
      } else {
        setLoading(false);
        callback('An unknown error has occured. Please try again.');
      }
    }
  };

  const refreshAccessToken = async () => {
    if (refreshToken === null) {
      destroyAuth();
      setLoading(false);
      return;
    }

    try {
      const response = await API.refreshToken(refreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      setAuth(newAccessToken, newRefreshToken);
      setLoading(false);
    } catch (error) {
      destroyAuth();
      setLoading(false);
    }
  };

  const silentRefresh = (accessToken: string) => {
    const { exp } = jwt_decode<any>(accessToken);

    const msExpiration = Math.abs(
      new Date().getTime() - new Date(exp * 1000).getTime()
    );
    setTimeout(refreshAccessToken, msExpiration);
  };

  const setAuth = (accessToken: string, refreshToken: string) => {
    silentRefresh(accessToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const destroyAuth = () => {
    setRefreshToken(null);
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    refreshAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        loading,
        refreshAccessToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
