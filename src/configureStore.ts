import {
  createStore,
  compose,
  Store,
  StoreEnhancer,
} from 'redux';

import createReducer from './reducers';

const configureStore = (initialState = {}): Store => {
  let composeEnhancers = compose;

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable */
    // @ts-ignore
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      // @ts-ignore
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const enhancers: StoreEnhancer[] = [];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  return store;
};

export default configureStore;
