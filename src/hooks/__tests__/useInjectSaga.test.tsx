import React from 'react';
import { Provider } from 'react-redux';
import { put } from 'redux-saga/effects';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import configureStore, { EnhancedStore } from '../../configureStore';
import useInjectSaga from '../useInjectSaga';
import * as sagaInjectors from '../../utils/sagaInjectors';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('useInjectSaga hook', () => {
  let store: EnhancedStore;
  let injectors: { injectSaga: Function; ejectSaga: Function };
  let ComponentWithSaga: React.FC;

  beforeAll(() => {
    sagaInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, createMemoryHistory());
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga = (): null => {
      useInjectSaga({
        key: 'test',
        saga: testSaga,
        mode: 'testMode',
      });
      return null;
    };
    sagaInjectors.default.mockClear();
  });

  it('should inject given saga and mode', () => {
    render(
      <Provider store={store}>
        <ComponentWithSaga />
      </Provider>,
    );

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.injectSaga).toHaveBeenCalledWith('test', {
      saga: testSaga,
      mode: 'testMode',
    });
  });

  it('should eject on unmount with a correct saga key', () => {
    const { unmount } = render(
      <Provider store={store}>
        <ComponentWithSaga />
      </Provider>,
    );

    unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
    expect(injectors.ejectSaga).toHaveBeenCalledWith('test');
  });
});
