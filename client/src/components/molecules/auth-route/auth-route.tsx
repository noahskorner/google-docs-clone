import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/use-auth';

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const { loadingAuth, isAuthenticated, refreshAccessToken } = useAuth();

  useEffect(() => {
    refreshAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingAuth) {
    return <></>;
  } else {
    if (isAuthenticated) return element;
    else return <Navigate to="/login" />;
  }
};

export default AuthRoute;
