import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RawDraftContentState,
} from 'draft-js';
import { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { ToastContext } from '../../../contexts/toast-context';
import useAuth from '../../../hooks/use-auth';
import useDocument from '../../../hooks/use-document';
import { BASE_URL } from '../../../services/api';
import DocumentInterface from '../../../types/interfaces/document';

const DEFAULT_SAVE_TIME = 1500;
let saveInterval: null | NodeJS.Timer = null;

const DocumentEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const socket = useRef<any>(null);
  const toastContext = useContext(ToastContext);
  const [documentRendered, setDocumentRendered] = useState(false);
  const editorRef = useRef<null | Editor>(null);
  const { accessToken } = useAuth();
  const {
    document,
    errors,
    setCurrentUsers,
    setSaving,
    setDocument,
    saveDocument,
  } = useDocument();

  const focusEditor = () => {
    editorRef?.current?.focus();
  };

  // send-changes
  const handleEditorChange = (editorState: EditorState) => {
    setSaving(true);

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
    saveInterval = setInterval(async () => {
      if (document === null) return;

      await saveDocument();

      if (errors)
        errors.forEach((error) => {
          toastContext?.error(error);
        });
      if (saveInterval) clearInterval(saveInterval);
    }, DEFAULT_SAVE_TIME);
  };

  // set document content
  useEffect(() => {
    if (documentRendered || document?.content === undefined) return;

    try {
      const contentState = convertFromRaw(
        JSON.parse(document.content) as RawDraftContentState
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
    if (
      document?.id === null ||
      accessToken === null ||
      socket.current !== null
    )
      return;

    socket.current = io(BASE_URL, {
      query: { documentId: document?.id, accessToken },
    }).connect();

    return () => {
      socket.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document?.id, accessToken]);

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
      setCurrentUsers(new Set<string>(currentUsers));
    };

    socket.current.on('participant-update', handler);

    return () => {
      socket.current.off('participant-update', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
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
  );
};

export default DocumentEditor;
