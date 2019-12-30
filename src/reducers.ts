import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

const staticReducers = {
  router: connectRouter(history),
};

const createReducer = (injectedReducers = {}): Reducer => {
  const rootReducer = combineReducers({
    ...staticReducers,
    ...injectedReducers,
  });

  return rootReducer;
};

export default createReducer;
