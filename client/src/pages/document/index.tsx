import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import DocumentHeader from '../../components/organisms/document-header';
import useWindowSize from '../../hooks/use-window-size';
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import io, { Socket } from 'socket.io-client';
import { BASE_URL } from '../../services/api';
import { useParams } from 'react-router-dom';
import DocumentInterface from '../../types/document';
import { ToastContext } from '../../contexts/toast-context';
import useDocument from '../../hooks/use-document';

const DEFAULT_SAVE_TIME = 1500;
let saveInterval: null | NodeJS.Timer = null;

const Document = () => {
  const { heightStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<null | Editor>(null);
  const [socket, setSocket] = useState<null | Socket>(null);
  const { id: documentId } = useParams();
  const toastContext = useContext(ToastContext);
  const { saving, loadDocument, saveDocument } = useDocument();
  const [delayedSave, setDelayedSave] = useState(false);
  const [document, setDocument] = useState<null | DocumentInterface>(null);
  const [documentRendered, setDocumentRendered] = useState(false);

  const focusEditor = () => {
    editorRef?.current?.focus();
  };

  const setDocumentTitle = (title: string) => {
    setDocument({ ...document, title } as DocumentInterface);
  };

  // send-changes
  const handleEditorChange = (editorState: EditorState) => {
    setDelayedSave(true);

    setEditorState(editorState);
    const content = convertToRaw(editorState.getCurrentContent());
    socket?.emit('send-changes', content);
    setDocument({
      ...document,
      content: JSON.stringify(content),
    } as DocumentInterface);

    if (saveInterval !== null) {
      clearInterval(saveInterval);
    }
    saveInterval = setInterval(() => {
      if (document === null) return;

      saveDocument(document, (error: string) => {
        if (error) toastContext?.error(error);
        if (saveInterval) clearInterval(saveInterval);
        setDelayedSave(false);
      });
    }, DEFAULT_SAVE_TIME);
  };

  // connect
  useEffect(() => {
    setSocket(io(BASE_URL));

    socket?.connect();

    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // receive-changes
  useEffect(() => {
    if (socket == null) return;

    const handler = (rawDraftContentState: RawDraftContentState) => {
      const contentState = convertFromRaw(rawDraftContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    };

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, editorState]);

  useEffect(() => {
    if (!documentId) return;

    loadDocument(
      parseInt(documentId),
      (error: null | string, document: DocumentInterface) => {
        if (error) toastContext?.error(error);
        else setDocument(document);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  useEffect(() => {
    if (documentRendered || !document?.content) return;

    const contentState = convertFromRaw(
      JSON.parse(document?.content) as RawDraftContentState
    );
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    setDocumentRendered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  return (
    <Fragment>
      <div
        style={{ height: heightStr }}
        className="w-full h-full bg-gray-100 flex flex-col"
      >
        <DocumentHeader
          saving={saving || delayedSave}
          saveDocument={saveDocument}
          document={document}
          setDocumentTitle={setDocumentTitle}
          documentHeaderRef={documentHeaderRef}
        />
        <div
          style={{
            height: documentViewerHeight,
          }}
          className="w-full flex flex-col justify-start items-center overflow-hidden"
        >
          <div className="h-full w-full overflow-auto space-y-4 flex flex-col items-center p-4">
            <div
              style={{ height: '1100px', width: '850px' }}
              className="bg-white shadow-md flex-shrink-0 cursor-text p-12"
              onClick={focusEditor}
            >
              <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={handleEditorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Document;
