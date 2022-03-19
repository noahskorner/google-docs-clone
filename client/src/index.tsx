import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/transitions.css';
import './assets/css/spinners.css';
import './assets/css/toasts.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Document from './pages/document';
import Login from './pages/login';
import { ToastManagerProvider } from './contexts/toast-context';

ReactDOM.render(
  <React.StrictMode>
    <ToastManagerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/document" element={<Document />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ToastManagerProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
