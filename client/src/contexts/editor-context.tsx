import {
  EditorState,
  Editor,
  convertFromRaw,
  RawDraftContentState,
  convertToRaw,
} from 'draft-js';
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/use-auth';
import { BASE_URL } from '../services/api';
import DocumentInterface from '../types/interfaces/document';
import { DocumentContext } from './document-context';
import { ToastContext } from './toast-context';

interface EditorContextInterface {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  socket: null | MutableRefObject<any>;
  documentRendered: boolean;
  setDocumentRendered: Dispatch<SetStateAction<boolean>>;
  editorRef: null | MutableRefObject<null | Editor>;
  handleEditorChange: (editorState: EditorState) => void;
  focusEditor: () => void;
}

const defaultValues = {
  editorState: EditorState.createEmpty(),
  setEditorState: () => {},
  socket: null,
  documentRendered: false,
  setDocumentRendered: () => {},
  editorRef: null,
  handleEditorChange: () => {},
  focusEditor: () => {},
};

export const EditorContext =
  createContext<EditorContextInterface>(defaultValues);

interface EditorProviderInterface {
  children: JSX.Element;
}

const DEFAULT_SAVE_TIME = 1500;
let saveInterval: null | NodeJS.Timer = null;

export const EditorProvider = ({ children }: EditorProviderInterface) => {
  const [editorState, setEditorState] = useState(defaultValues.editorState);
  const socket = useRef<any>(null);
  const [documentRendered, setDocumentRendered] = useState(false);
  const editorRef = useRef<null | Editor>(null);

  const { document, setCurrentUsers, setSaving, setDocument, saveDocument } =
    useContext(DocumentContext);
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();

  const focusEditor = () => {
    if (editorRef === null || editorRef.current === null) return;

    editorRef.current.focus();
  };

  // send-changes
  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);

    if (socket === null) return;

    const content = convertToRaw(editorState.getCurrentContent());

    socket.current.emit('send-changes', content);
    const updatedDocument = {
      ...document,
      content: JSON.stringify(content),
    } as DocumentInterface;
    setDocument(updatedDocument);

    if (document === null || JSON.stringify(content) === document.content)
      return;

    setSaving(true);

    if (saveInterval !== null) {
      clearInterval(saveInterval);
    }
    saveInterval = setInterval(async () => {
      await saveDocument(updatedDocument);
      if (saveInterval) clearInterval(saveInterval);
    }, DEFAULT_SAVE_TIME);
  };

  // set document content
  useEffect(() => {
    if (documentRendered || document === null || document.content === null)
      return;

    try {
      const contentState = convertFromRaw(
        JSON.parse(document.content) as RawDraftContentState
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    } catch {
      error('Error when loading document.');
    } finally {
      setDocumentRendered(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  // connect
  useEffect(() => {
    if (
      document === null ||
      accessToken === null ||
      socket === null ||
      (socket.current !== null && socket.current.connected)
    )
      return;

    socket.current = io(BASE_URL, {
      query: { documentId: document.id, accessToken },
    }).connect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document, accessToken, socket]);

  // disconnect
  useEffect(() => {
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // receive-changes
  useEffect(() => {
    if (socket.current === null) return;

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
  }, [socket.current]);

  // participant-update
  useEffect(() => {
    if (socket.current === null) return;

    const handler = (currentUsers: Array<string>) => {
      setCurrentUsers(new Set<string>(currentUsers));
    };

    socket.current.on('participant-update', handler);

    return () => {
      socket.current.off('participant-update', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.current]);

  return (
    <EditorContext.Provider
      value={{
        editorState,
        socket,
        documentRendered,
        editorRef,
        setEditorState,
        setDocumentRendered,
        handleEditorChange,
        focusEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
