import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage, { loader as countryLoader } from './pages/MainPage.jsx';
import CityPage, { loader as cityLoader } from './pages/CityPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        loader: countryLoader,
      },
      {
        path: 'cities/:cityName',
        element: <CityPage />,
        loader: cityLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
