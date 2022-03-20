import DocumentCreateHeader from '../../components/organisms/document-create-header';
import useWindowSize from '../../hooks/use-window-size';
import { PlusIcon } from '@heroicons/react/outline';
import useDocument from '../../hooks/use-document';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../contexts/toast-context';
import DocumentInterface from '../../types/document';
import Spinner from '../../components/atoms/spinner';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
  const { heightStr } = useWindowSize();
  const [documents, setDocuments] = useState<Array<DocumentInterface>>([]);
  const { loading, createDocument, loadAllDocuments } = useDocument();
  const toastContext = useContext(ToastContext);
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
  }, []);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <div className="w-full h-80 bg-gray-100 flex justify-center items-center font-medium text-gray-700 px-4 overflow-hidden">
        <div className="w-full h-full max-w-3xl py-4 space-y-4 overflow-auto">
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
        <div className="w-full max-w-3xl">
          <h2>Recent Documents</h2>
          <div className="grid grid-cols-4 gap-4">
            {documents.map((document) => {
              return (
                <Link to={`/document/${document.id}`}>
                  <div className="h-64 w-full border"></div>
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
