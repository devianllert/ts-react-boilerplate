import { Saga, Task } from 'redux-saga';

import { EnhancedStore } from '../core/configureStore';

export enum SagaInjectionModes {
  RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount',
  DAEMON = '@@saga-injector/daemon',
  ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount',
}

interface Descriptor {
  saga?: Saga;
  task?: Task;
  mode?: SagaInjectionModes;
}

export function injectSagaFactory(store: EnhancedStore) {
  return function injectSaga(key: string, descriptor: Descriptor = {}, args?: any): void {
    let hasSaga = Reflect.has(store.injectedSagas, key);

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || SagaInjectionModes.DAEMON,
    };
    const { saga, mode } = newDescriptor;

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && typeof oldDescriptor === 'object' && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (hasSaga && mode !== SagaInjectionModes.DAEMON && mode !== SagaInjectionModes.ONCE_TILL_UNMOUNT)) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga as Saga<any[]>, args),
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

export function ejectSagaFactory(store: EnhancedStore) {
  return function ejectSaga(key: string): void {
    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];

      if (typeof descriptor === 'object' && descriptor.mode && descriptor.mode !== SagaInjectionModes.DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store: EnhancedStore) {
  return {
    injectSaga: injectSagaFactory(store),
    ejectSaga: ejectSagaFactory(store),
  };
}
