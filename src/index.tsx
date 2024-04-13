import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './app';
import { setupStore } from './store';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer />
          <App />
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
