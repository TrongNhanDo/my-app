import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import './i18n/i18n';
import { ContextProvider } from './context/SumProductContext.tsx';
import store from './ducks/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
