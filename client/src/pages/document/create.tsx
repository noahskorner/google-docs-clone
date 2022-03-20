import DocumentCreateHeader from '../../components/organisms/document-create-header';
import useWindowSize from '../../hooks/use-window-size';
import { PlusIcon } from '@heroicons/react/outline';
import useDocument from '../../hooks/use-document';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../contexts/toast-context';
import DocumentInterface from '../../types/document';
import Spinner from '../../components/atoms/spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';

const Create = () => {
  const { heightStr } = useWindowSize();
  const [documents, setDocuments] = useState<Array<DocumentInterface>>([]);
  const { loading, createDocument, loadAllDocuments } = useDocument();
  const toastContext = useContext(ToastContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDocumentCreateBtnClick = async () => {
    await createDocument((error: string, document: DocumentInterface) => {
      if (!error) {
        navigate(`/document/${document.id}`);
      } else {
        toastContext?.error(error);
      }
    });
  };

  useEffect(() => {
    loadAllDocuments(
      (error: null | string, documents: Array<DocumentInterface>) => {
        if (!error) {
          setDocuments(documents);
        } else {
          toastContext?.error(error);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext]);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <div className="w-full h-80 bg-gray-100 flex justify-center items-center font-medium text-gray-700 px-4 overflow-hidden">
        <div className="w-full h-full max-w-4xl py-4 space-y-4 overflow-auto">
          <h1>Start a new document</h1>
          <div className="flex items-center">
            <div className="space-y-2">
              <button
                disabled={loading}
                onClick={() => handleDocumentCreateBtnClick()}
                className="h-52 w-40 bg-white border hover:border-blue-500 flex items-center justify-center"
              >
                <span className={`${loading && 'opacity-0'}`}>
                  <PlusIcon className="w-16 h-16 text-red-500" />
                </span>
                {loading && <Spinner size="md" />}
              </button>
              <h3 className="text-sm">Blank</h3>
            </div>
          </div>
        </div>
      </div>
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
                  <Link key={document.id} to={`/document/${document.id}`}>
                    <div className="h-80 w-full border flex flex-col justify-between hover:border-blue-500 rounded">
                      <div className="w-full h-full"></div>
                      <div className="w-full h-24 border-t p-3">
                        <h6 className="text-sm max-w-full truncate">
                          {document.title}
                        </h6>
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
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
