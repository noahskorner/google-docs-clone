import { MutableRefObject } from 'react';
import DocumentInterface from '../../../types/document';
import DocumentMenuBar from '../../molecules/document-menu-bar';
import EditorToolbar from '../../molecules/editor-toolbar';

interface DocumentHeaderProps {
  document: null | DocumentInterface;
  setDocumentTitle: Function;
  documentHeaderRef: MutableRefObject<null | HTMLDivElement>;
}

const DocumentHeader = ({
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
        document={document}
        setDocumentTitle={setDocumentTitle}
      />
      <EditorToolbar />
    </div>
  );
};

export default DocumentHeader;
