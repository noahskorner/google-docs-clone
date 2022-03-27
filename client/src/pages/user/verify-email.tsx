import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ToastContext } from '../../contexts/toast-context';
import AuthService from '../../services/auth-service';

const VerifyEmail = () => {
  const { token } = useParams();
  const toastContext = useContext(ToastContext);
  const [children, setChildren] = useState(<>Loading...</>);

  const verifyEmail = async () => {
    if (token === undefined) {
      toastContext?.error('This token is invalid.');
      setChildren(<Navigate to="/login" />);
      return;
    }

    try {
      await AuthService.verifyEmail(token);

      toastContext?.addToast({
        title: 'Successfully verified your email address!',
        body: 'You may now login.',
        color: 'success',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastContext?.error('An unknown error has occurred. Please try again');
      } else {
        toastContext?.error('An unknown error has occurred. Please try again');
      }
    } finally {
      setChildren(<Navigate to="/login" />);
      return;
    }
  };

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default VerifyEmail;
