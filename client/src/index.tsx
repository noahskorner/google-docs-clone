import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/transitions.css';
import './assets/css/spinners.css';
import './assets/css/buttons.css';
import './assets/css/toasts.css';
import './assets/css/tables.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Components from './pages/components';
import Login from './pages/login';
import { ToastManagerProvider } from './contexts/toast-context';
import { ThemeProvider } from './contexts/theme-context';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastManagerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Components />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ToastManagerProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
