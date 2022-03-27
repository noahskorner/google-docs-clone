import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from 'draft-js';
import { useContext } from 'react';
import { EditorContext } from '../../../contexts/editor-context';
import IconButton from '../../atoms/icon-button';

const EditorToolbar = () => {
  const { editorState, setEditorState } = useContext(EditorContext);

  const handleUndoBtnClick = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoBtnClick = () => {
    setEditorState(EditorState.redo(editorState));
  };

  return (
    <div className="w-full h-9 px-3 py-1 flex-shrink-0 flex items-center">
      <IconButton
        onClick={handleUndoBtnClick}
        icon={<ArrowLeftIcon className="h-4 w-4" />}
        tooltip="Undo"
      />
      <IconButton
        onClick={handleRedoBtnClick}
        icon={<ArrowRightIcon className="h-4 w-4" />}
        tooltip="Redo"
      />
    </div>
  );
};

export default EditorToolbar;
