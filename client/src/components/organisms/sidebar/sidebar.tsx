import useWindowSize from '../../../hooks/useWindowSize';
import { sidebarRoutes } from '../../../utils/constants';
import SidebarButton from '../../atoms/sidebar-button';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar = ({ showSidebar }: SidebarProps) => {
  const sidebarRef = useRef(null);
  const { heightStr, isMobileWidth } = useWindowSize();
  const navigate = useNavigate();
  const handleSidebarRouteClick = (route: string | undefined) => {
    if (route) navigate(route);
  };

  return (
    <CSSTransition
      nodeRef={sidebarRef}
      in={!isMobileWidth || (isMobileWidth && showSidebar)}
      classNames="slide-in"
      timeout={400}
      unmountOnExit
      children={
        <div
          ref={sidebarRef}
          className="sidebar"
          style={{ height: heightStr, maxHeight: heightStr }}
        >
          <div className="h-14 w-full px-2 lg:px-4 flex justify-end items-center border-b border-primary"></div>
          <div className="space-y-2 px-2 py-4 lg:px-4">
            {sidebarRoutes.map((sidebarRoute, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() =>
                      handleSidebarRouteClick(
                        sidebarRoute.route && sidebarRoute.route
                      )
                    }
                    className="p-2 hover:text-blue-600"
                  >
                    <h5 className="text-lg font-semibold">
                      {sidebarRoute.name}
                    </h5>
                  </button>
                  {sidebarRoute.buttons.map((button, index) => {
                    return <SidebarButton {...button} key={index} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      }
    />
  );
};

export default Sidebar;
