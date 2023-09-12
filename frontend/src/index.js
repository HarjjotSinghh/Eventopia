import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Events from './pages/events';
import Signup from './pages/signup';
import Login from './pages/login';
import AddEvent from './pages/addEvent';
import Apply from './pages/apply';
import { ContactUs } from './components/ContactUs';
import EventDetailsPage from './pages/EventDetailsPage';
import { AuthContextProvider } from './contexts/AuthContext';
import {
  createBrowserRouter,
  RouterProvider,
  useParams
} from "react-router-dom";

export const backendURI = "https://eventopiab.onrender.com";

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
    path: "/events/:title",
    element: <EventDetailsPage/>,
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
    path: "/apply",
    element: <Apply />,
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

