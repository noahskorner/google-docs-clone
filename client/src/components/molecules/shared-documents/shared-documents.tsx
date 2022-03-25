import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentInterface from '../../../types/interfaces/document';

interface SharedDocumentsProps {
  documents: Array<DocumentInterface>;
  setDocuments: Function;
}

const SharedDocuments = ({ documents, setDocuments }: SharedDocumentsProps) => {
  const navigate = useNavigate();

  const handleRecentDocumentBtnClick = (
    event: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    const classList = (event.target as HTMLButtonElement).classList;
    if (!classList.contains('document-menu-btn')) navigate(`/document/${id}`);
  };

  return (
    <div className="w-full flex justify-center items-center font-medium text-gray-700 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <h2>Shared Documents</h2>
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

export default SharedDocuments;
