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
import { FONTS } from '../components/atoms/font-select';
import useAuth from '../hooks/use-auth';
import { BASE_URL } from '../services/api';
import SocketEvent from '../types/enums/socket-events-enum';
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
  currentFont: string;
  setCurrentFont: Dispatch<SetStateAction<string>>;
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
  currentFont: FONTS[0],
  setCurrentFont: () => {},
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
  const socket = useRef<any>(defaultValues.socket);
  const [documentRendered, setDocumentRendered] = useState(
    defaultValues.documentRendered
  );
  const editorRef = useRef<null | Editor>(defaultValues.editorRef);
  const [currentFont, setCurrentFont] = useState(defaultValues.currentFont);

  const { document, setCurrentUsers, setSaving, setDocument, saveDocument } =
    useContext(DocumentContext);
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();

  const focusEditor = () => {
    if (editorRef === null || editorRef.current === null) return;

    editorRef.current.focus();
  };

  // Send changes
  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);

    if (socket === null) return;

    const content = convertToRaw(editorState.getCurrentContent());

    socket.current.emit(SocketEvent.SEND_CHANGES, content);
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

  // Load document content
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

  // Connect socket
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

  // Disconnect socket
  useEffect(() => {
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Receive changes
  useEffect(() => {
    if (socket.current === null) return;

    const handler = (rawDraftContentState: RawDraftContentState) => {
      const contentState = convertFromRaw(rawDraftContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    };

    socket.current.on(SocketEvent.RECEIVE_CHANGES, handler);

    return () => {
      socket.current.off(SocketEvent.RECEIVE_CHANGES, handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.current]);

  // Current users updated
  useEffect(() => {
    if (socket.current === null) return;

    const handler = (currentUsers: Array<string>) => {
      setCurrentUsers(new Set<string>(currentUsers));
    };

    socket.current.on(SocketEvent.CURRENT_USERS_UPDATE, handler);

    return () => {
      socket.current.off(SocketEvent.CURRENT_USERS_UPDATE, handler);
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
        currentFont,
        setEditorState,
        setDocumentRendered,
        handleEditorChange,
        focusEditor,
        setCurrentFont,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
