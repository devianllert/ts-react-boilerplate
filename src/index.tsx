import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { I18nextProvider } from 'react-i18next';

import App from './modules/App';
import ThemeProvider from './components/ThemeProvider';

import configureStore from './configureStore';
import history from './utils/history';
import i18n from './i18n';

import * as serviceWorker from './serviceWorker';

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConnectedRouter history={history}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ConnectedRouter>
      </I18nextProvider>
    </Provider>
  </StrictMode>,
  MOUNT_NODE,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
