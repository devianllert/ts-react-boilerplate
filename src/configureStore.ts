import {
  createStore,
  compose,
  applyMiddleware,
  Store,
} from 'redux';
import { routerMiddleware } from 'connected-react-router';

import createReducer from './reducers';

const configureStore = (initialState = {}, history: import('history').History): Store => {
  let composeEnhancers = compose;

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable */
    // @ts-ignore
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      // @ts-ignore
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }
    /* eslint-enable */
  }

  const middlwares = [
    routerMiddleware(history),
  ];

  const enhancers = [applyMiddleware(...middlwares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  return store;
};

export default configureStore;
