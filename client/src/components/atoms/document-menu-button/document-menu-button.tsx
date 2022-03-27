import { useContext, useRef, useState, FocusEvent } from 'react';
import useAuth from '../../../hooks/use-auth';
import { CSSTransition } from 'react-transition-group';
import { ToastContext } from '../../../contexts/toast-context';
import DocumentService from '../../../services/document-service';
import DocumentInterface from '../../../types/interfaces/document';

interface DocumentMenuButtonProps {
  documentId: number;
  setDocuments: Function;
}

const DocumentMenuButton = ({
  documentId,
  setDocuments,
}: DocumentMenuButtonProps) => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const toastContext = useContext(ToastContext);

  const handleMenuBtnBlur = (event: FocusEvent<HTMLButtonElement>) => {
    const classList = (event.target as HTMLButtonElement).classList;

    if (!classList.contains('document-menu')) {
      setShowDropdown(false);
    }
  };

  const handleDeleteBtnClick = async () => {
    if (accessToken === null) return;

    setLoading(true);

    try {
      await DocumentService.remove(accessToken, documentId);
      setDocuments((allDocuments: Array<DocumentInterface>) =>
        allDocuments.filter((document) => document.id !== documentId)
      );
    } catch (error) {
      toastContext?.error('Unable to remove document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative flex justify-center document-menu-btn-${documentId}`}
    >
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        onBlur={handleMenuBtnBlur}
        className={`hover:bg-gray-100 relative left-2 w-8 h-8 rounded-full flex items-center justify-center document-menu-btn-${documentId}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-5 h-5 document-menu-btn-${documentId}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`document-menu-btn-${documentId}`}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          ></path>
        </svg>
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
            className="absolute top-full mt-1 z-10 w-52 bg-white py-2 rounded-sm shadow-lg border document-menu"
          >
            <div
              onClick={() => (!loading ? handleDeleteBtnClick() : () => {})}
              className="w-full text-black hover:bg-gray-100 text-sm px-6 py-2 text-left document-menu"
            >
              Delete
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DocumentMenuButton;
