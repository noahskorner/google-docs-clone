import DocumentCreateHeader from '../../components/organisms/document-create-header';
import useWindowSize from '../../hooks/use-window-size';
import Spinner from '../../components/atoms/spinner';
import useDocuments from '../../hooks/use-documents';
import useAuth from '../../hooks/use-auth';
import DocumentsList from '../../components/molecules/documents-list';
import CreateDocumentButton from '../../components/atoms/create-document-button';

const Create = () => {
  const { heightStr } = useWindowSize();
  const { userId } = useAuth();
  const { documents, loading, setDocuments } = useDocuments();

  const recentDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId === userId);
  const sharedDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <CreateDocumentButton />
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <DocumentsList
            title="Recent Documents"
            documents={recentDocuments}
            setDocuments={setDocuments}
          />
          <DocumentsList
            title="Shared Documents"
            documents={sharedDocuments}
            setDocuments={setDocuments}
          />
        </>
      )}
    </div>
  );
};

export default Create;
