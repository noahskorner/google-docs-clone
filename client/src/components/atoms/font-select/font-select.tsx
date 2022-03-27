import { ChevronDownIcon } from '@heroicons/react/outline';
import { useContext, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FONTS } from '.';
import { EditorContext } from '../../../contexts/editor-context';

const FontSelect = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentFont, setCurrentFont } = useContext(EditorContext);
  const dropdownRef = useRef(null);

  return (
    <div
      onBlur={() => setShowDropdown(false)}
      className="relative flex justify-center items-center"
    >
      <button
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex justify-between items-center text-xs text-gray-600 px-2 h-7 space-x-4 hover:bg-gray-100 rounded"
      >
        <span>{currentFont}</span>
        <ChevronDownIcon className="w-3 h-3" />
      </button>
      {showTooltip && !showDropdown && (
        <div className="absolute top-full flex-col flex items-center">
          <div className="arrow-up border-b-gray-700"></div>
          <div className="relative -top-[1px] bg-gray-700 text-white text-xs font-medium text-center py-1 px-2 rounded-sm">
            Fonts
          </div>
        </div>
      )}
      <CSSTransition
        nodeRef={dropdownRef}
        in={showDropdown}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
        children={
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 z-10 w-52 bg-white py-2 rounded-sm shadow-lg border text-sm"
          >
            {FONTS.map((font) => {
              return (
                <button
                  key={font}
                  onClick={() => setCurrentFont(font)}
                  style={{ fontFamily: `'${font}', sans-serif` }}
                  className="w-full text-black hover:bg-gray-100 text-sm px-6 py-1 text-left"
                >
                  {font}
                </button>
              );
            })}
          </div>
        }
      />
    </div>
  );
};

export default FontSelect;
