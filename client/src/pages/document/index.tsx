import { useContext, useEffect, useRef } from 'react';
import useWindowSize from '../../hooks/use-window-size';
import { useParams } from 'react-router-dom';
import useDocument from '../../hooks/use-document';
import DocumentEditor from '../../components/organisms/document-editor';
import DocumentHeader from '../../components/organisms/document-header';
import { DocumentContext } from '../../contexts/document-context';

const Document = () => {
  const { id: documentId } = useParams();
  const { heightStr, widthStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;
  const { setDocument } = useContext(DocumentContext);
  const { document, loading } = useDocument(parseInt(documentId as string));

  useEffect(() => {
    if (document !== null) setDocument(document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  return (
    <div
      style={{ height: heightStr }}
      className="w-full h-full bg-gray-100 flex flex-col"
    >
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <DocumentHeader documentHeaderRef={documentHeaderRef} />
          <div
            style={{
              height: documentViewerHeight,
            }}
            className="w-full flex flex-col justify-start items-center overflow-hidden"
          >
            <div
              style={{ width: widthStr }}
              className="h-full w-full overflow-auto space-y-4 flex flex-col items-center p-4"
            >
              <DocumentEditor />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Document;
