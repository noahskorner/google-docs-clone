import { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToastManager from '../components/organisms/toast-manager';
import ToastInterface from '../types/toast';

const TOAST_TIMEOUT = 5000; // 5s

interface ToastManagerInterface {
  toasts: Array<ToastInterface>;
  addToast: Function;
  removeToast: Function;
  error: Function;
  success: Function;
}

export const ToastContext = createContext<ToastManagerInterface | null>(null);

interface ToastProviderInterface {
  children: JSX.Element;
}

export const ToastProvider = ({ children }: ToastProviderInterface) => {
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

  const error = (title: string) => {
    addToast({ color: 'danger', title });
  };

  const success = (title: string) => {
    addToast({ color: 'success', title });
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, error, success }}
    >
      {children}
      <ToastManager />
    </ToastContext.Provider>
  );
};
