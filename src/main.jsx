import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './app.css'
import { RouterProvider } from 'react-router-dom'
import myCreateRoute from './Router/Router'
import AuthProvider from './providers/AuthProvider'
import { ThemeProvider } from "@material-tailwind/react";





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <AuthProvider>
   <RouterProvider router={myCreateRoute}>

</RouterProvider>
   </AuthProvider>
    </ThemeProvider>
  
  </React.StrictMode>,
)