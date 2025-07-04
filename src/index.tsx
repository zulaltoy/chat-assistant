import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import RootLayout from './Layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'chat',
        element: <Chat />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') !).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);