import { useContext } from 'react';
import { ToastManagerContext } from '../../../contexts/toast-context';
import Button from '../../atoms/button';
import Component from '../component';
import Variant from '../variant';

const Toasts = () => {
  const toastContext = useContext(ToastManagerContext);

  return (
    <Component header="Toasts">
      <Variant header="Colors">
        <Button
          size="md"
          children={'Primary'}
          color="primary"
          onClick={() =>
            toastContext?.addToast({
              color: 'primary',
              title: 'This is a title',
              body: 'This is a body. It is a little longer',
            })
          }
        />
        <Button
          size="md"
          children={'Secondary'}
          color="secondary"
          onClick={() =>
            toastContext?.addToast({
              color: 'secondary',
              title: 'This is a title',
              body: 'This is a body. It is a little longer',
            })
          }
        />
        <Button
          size="md"
          children={'Success'}
          color="success"
          onClick={() =>
            toastContext?.addToast({
              color: 'success',
              title: 'This is a title',
              body: 'This is a body. It is a little longer',
            })
          }
        />
        <Button
          size="md"
          children={'Warning'}
          color="warning"
          onClick={() =>
            toastContext?.addToast({
              color: 'warning',
              title: 'This is a title',
              body: 'This is a body. It is a little longer',
            })
          }
        />
        <Button
          size="md"
          children={'Danger'}
          color="danger"
          onClick={() =>
            toastContext?.addToast({
              color: 'danger',
              title: 'This is a title',
              body: 'This is a body. It is a little longer',
            })
          }
        />
      </Variant>
    </Component>
  );
};

export default Toasts;
