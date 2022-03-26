import { useContext, useEffect, useRef, useState } from 'react';
import DocumentHeader from '../../components/organisms/document-header';
import useWindowSize from '../../hooks/use-window-size';
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';

import { BASE_URL } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import DocumentInterface from '../../types/interfaces/document';
import { ToastContext } from '../../contexts/toast-context';
import useDocument from '../../hooks/use-document';
import { AuthContext } from '../../contexts/auth-context';
import { DocumentContext } from '../../contexts/document-context';
import { io } from 'socket.io-client';

const DEFAULT_SAVE_TIME = 1500;
let saveInterval: null | NodeJS.Timer = null;

const Document = () => {
  const { heightStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<null | Editor>(null);
  const socket = useRef<any>(null);
  const { id: documentId } = useParams();
  const toastContext = useContext(ToastContext);
  const authContext = useContext(AuthContext);
  const { saving, loadDocument, saveDocument } = useDocument();
  const [delayedSave, setDelayedSave] = useState(false);
  const [document, setDocument] = useState<null | DocumentInterface>(null);
  const [documentRendered, setDocumentRendered] = useState(false);
  const documentContext = useContext(DocumentContext);
  const navigate = useNavigate();

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
    socket.current.emit('send-changes', content);
    setDocument({
      ...document,
      content: JSON.stringify(content),
    } as DocumentInterface);

    if (saveInterval !== null) {
      clearInterval(saveInterval);
    }
    saveInterval = setInterval(() => {
      if (document === null) return;

      saveDocument(document, (error: null | string) => {
        if (error) toastContext?.error(error);
        if (saveInterval) clearInterval(saveInterval);
        setDelayedSave(false);
      });
    }, DEFAULT_SAVE_TIME);
  };

  // load document
  useEffect(() => {
    if (!documentId) return;

    loadDocument(
      parseInt(documentId),
      (error: null | string, document: null | DocumentInterface) => {
        if (error) {
          toastContext?.error(error);
          navigate('/document/create');
        } else setDocument(document);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  // set document content
  useEffect(() => {
    if (documentRendered || !document?.content) return;

    try {
      const contentState = convertFromRaw(
        JSON.parse(document?.content) as RawDraftContentState
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    } catch {
      toastContext?.error('Error when loading document.');
    } finally {
      setDocumentRendered(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  // connect
  useEffect(() => {
    socket.current = io(BASE_URL, {
      query: { documentId, accessToken: authContext?.accessToken },
    }).connect();

    return () => {
      socket.current.disconnect();
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

    socket.current.on('receive-changes', handler);

    return () => {
      socket.current.off('receive-changes', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // participant-update
  useEffect(() => {
    if (socket == null) return;

    const handler = (currentUsers: Array<string>) => {
      documentContext?.setCurrentUsers(new Set<string>(currentUsers));
    };

    socket.current.on('participant-update', handler);

    return () => {
      socket.current.off('participant-update', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div
      style={{ height: heightStr }}
      className="w-full h-full bg-gray-100 flex flex-col"
    >
      <DocumentHeader
        saving={saving || delayedSave}
        saveDocument={saveDocument}
        document={document}
        setDocumentTitle={setDocumentTitle}
        setDocument={setDocument}
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
  );
};

export default Document;
