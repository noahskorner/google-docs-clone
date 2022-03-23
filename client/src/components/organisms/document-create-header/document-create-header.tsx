import DocumentSearchbar from '../../atoms/document-searchbar';
import Logo from '../../atoms/logo';
import UserDropdown from '../../atoms/user-dropdown';

const DocumentCreateHeader = () => {
  return (
    <div className="w-full px-3 py-1 flex justify-between items-center">
      <Logo />
      <DocumentSearchbar />
      <UserDropdown />
    </div>
  );
};

export default DocumentCreateHeader;
