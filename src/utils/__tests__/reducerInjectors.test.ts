/**
 * Test injectors
 */

import { Reducer, AnyAction } from 'redux';
import { createMemoryHistory } from 'history';

import configureStore, { EnhancedStore } from '../../configureStore';

import getInjectors, { injectReducerFactory } from '../reducerInjectors';

// Fixtures

const initialState = { reduced: 'soon' };

const reducer: Reducer<any, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        reduced: action.payload,
      };
    default:
      return state;
  }
};

describe('reducer injectors', () => {
  let store: EnhancedStore;
  let injectReducer: (key: string, reducer: Reducer<any, AnyAction>) => void;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, createMemoryHistory());
    });

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(
        expect.objectContaining({
          injectReducer: expect.any(Function),
        }),
      );
    });
  });

  describe('injectReducer helper', () => {
    beforeEach(() => {
      store = configureStore({}, createMemoryHistory());
      injectReducer = injectReducerFactory(store);
    });

    it('given a store, it should provide a function to inject a reducer', () => {
      injectReducer('test', reducer);

      const actual = store.getState().test;
      const expected = initialState;

      expect(actual).toEqual(expected);
    });

    it('should not assign reducer if already existing', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', reducer);

      expect(store.replaceReducer).toHaveBeenCalledTimes(1);
    });
  });
});
