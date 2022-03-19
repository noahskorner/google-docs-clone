import { MutableRefObject } from 'react';
import DocumentMenuBar from '../../molecules/document-menu-bar';
import EditorToolbar from '../../molecules/editor-toolbar';

interface DocumentHeaderProps {
  documentHeaderRef: MutableRefObject<null | HTMLDivElement>;
}

const DocumentHeader = ({ documentHeaderRef }: DocumentHeaderProps) => {
  return (
    <div
      ref={documentHeaderRef}
      className="border-b w-full bg-white flex flex-col"
    >
      <DocumentMenuBar />
      <EditorToolbar />
    </div>
  );
};

export default DocumentHeader;
