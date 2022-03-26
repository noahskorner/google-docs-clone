import { useEffect, useRef } from 'react';
import useWindowSize from '../../hooks/use-window-size';
import { useParams } from 'react-router-dom';
import useDocument from '../../hooks/use-document';
import DocumentEditor from '../../components/organisms/document-editor';
import DocumentHeader from '../../components/organisms/document-header';
import useAuth from '../../hooks/use-auth';

const Document = () => {
  const { id: documentId } = useParams();
  const { loadDocument } = useDocument();
  const { accessToken } = useAuth();
  const { heightStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;

  useEffect(() => {
    if (accessToken === null || documentId === undefined) return;

    loadDocument(accessToken, parseInt(documentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, documentId]);

  return (
    <div
      style={{ height: heightStr }}
      className="w-full h-full bg-gray-100 flex flex-col"
    >
      <DocumentHeader documentHeaderRef={documentHeaderRef} />
      <div
        style={{
          height: documentViewerHeight,
        }}
        className="w-full flex flex-col justify-start items-center overflow-hidden"
      >
        <div className="h-full w-full overflow-auto space-y-4 flex flex-col items-center p-4">
          <DocumentEditor />
        </div>
      </div>
    </div>
  );
};

export default Document;
