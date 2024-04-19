import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NotFound from './NotFound';
import Characterpage from './Characterpage';
import Campaign from './Campaign';
import Help from './Help';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/> 
  },

  {
    path: "/CharacterPage",
    element: <Characterpage/>,
    errorElement: <NotFound/>
  },
  {
    path: "/Campaign",
    element: <Campaign/>,
    errorElement: <NotFound/>
  },
  {
    path: "/Help",
    element: <Help/>,
    errorElement: <NotFound/>
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
