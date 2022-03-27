import { useContext, useRef, useState } from 'react';
import useRandomBackground from '../../../hooks/use-random-background';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../../contexts/toast-context';
import useAuth from '../../../hooks/use-auth';

const UserDropdown = () => {
  const { backgroundColor } = useRandomBackground();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const toastContext = useContext(ToastContext);
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    toastContext?.success('Successfully logged out!');
    navigate('/login');
  };

  return (
    <div className="relative" onBlur={() => setShowDropdown(false)}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full ring-2 flex-shrink-0 uppercase`}
      >
        {email !== null && email[0]}
      </button>
      <CSSTransition
        nodeRef={dropdownRef}
        in={showDropdown}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
        children={
          <div
            ref={dropdownRef}
            className="absolute top-full mt-1 right-0 z-10 w-52 bg-white py-2 rounded-sm shadow-lg border"
          >
            <button
              onClick={logoutUser}
              className="w-full text-black hover:bg-gray-100 text-sm px-6 py-2 text-left"
            >
              Logout
            </button>
          </div>
        }
      />
    </div>
  );
};

export default UserDropdown;
