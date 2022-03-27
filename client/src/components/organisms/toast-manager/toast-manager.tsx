import { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToastContext } from '../../../contexts/toast-context';
import useWindowSize from '../../../hooks/use-window-size';
import Toast from '../../atoms/toast';

const ToastManager = () => {
  const { toasts } = useContext(ToastContext);
  const { heightStr } = useWindowSize();

  return (
    <div
      className="left-4 top-4 sm:top-auto sm:bottom-4 fixed z-40 right-4 sm:w-96 overflow-y-auto scrollbar-hidden"
      style={{ maxHeight: `calc(${heightStr} - 2rem)` }}
    >
      <TransitionGroup className="space-y-2">
        {toasts.reverse().map((toast) => {
          return (
            <CSSTransition
              key={toast.id}
              timeout={200}
              classNames="slide-in"
              unmountOnExit
              children={<Toast {...toast} />}
            />
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default ToastManager;
