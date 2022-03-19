import { Fragment, useEffect, useRef, useState } from 'react';
import DocumentHeader from '../../components/organisms/document-header';
import useWindowSize from '../../hooks/useWindowSize';
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import io, { Socket } from 'socket.io-client';

const Document = () => {
  const { heightStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<null | Editor>(null);
  const [socket, setSocket] = useState<null | Socket>(null);

  const focusEditor = () => {
    editorRef?.current?.focus();
  };

  // send-changes
  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);
    socket?.emit('send-changes', convertToRaw(editorState.getCurrentContent()));
  };

  // connect
  useEffect(() => {
    setSocket(io('http://localhost:3001'));

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

  return (
    <Fragment>
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
