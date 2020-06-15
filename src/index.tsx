import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './modules/App';
import ThemeProvider from './components/ThemeProvider';
import AuthProvider from './components/AuthProvider';

import configureStore from './core/configureStore';
import history from './core/history';
import i18n from './core/i18n';

import * as serviceWorker from './serviceWorker';

const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter history={history}>
          <ThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </StrictMode>,
  MOUNT_NODE,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
