import useWindowSize from '../../hooks/useWindowSize';
import TextField from '../../components/atoms/text-field/text-field';
import { KeyboardEvent, useContext, useState } from 'react';
import { ToastManagerContext } from '../../contexts/toast-context';
import Logo from '../../components/atoms/logo';
import API from '../../services/api';

const Login = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toastContext = useContext(ToastManagerContext);

  const login = async () => {
    try {
      const response = await API.login({ email, password });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') login();
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
            onInput={setEmail}
            label="Email"
            color="secondary"
          />
          <TextField
            value={password}
            onInput={setPassword}
            label="Password"
            type="password"
            color="secondary"
          />
          <button className="text-sm hover:underline font-semibold text-blue-500 text-left">
            Forgot Password?
          </button>
          <button
            onClick={login}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            Login
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
