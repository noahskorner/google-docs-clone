import useWindowSize from '../../hooks/use-window-size';
import TextField from '../../components/atoms/text-field/text-field';
import { KeyboardEvent, useContext, useState } from 'react';
import { ToastContext } from '../../contexts/toast-context';
import Logo from '../../components/atoms/logo';
import validator from 'validator';
import Spinner from '../../components/atoms/spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';

const Login = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<Array<string>>([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);
  const authContext = useContext(AuthContext);

  const validate = () => {
    setEmailErrors([]);
    setPasswordErrors([]);
    let isValid = true;

    if (!validator.isEmail(email)) {
      setEmailErrors(['Must enter a valid email.']);
      isValid = false;
    }
    if (!password.length) {
      setPasswordErrors(['Must enter a password.']);
      isValid = false;
    }

    return isValid;
  };

  const login = async () => {
    if (!validate()) return;

    await authContext?.login(email, password, (error: string | null) => {
      if (error === null) {
        toastContext?.success('Successfully logged in!');
        navigate('/document/create');
      } else {
        toastContext?.error(error);
        setEmailErrors(['']);
        setPasswordErrors(['']);
      }
    });
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') login();
  };

  const handleOnInputEmail = (value: string) => {
    setEmailErrors([]);
    setEmail(value);
  };

  const handleOnInputPassword = (value: string) => {
    setPasswordErrors([]);
    setPassword(value);
  };

  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="w-full flex flex-col sm:justify-center items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary"
      style={{ width: widthStr, height: heightStr }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded border-primary shadow-md border dark:border-0 dark:shadow-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <Logo />
            <h1 className="font-medium text-2xl">Sign in</h1>
            <p className="font-medium">to continue to Docs</p>
          </div>
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="secondary"
            errors={emailErrors}
          />
          <TextField
            value={password}
            onInput={handleOnInputPassword}
            label="Password"
            type="password"
            color="secondary"
            errors={passwordErrors}
          />
          <button className="text-sm hover:underline font-semibold text-blue-500 text-left">
            Forgot Password?
          </button>
          <button
            onClick={login}
            disabled={authContext?.loading}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className={`${authContext?.loading && 'opacity-0'}`}>
              Login
            </span>
            {authContext?.loading && <Spinner size="sm" />}
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-sm p-4">
        <button className="hover:underline font-semibold text-blue-500">
          Terms
        </button>
        <button className="hover:underline font-semibold text-blue-500">
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default Login;
