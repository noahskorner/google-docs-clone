import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth-context';
import useRandomBackground from '../../../hooks/use-random-background';

const UserDropdown = () => {
  const authContext = useContext(AuthContext);
  const { backgroundColor } = useRandomBackground();

  return (
    <button
      className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full ring-2 flex-shrink-0 uppercase`}
    >
      {authContext?.email && authContext?.email[0]}
    </button>
  );
};

export default UserDropdown;
