import useWindowSize from '../../hooks/useWindowSize';
import TextField from '../../components/atoms/text-field/text-field';
import { useContext, useState } from 'react';
import { ToastManagerContext } from '../../contexts/toast-context';

const Login = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toastContext = useContext(ToastManagerContext);

  const handleLoginBtnClick = () => {
    toastContext?.addToast({
      title: 'Logging you in!',
    });
  };

  return (
    <div
      className="w-full flex flex-col sm:justify-center items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary"
      style={{ width: widthStr, height: heightStr }}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-md border-primary shadow-md border dark:border-0 dark:shadow-xl p-6">
        <div className="grid grid-cols-1 gap-y-4">
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
          <button onClick={handleLoginBtnClick}>Login</button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-sm p-4">
        <button className="hover:underline font-medium text-blue-500">
          Terms
        </button>
        <button className="hover:underline font-medium text-blue-500">
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default Login;
