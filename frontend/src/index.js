import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Events from './pages/events';
import Signup from './pages/signup';
import Login from './pages/login';
import AddEvent from './pages/addEvent';
import { ContactUs } from './components/ContactUs';
import { AuthContextProvider } from './contexts/AuthContext';

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
    path: "/add",
    element: <AddEvent />,
  },
  { 
    path: "/contact",
    element: <ContactUs />,
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
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

