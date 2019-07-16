import { combineReducers, Reducer } from 'redux';

import counterReducer from './containers/Counter/reducer';

const staticReducers = {
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
