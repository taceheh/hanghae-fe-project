import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
console.log(clientId)
createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* <App /> */}
     <GoogleOAuthProvider clientId ={clientId}>
      <RouterProvider router={router}/>
     </GoogleOAuthProvider>
  </StrictMode>
)
