import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth-context';

const UserDropdown = () => {
  const authContext = useContext(AuthContext);

  return (
    <button className="w-8 h-8 bg-green-800 text-white font-semibold flex justify-center items-center rounded-full hover:ring-2 flex-shrink-0 uppercase">
      {authContext?.email && authContext?.email[0]}
    </button>
  );
};

export default UserDropdown;
