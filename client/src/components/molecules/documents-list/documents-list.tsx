import DocumentInterface from '../../../types/interfaces/document';
import DocumentCard from '../../atoms/document-card';

interface DocumentsListProps {
  title: string;
  documents: Array<DocumentInterface>;
  setDocuments: Function;
}

const DocumentsList = ({
  title,
  documents,
  setDocuments,
}: DocumentsListProps) => {
  return (
    <div className="w-full flex justify-center items-center font-medium text-gray-700 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <h2>{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
          {documents
            .sort((a, b) => {
              return b.updatedAt.getTime() - a.updatedAt.getTime();
            })
            .map((document) => {
              return (
                <DocumentCard
                  key={document.id}
                  document={document}
                  setDocuments={setDocuments}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DocumentsList;
