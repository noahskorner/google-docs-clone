import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/transitions.css';
import './assets/css/spinners.css';
import './assets/css/toasts.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Document from './pages/document';
import { ToastProvider } from './contexts/toast-context';
import { AuthProvider } from './contexts/auth-context';
import Login from './pages/login';
import Create from './pages/document/create';
import AuthRoute from './components/molecules/auth-route';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route
              path="/document/:id"
              element={<AuthRoute element={<Document />} />}
            />
            <Route
              path="/document/create"
              element={<AuthRoute element={<Create />} />}
            />
            <Route
              path="/"
              element={<Navigate replace to="/document/create" />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
