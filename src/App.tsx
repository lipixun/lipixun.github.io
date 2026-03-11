// App
import { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import api from './apis';
import { EbanfloLensing, DukeDustyNebula4 } from './components';
import routers from './pages';
import './App.css';

function Background() {
  const [index] = useState<number>(() => {
    const params = new URLSearchParams(location.search);
    const indexStr = params.get('background_index');
    if (indexStr) {
      const index = Number(indexStr);
      if (Number.isInteger(index)) {
        return index % backgroundComponents.length;
      }
    }
    // Use a random index
    return Math.ceil(Math.random() * backgroundComponents.length);
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1
      }}>
      {backgroundComponents[index % backgroundComponents.length]}
    </div>
  );
}

const backgroundComponents = [
  <EbanfloLensing />,
  <DukeDustyNebula4 />,
];

function Root() {
  return (
    <>
      <Background />
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
  // Check build time
  const { data: buildTime } = api.endpoints.getBuildTime.useQuery();
  useEffect(() => {
    if (buildTime && buildTime.time !== __BUILD_TIME__) {
      // Current page is out of date, refresh with __t=ts to invalidate cache
      const params = new URLSearchParams(location.search);
      params.set('__t', `${Date.now()}`);
      location.href = `${location.pathname}?${params.toString()}${location.hash}`;
    }
  }, [buildTime]);

  return <RouterProvider router={router} />;
}

export default App
