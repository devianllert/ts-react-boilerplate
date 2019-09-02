import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore from './configureStore';
import history from './utils/history';

import App from './containers/App';

import * as serviceWorker from './serviceWorker';

import './design/global.scss';

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE,
);

serviceWorker.unregister();
