import {
  createStore,
  compose,
  applyMiddleware,
  Store,
  Reducer,
} from 'redux';
import createSagaMiddleware, { Saga, SagaMiddleware, Task } from 'redux-saga';

import createReducer from './reducers';

export interface EnhancedStore extends Store {
  runSaga: SagaMiddleware['run'];
  injectedReducers: {
    [key: string]: Reducer;
  };
  injectedSagas: {
    [key: string]: {
      saga?: Saga;
      task: Task;
      mode?: string;
    } | string;
  };
}

const configureStore = (initialState = {}): EnhancedStore => {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

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

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlwares = [
    sagaMiddleware,
  ];

  const enhancers = [applyMiddleware(...middlwares)];

  const store: EnhancedStore = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
};

export default configureStore;
