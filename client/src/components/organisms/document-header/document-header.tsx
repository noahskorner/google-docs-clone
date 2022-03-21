import { MutableRefObject } from 'react';
import DocumentInterface from '../../../types/document';
import DocumentMenuBar from '../../molecules/document-menu-bar';
import EditorToolbar from '../../molecules/editor-toolbar';

interface DocumentHeaderProps {
  saving: boolean;
  saveDocument: Function;
  document: null | DocumentInterface;
  setDocumentTitle: Function;
  documentHeaderRef: MutableRefObject<null | HTMLDivElement>;
}

const DocumentHeader = ({
  saving,
  saveDocument,
  document,
  setDocumentTitle,
  documentHeaderRef,
}: DocumentHeaderProps) => {
  return (
    <div
      ref={documentHeaderRef}
      className="border-b w-full bg-white flex flex-col"
    >
      <DocumentMenuBar
        saving={saving}
        saveDocument={saveDocument}
        document={document}
        setDocumentTitle={setDocumentTitle}
      />
      <EditorToolbar />
    </div>
  );
};

export default DocumentHeader;
