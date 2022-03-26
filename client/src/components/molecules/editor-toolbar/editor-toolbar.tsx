import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import IconButton from '../../atoms/icon-button';

const EditorToolbar = () => {
  return (
    <div className="w-full h-9 px-3 py-1 flex-shrink-0 flex items-center">
      <IconButton icon={<ArrowLeftIcon className="h-5 w-5" />} tooltip="Undo" />
      <IconButton
        icon={<ArrowRightIcon className="h-5 w-5" />}
        tooltip="Redo"
      />
    </div>
  );
};

export default EditorToolbar;
