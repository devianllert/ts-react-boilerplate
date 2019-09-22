import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

import counterReducer from './containers/CounterPage/reducer';

const staticReducers = {
  router: connectRouter(history),
  counter: counterReducer,
};

const createReducer = (injectedReducers = {}): Reducer => {
  const rootReducer = combineReducers({
    ...staticReducers,
    ...injectedReducers,
  });

  return rootReducer;
};

export default createReducer;
