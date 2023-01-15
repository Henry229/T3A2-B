import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import AboutUs from './pages/AboutUs';
import Booking from './pages/Booking';
import BookMain from './pages/BookMain';
import Client from './pages/Client';
import MenuList from './pages/MenuList';
import Notfound from './pages/Notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        index: true,
        element: <MenuList />,
      },
      {
        path: '/menu',
        element: <MenuList />,
      },
      {
        path: '/reservation',
        element: <BookMain />,
      },
      {
        path: '/reservation/client',
        element: <Client />,
      },
      {
        path: '/reservation/booking',
        element: <Booking />,
      },
      {
        path: '/aboutUs',
        element: <AboutUs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
