import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'sonner';
import { ScoreProvider } from './contexts/ScoreContext.jsx'; // 1. Importe o Provider
import { AuthProvider } from './contexts/AuthContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ScoreProvider>
        <App />
        <Toaster richColors={false} /> 
      </ScoreProvider>
    </AuthProvider>
  </React.StrictMode>
);
