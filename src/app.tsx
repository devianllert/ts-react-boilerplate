import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';

import configureStore from './configureStore';
import history from './utils/history';

import App from './containers/App';

import * as serviceWorker from './serviceWorker';

import './design/global.scss';

const store = configureStore();
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  MOUNT_NODE,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
