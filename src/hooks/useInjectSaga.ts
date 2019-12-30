/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import { Saga } from 'redux-saga';

import getInjectors from '../utils/sagaInjectors';
import { EnhancedStore } from '../configureStore';

interface UseInjectSagaOptions {
  key: string;
  saga: Saga;
  mode?: string;
}

/**
 * Hook that dynamically injects a saga
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 *
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */

const useInjectSaga = ({ key, saga, mode }: UseInjectSagaOptions): void => {
  const context = useContext(ReactReduxContext);

  useEffect(() => {
    const injectors = getInjectors(context.store as EnhancedStore);
    injectors.injectSaga(key, { saga, mode });

    return (): void => {
      injectors.ejectSaga(key);
    };
  }, []);
};

export default useInjectSaga;
