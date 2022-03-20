import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth-context';

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const authContext = useContext(AuthContext);

  if (authContext?.loading) {
    return <></>;
  } else {
    if (authContext?.isAuthenticated) return element;
    else return <Navigate to="/login" />;
  }
};

export default AuthRoute;
