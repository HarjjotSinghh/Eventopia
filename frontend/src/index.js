import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Events from './pages/events';
import Signup from './pages/signup';
import Login from './pages/login';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { 
    path: "/*",
    element: <App />,
  },
  { 
    path: "/home",
    element: <App />,
  },
  { 
    path: "/events",
    element: <Events />,
  },
  { 
    path: "/login",
    element: <Login />,
  },
  { 
    path: "/signup",
    element: <Signup />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

