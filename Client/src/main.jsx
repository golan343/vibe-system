import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import store from './redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
    <Provider store={store}>
      <Home />
    </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

