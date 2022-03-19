import { SidebarButtonProps } from '../components/atoms/sidebar-button';

interface SidebarRoute {
  name: string;
  route?: string;
  buttons: Array<SidebarButtonProps>;
}
export const sidebarRoutes: Array<SidebarRoute> = [
  {
    name: 'Components',
    route: '/',
    buttons: [
      {
        text: 'Inputs',
        children: [
          {
            text: 'Button',
          },
          {
            text: 'Text Field',
          },
          {
            text: 'Switch',
          },
        ],
      },
      { text: 'Feedback', children: [{ text: 'Toast' }] },
    ],
  },
  {
    name: 'Pages',
    buttons: [
      {
        text: 'Login',
        path: '/login',
      },
      {
        text: 'Register',
        path: '/register',
      },
    ],
  },
];
