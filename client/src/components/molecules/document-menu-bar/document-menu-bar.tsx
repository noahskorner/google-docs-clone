import { ChangeEvent, FocusEvent, useContext, useRef, useState } from 'react';
import Logo from '../../atoms/logo';
import { CSSTransition } from 'react-transition-group';
import UserDropdown from '../../atoms/user-dropdown';
import DocumentInterface from '../../../types/interfaces/document';
import { ToastContext } from '../../../contexts/toast-context';
import ShareDocumentModal from '../share-document-modal';

interface DocumentMenubarProps {
  saving: boolean;
  saveDocument: Function;
  document: null | DocumentInterface;
  setDocumentTitle: Function;
}

const DocumentMenuBar = ({
  saving,
  saveDocument,
  document,
  setDocumentTitle,
}: DocumentMenubarProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  const toastContext = useContext(ToastContext);

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setDocumentTitle(title);
  };

  const handleTitleInputBlur = async (event: FocusEvent<HTMLInputElement>) => {
    const title = event.target.value;
    await saveDocument(
      { title, ...document } as DocumentInterface,
      (error: string | null) => {
        toastContext?.error(error);
      }
    );
  };

  return (
    <div className="w-full flex justify-between items-center px-3 pb-1 border-b">
      {/* Left */}
      <div className="w-full flex justify-start items-center scrollbar-hidden">
        <Logo />
        <div className="flex flex-col">
          <input
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
            <div className="relative" onBlur={() => setShowDropdown(false)}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md"
              >
                File
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
                    className="absolute top-full left-0 z-10 w-52 bg-white py-2 rounded-sm shadow-lg border"
                  >
                    <button className="w-full text-black hover:bg-gray-100 text-sm px-6 py-2 text-left">
                      Click
                    </button>
                    <button className="w-full text-black hover:bg-gray-100 text-sm px-6 py-2 text-left">
                      Click
                    </button>
                    <button className="w-full text-black hover:bg-gray-100 text-sm px-6 py-2 text-left">
                      Click
                    </button>
                    <button className="w-full text-black hover:bg-gray-100 text-sm px-6 py-2 text-left">
                      Click
                    </button>
                    <button className="w-full text-black hover:bg-gray-100 text-sm px-6 py-2 text-left">
                      Click
                    </button>
                  </div>
                }
              />
            </div>
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
        <ShareDocumentModal />
        <UserDropdown />
      </div>
    </div>
  );
};

export default DocumentMenuBar;
