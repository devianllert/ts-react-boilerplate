import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';

interface InjectedReducers {
  [key: string]: Reducer;
}

const staticReducers = {
  router: connectRouter(history),
};

const createReducer = (injectedReducers: InjectedReducers = {}): Reducer => {
  const rootReducer = combineReducers({
    ...staticReducers,
    ...injectedReducers,
  });

  return rootReducer as Reducer;
};

export default createReducer;
