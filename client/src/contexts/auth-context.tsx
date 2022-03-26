import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AuthInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingAuth: boolean;
  setLoadingAuth: Dispatch<SetStateAction<boolean>>;
  errors: Array<string>;
  setErrors: Dispatch<SetStateAction<Array<string>>>;
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: false,
  setLoading: () => {},
  loadingAuth: true,
  setLoadingAuth: () => {},
  errors: [],
  setErrors: () => {},
  userId: null,
  setUserId: () => {},
  email: null,
  setEmail: () => {},
};

export const AuthContext = createContext<AuthInterface>(defaultValues);

interface AuthProviderInterface {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    defaultValues.accessToken
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValues.isAuthenticated
  );
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(
    defaultValues.loadingAuth
  );
  const [errors, setErrors] = useState<Array<string>>(defaultValues.errors);
  const [userId, setUserId] = useState<number | null>(defaultValues.userId);
  const [email, setEmail] = useState<string | null>(defaultValues.email);

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
