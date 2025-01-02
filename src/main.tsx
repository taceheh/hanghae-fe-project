import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
const rootElement = document.getElementById('root');
const queryClient = new QueryClient();

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element.');
}
