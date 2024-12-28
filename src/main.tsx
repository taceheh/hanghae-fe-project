import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router.js';

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      {/* <App /> */}
      <GoogleOAuthProvider clientId={clientId}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element.');
}
