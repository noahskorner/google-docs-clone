import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/transitions.css';
import './assets/css/spinners.css';
import './assets/css/toasts.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Document from './pages/document';
import Login from './pages/login';
import { ToastProvider } from './contexts/toast-context';
import { AuthProvider } from './contexts/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/document" element={<Document />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
