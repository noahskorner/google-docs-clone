import { useContext, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../../contexts/toast-context';
import useDocument from '../../../hooks/use-document';
import DocumentInterface from '../../../types/interfaces/document';
import { DotsVerticalIcon } from '@heroicons/react/outline';

interface RecentDocumentsProps {
  documents: Array<DocumentInterface>;
  setDocuments: Function;
}

const RecentDocuments = ({ documents, setDocuments }: RecentDocumentsProps) => {
  const { removeDocument } = useDocument();
  const toastContext = useContext(ToastContext);
  const navigate = useNavigate();

  const handleRecentDocumentBtnClick = (
    event: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    const classList = (event.target as HTMLButtonElement).classList;
    if (!classList.contains('document-menu-btn')) navigate(`/document/${id}`);
  };

  const handleDocumentMenuBtnClick = async (id: number) => {
    await removeDocument(id, (error: null | string) => {
      if (error) toastContext?.error(error);
    });
    setDocuments((allDocuments: Array<DocumentInterface>) =>
      allDocuments.filter((document) => document.id !== id)
    );
  };

  return (
    <div className="w-full flex justify-center items-center font-medium text-gray-700 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <h2>Recent Documents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
          {documents
            .sort((a, b) => {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            })
            .map((document) => {
              return (
                <button
                  onClick={(event) =>
                    handleRecentDocumentBtnClick(event, document.id)
                  }
                  key={document.id}
                  className="text-left"
                >
                  <div className="h-80 w-full border flex flex-col justify-between hover:border-blue-500 rounded">
                    <div className="w-full h-full p-4 flex flex-col space-y-2">
                      {Array.from({ length: 18 }, (x, i) => i).map((i) => {
                        return (
                          <div
                            key={i}
                            style={{
                              width: `${Math.floor(Math.random() * 100)}%`,
                            }}
                            className="h-1 bg-gray-200"
                          ></div>
                        );
                      })}
                    </div>
                    <div className="w-full h-24 border-t p-3">
                      <h6 className="text-sm max-w-full truncate">
                        {document.title}
                      </h6>
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
                            {new Date(document.updatedAt).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                        <span
                          onClick={() =>
                            handleDocumentMenuBtnClick(document.id)
                          }
                          className="hover:bg-gray-100 relative left-2 w-8 h-8 rounded-full flex items-center justify-center document-menu-btn"
                        >
                          <DotsVerticalIcon className="w-5 h-5 document-menu-btn" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RecentDocuments;
