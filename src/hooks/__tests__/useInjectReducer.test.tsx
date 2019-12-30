import React from 'react';
import { Provider } from 'react-redux';
import { Reducer, AnyAction } from 'redux';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import configureStore, { EnhancedStore } from '../../configureStore';
import useInjectReducer from '../useInjectReducer';
import * as reducerInjectors from '../../utils/reducerInjectors';

const reducer: Reducer<any, AnyAction> = (s) => s;

describe('useInjectReducer hook', () => {
  let store: EnhancedStore;
  let injectors: { injectReducer: Function };
  let ComponentWithReducer: React.FC;

  beforeAll(() => {
    injectors = {
      injectReducer: jest.fn(),
    };
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
    store = configureStore({}, createMemoryHistory());
    ComponentWithReducer = (): null => {
      useInjectReducer({ key: 'test', reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      <Provider store={store}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
    expect(injectors.injectReducer).toHaveBeenCalledWith('test', reducer);
  });
});
