import { DotsVerticalIcon } from '@heroicons/react/outline';
import useAuth from '../../../hooks/use-auth';
import DocumentInterface from '../../../types/interfaces/document';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentService from '../../../services/document-service';
import { ToastContext } from '../../../contexts/toast-context';

interface DocumentCardProps {
  document: DocumentInterface;
  setDocuments: Function;
}

const DocumentCard = ({ document, setDocuments }: DocumentCardProps) => {
  const [loading, setLoading] = useState(false);
  const { userId, accessToken } = useAuth();
  const toastContext = useContext(ToastContext);
  const navigate = useNavigate();
  const skeleton = useRef<Array<JSX.Element> | null>(null);

  const handleDocumentBtnClick = (
    event: MouseEvent<HTMLButtonElement>,
    documentId: number
  ) => {
    const classList = (event.target as HTMLButtonElement).classList;
    if (!classList.contains('document-menu-btn'))
      navigate(`/document/${documentId}`);
  };

  const handleDocumentMenuBtnClick = async (id: number) => {
    if (accessToken === null) return;

    setLoading(true);

    try {
      await DocumentService.remove(accessToken, id);
      setDocuments((allDocuments: Array<DocumentInterface>) =>
        allDocuments.filter((document) => document.id !== id)
      );
    } catch (error) {
      toastContext?.error('Unable to remove document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    skeleton.current = Array.from({ length: 18 }, (x, i) => i).map((i) => {
      return (
        <div
          key={i}
          style={{
            width: `${Math.floor(Math.random() * 100)}%`,
          }}
          className="h-1 bg-gray-200"
        ></div>
      );
    });
  }, []);

  return (
    <button
      onClick={(event) => handleDocumentBtnClick(event, document.id)}
      key={document.id}
      className="text-left"
    >
      <div className="h-80 w-full border flex flex-col justify-between hover:border-blue-500 rounded">
        <div className="w-full h-full p-4 flex flex-col space-y-2">
          {skeleton.current}
        </div>
        <div className="w-full h-24 border-t p-3">
          <h6 className="text-sm max-w-full truncate">{document.title}</h6>
          <div className="flex items-center justify-between">
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white relative right-2"
                fill="#3b82f6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-xs text-gray-400 relative right-2">
                {new Date(document.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            {document.userId === userId && (
              <span
                onClick={() => handleDocumentMenuBtnClick(document.id)}
                className="hover:bg-gray-100 relative left-2 w-8 h-8 rounded-full flex items-center justify-center document-menu-btn"
              >
                <DotsVerticalIcon className="w-5 h-5 document-menu-btn" />
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
export default DocumentCard;
