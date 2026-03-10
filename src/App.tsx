// App
import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BlackHoleStarfield } from './components';
import routers from './pages';
import './App.css';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function Root() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}>
        <BlackHoleStarfield />
      </div>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routers,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App
