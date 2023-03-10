import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import AboutUs from './pages/AboutUs';
import AdminLogin from './pages/AdminLogin';
import Booking from './pages/Booking';
import BookMain from './pages/BookMain';
import MenuList from './pages/MenuList';
import SearchMobile from './pages/SearchMobile';
import Home from './pages/Home';
import Notfound from './pages/Notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/menu',
        element: <MenuList />,
      },
      {
        path: '/reservation',
        element: <Booking />,
      },
      {
        path: '/reservation/:mobile',
        element: <Booking />,
      },
      {
        path: '/admin',
        element: <AdminLogin />,
      },
      {
        path: '/admin/bookmain',
        element: <BookMain />,
      },
      {
        path: '/admin/search/:mobile',
        element: <SearchMobile />,
      },
      {
        path: '/aboutUs',
        element: <AboutUs />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
