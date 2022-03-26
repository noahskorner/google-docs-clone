import { ChangeEvent, FocusEvent, useContext } from 'react';
import Logo from '../../atoms/logo';
import UserDropdown from '../../atoms/user-dropdown';
import DocumentInterface from '../../../types/interfaces/document';
import { ToastContext } from '../../../contexts/toast-context';
import ShareDocumentModal from '../share-document-modal';
import { AuthContext } from '../../../contexts/auth-context';
import useRandomBackground from '../../../hooks/use-random-background';
import useDocument from '../../../hooks/use-document';
import useAuth from '../../../hooks/use-auth';

const DocumentMenuBar = () => {
  const { backgroundColor } = useRandomBackground();
  const toastContext = useContext(ToastContext);
  const { email } = useAuth();
  const { document, saving, currentUsers, saveDocument, setDocumentTitle } =
    useDocument();

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setDocumentTitle(title);
  };

  const handleTitleInputBlur = async (event: FocusEvent<HTMLInputElement>) => {
    await saveDocument();
  };

  return (
    <div className="w-full flex justify-between items-center px-3 pb-1 border-b">
      {/* Left */}
      <div className="w-full flex justify-start items-center overflow-x-hidden md:overflow-visible">
        <Logo />
        <div className="flex flex-col">
          <input
            maxLength={25}
            type="text"
            onBlur={(event) => handleTitleInputBlur(event)}
            onChange={(event) => handleTitleInputChange(event)}
            value={document?.title ? document?.title : ''}
            className="font-medium text-lg px-2 pt-2"
            name=""
            id=""
            placeholder="Untitled Document"
          />
          <div className="flex items-center">
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              File
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Edit
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              View
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Insert
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Format
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Tools
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Add-ons
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Help
            </button>
            {saving && <p className="text-sm text-gray-500 px-2">Saving...</p>}
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center flex-shrink-0 pl-3 gap-x-4">
        {/* {document !== null && document.userId === authContext?.id && (
          <ShareDocumentModal document={document} setDocument={setDocument} />
        )} */}
        <div className="flex items-center gap-x-2">
          {currentUsers &&
            Array.from(currentUsers)
              .filter((currentUser) => currentUser !== email)
              .map((currentUser) => {
                return (
                  <div
                    key={currentUser}
                    className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full flex-shrink-0 uppercase ring-2`}
                  >
                    {currentUser[0]}
                  </div>
                );
              })}
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default DocumentMenuBar;
