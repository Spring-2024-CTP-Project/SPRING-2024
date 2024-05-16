import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App'
import NotFound from './Pages/NotFound';
import Characterpage from './Pages/Characterpage';
import Campaign from './Pages/Campaign';
import Help from './Pages/Help';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
