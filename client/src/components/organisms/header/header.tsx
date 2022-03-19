import { LoginIcon, MenuAlt1Icon } from '@heroicons/react/outline';
import ThemeButton from '../../atoms/theme-button';
import IconButton from '../../atoms/icon-button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  setShowSidebar: Function;
}

const Header = ({ setShowSidebar }: HeaderProps) => {
  return (
    <nav className="border-b border-primary h-14 font-medium flex items-center justify-center text-sm px-2 lg:px-4 fixed top-0 right-0 left-0 lg:left-80 bg-primary z-10">
      <div className="w-full space-x-6 flex justify-between">
        <div className="flex space-x-4">
          <IconButton
            onClick={() => setShowSidebar(true)}
            icon={<MenuAlt1Icon className="h-5 w-5" />}
            className="lg:hidden"
          />
        </div>
        <div className="flex space-x-4">
          <ThemeButton />
          <Link to="/login" className="btn-icon">
            <LoginIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
