import DocumentCreateHeader from '../../components/organisms/document-create-header';
import useWindowSize from '../../hooks/use-window-size';
import { PlusIcon } from '@heroicons/react/outline';
import useDocument from '../../hooks/use-document';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../contexts/toast-context';
import DocumentInterface from '../../types/interfaces/document';
import Spinner from '../../components/atoms/spinner';
import { useNavigate } from 'react-router-dom';
import RecentDocuments from '../../components/molecules/recent-documents';
import { AuthContext } from '../../contexts/auth-context';
import SharedDocuments from '../../components/molecules/shared-documents';

const Create = () => {
  const { heightStr } = useWindowSize();
  const { loading, createDocument, loadAllDocuments } = useDocument();
  const toastContext = useContext(ToastContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<null | Array<DocumentInterface>>(
    null
  );

  const recentDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId === authContext?.id);
  const sharedDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId !== authContext?.id);

  const handleDocumentCreateBtnClick = async () => {
    await createDocument(
      (error: null | string, document: null | DocumentInterface) => {
        if (error === null && document !== null) {
          navigate(`/document/${document.id}`);
        } else {
          toastContext?.error(error);
        }
      }
    );
  };

  useEffect(() => {
    loadAllDocuments(
      (error: null | string, documents: null | Array<DocumentInterface>) => {
        if (error === null && documents !== null) {
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
      <RecentDocuments
        documents={recentDocuments}
        setDocuments={setDocuments}
      />
      <SharedDocuments
        documents={sharedDocuments}
        setDocuments={setDocuments}
      />
    </div>
  );
};

export default Create;
