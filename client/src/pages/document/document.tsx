import { Fragment, useRef, useState } from 'react';
import DocumentHeader from '../../components/organisms/document-header';
import useWindowSize from '../../hooks/useWindowSize';
import { Editor, EditorState } from 'draft-js';

const Document = () => {
  const { heightStr } = useWindowSize();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const documentViewerHeight = `calc(${heightStr} - ${documentHeaderRef.current?.clientHeight}px)`;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<null | Editor>(null);

  const focusEditor = () => {
    editorRef?.current?.focus();
  };

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
          className="w-full flex flex-col justify-start items-center overflow-y-hidden"
        >
          <div className="h-full w-full overflow-y-scroll space-y-4 flex flex-col items-center p-4">
            <div
              style={{ height: '1100px', width: '850px' }}
              className="bg-white shadow-md flex-shrink-0 cursor-text p-12"
              onClick={focusEditor}
            >
              <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={(editorState) => setEditorState(editorState)}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Document;
