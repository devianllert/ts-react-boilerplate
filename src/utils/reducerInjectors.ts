import { Reducer } from 'redux';

import createReducer from '../reducers';
import { EnhancedStore } from '../configureStore';

export function injectReducerFactory(store: EnhancedStore) {
  return function injectReducer(key: string, reducer: Reducer): void {
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: EnhancedStore) {
  return {
    injectReducer: injectReducerFactory(store),
  };
}
