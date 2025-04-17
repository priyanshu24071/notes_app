// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';             
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
