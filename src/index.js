import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux'
import store from './store';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
      <CookiesProvider>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
