import { combineReducers, Reducer } from 'redux';

interface InjectedReducers {
  [key: string]: Reducer;
}

const staticReducers = {};

const createReducer = (injectedReducers: InjectedReducers = {}): Reducer => {
  const rootReducer = combineReducers({
    ...staticReducers,
    ...injectedReducers,
  });

  return rootReducer as Reducer;
};

export default createReducer;
