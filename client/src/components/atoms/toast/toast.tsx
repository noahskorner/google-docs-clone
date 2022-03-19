import ToastInterface from '../../../types/toast';
import { MouseEvent, useContext } from 'react';
import { ToastManagerContext } from '../../../contexts/toast-context';

const TOAST_CLASSES = {
  primary: 'toast-primary',
  secondary: 'toast-secondary',
  success: 'toast-success',
  warning: 'toast-warning',
  danger: 'toast-danger',
};

const Toast = ({ id, color, title, body, actions }: ToastInterface) => {
  const toastContext = useContext(ToastManagerContext);

  const handleToastClick = (e: MouseEvent<HTMLDivElement>) => {
    const classListArr = Array.from((e.target as HTMLButtonElement).classList);
    if (!classListArr.includes('action')) toastContext?.removeToast(id);
  };

  return (
    <div
      onClick={handleToastClick}
      className={`${TOAST_CLASSES[color]} w-full rounded-md bg-white dark:bg-slate-700 shadow-md dark:shadow-2xl flex items-stretch text-sm relative cursor-pointer text-primary`}
    >
      <div className="w-full p-4 space-y-1">
        {title && <h6 className="font-medium">{title}</h6>}
        {body && <p className="text-slate-500 dark:text-slate-300">{body}</p>}
        <div className="max-w-fit flex flex-wrap justify-start items-start">
          {actions?.map((a, index) => {
            return (
              <button
                key={index}
                className="text-blue-500 font-semibold hover:underline text-center pr-2 action"
                onClick={() => a.action()}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Toast;
