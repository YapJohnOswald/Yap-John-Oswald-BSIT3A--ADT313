import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Register from './pages/Public/Register/Register'; 
import Form from './pages/Main/Movie/Form/Form';
import Lists from './pages/Main/Movie/Lists/Lists';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Register', 
    element: <Register />,
  },
  {
    path: '/Main',
    element: <Main />,
    children: [
      {
        path: 'Dashboard',
        element: <Dashboard />,
      },
      {
        path: 'Movie/form',
        element: <Form />,
      },
      {
        path: 'Movie/lists',
        element: <Lists />,
      },
    ],
  },
  
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
