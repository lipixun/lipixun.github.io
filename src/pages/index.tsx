// Pages
import type { RouteObject } from 'react-router';
import { IndexPage } from './IndexPage';
import { NotFoundPage } from './NotFoundPage';
import './style.css';

const routers: RouteObject[] = [
  {
    index: true,
    element: <IndexPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routers;
