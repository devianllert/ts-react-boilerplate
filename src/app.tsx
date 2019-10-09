import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { I18nextProvider } from 'react-i18next';

import configureStore from './configureStore';
import history from './utils/history';

import ThemeProvider from './components/ThemeProvider';

import App from './containers/App';

import Loader from './components/Loader';

import * as serviceWorker from './serviceWorker';

import i18n from './i18n';

import './design/global.scss';

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <ThemeProvider>
          <Suspense fallback={<Loader fullscreen />}>
            <App />
          </Suspense>
        </ThemeProvider>
      </ConnectedRouter>
    </I18nextProvider>
  </Provider>,
  MOUNT_NODE,
);

serviceWorker.unregister();
