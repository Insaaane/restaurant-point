import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { AuthProvider } from './utils/AuthContext.jsx'; 

import './styles/reset.css';
import './styles/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Header/>
      <App/>
      <Footer/>
    </AuthProvider>
  </BrowserRouter>
);