import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { convertRemToPixels } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';

export interface SidebarButtonType {
  text: string;
  id?: string;
}

export interface SidebarButtonProps {
  text: string;
  path?: string;
  children?: Array<SidebarButtonType>;
}

const SidebarButton = ({ text, path, children }: SidebarButtonProps) => {
  const [showChildren, setShowChildren] = useState(false);
  const navigate = useNavigate();

  const scrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView();
    window.scrollBy(0, -convertRemToPixels(3.5));
  };

  const handleSidebarBtnClick = () => {
    if (!path) setShowChildren(!showChildren);
    else navigate(path);
  };

  return (
    <div>
      <button
        onClick={() => handleSidebarBtnClick()}
        className="sidebar-btn font-medium"
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <h6>{text}</h6>
        </div>
        {!children ? null : showChildren ? (
          <ChevronDownIcon className="w-4 h-4 text-blue-600" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 text-blue-600" />
        )}
      </button>
      <div
        className="overflow-hidden"
        style={
          showChildren
            ? {
                height: children ? children.length * 1.75 + 'rem' : 0,
                transition: 'all 0.5s ease-in-out',
              }
            : { height: 0, transition: 'all 0.5s ease-in-out' }
        }
      >
        <div>
          {children?.map((child, index) => {
            return (
              <button
                onClick={() => child.id && scrollIntoView(child.id)}
                key={index}
                className="sidebar-btn text-slate-600 dark:text-slate-400 pl-8"
              >
                {child.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarButton;
