import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore from './configureStore';
import history from './utils/history';

import Loader from './components/Loader';

import App from './containers/App';

import * as serviceWorker from './serviceWorker';

import './i18n';

import './design/global.scss';

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<Loader fullscreen />}>
        <App />
      </Suspense>
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE,
);

serviceWorker.unregister();
