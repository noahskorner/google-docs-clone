import { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToastManager from '../components/organisms/toast-manager';
import ToastInterface from '../types/toast';

const TOAST_TIMEOUT = 5000; // 5s

interface ToastManagerInterface {
  toasts: Array<ToastInterface>;
  addToast: Function;
  removeToast: Function;
}

export const ToastManagerContext = createContext<ToastManagerInterface | null>(
  null
);

interface ToastManagerProviderInterface {
  children: JSX.Element;
}

export const ToastManagerProvider = ({
  children,
}: ToastManagerProviderInterface) => {
  const [toasts, setToasts] = useState<Array<ToastInterface>>([]);

  const addToast = (
    { id = uuid(), color = 'primary', title, body, actions }: ToastInterface,
    duration = TOAST_TIMEOUT
  ) => {
    setToasts((toasts) => [
      ...toasts,
      {
        id,
        color,
        title,
        body,
        actions,
      },
    ]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastManagerContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastManager />
    </ToastManagerContext.Provider>
  );
};
