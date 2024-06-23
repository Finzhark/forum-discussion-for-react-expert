import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import CreateThread from './pages/CreateThread';
import DetailThread from './pages/DetailThread';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
import Leaderboards from './pages/Leaderboard';

const routes = [
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/detail/:id',
        element: <DetailThread />,
      },
      {
        path: '/create',
        element: <CreateThread />,
      },
      {
        path: '/leaderboards',
        element: <Leaderboards />,
      },
    ],
  },
  {
    path: '/',
    element: <PublicRoutes />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/leaderboards',
        element: <Leaderboards />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
