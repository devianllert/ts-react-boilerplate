/**
 * Test injectors
 */

import { put } from 'redux-saga/effects';
import { createMemoryHistory } from 'history';

import configureStore, { EnhancedStore } from '../../configureStore';
import getInjectors, { injectSagaFactory, ejectSagaFactory } from '../sagaInjectors';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from '../constants';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectors', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let store: EnhancedStore;
  let injectSaga: Function;
  let ejectSaga: Function;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, createMemoryHistory());
    });

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(
        expect.objectContaining({
          injectSaga: expect.any(Function),
          ejectSaga: expect.any(Function),
        }),
      );
    });
  });

  describe('ejectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, createMemoryHistory());
      injectSaga = injectSagaFactory(store);
      ejectSaga = ejectSagaFactory(store);
    });

    it('should cancel a saga in RESTART_ON_REMOUNT mode', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel }, mode: RESTART_ON_REMOUNT };
      ejectSaga('test');

      expect(cancel).toHaveBeenCalled();
    });

    it('should not cancel a daemon saga', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel }, mode: DAEMON };
      ejectSaga('test');

      expect(cancel).not.toHaveBeenCalled();
    });

    it('should ignore saga that was not previously injected', () => {
      expect(() => ejectSaga('test')).not.toThrow();
    });

    it("should remove non daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: RESTART_ON_REMOUNT });
      injectSaga('test1', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      ejectSaga('test');
      ejectSaga('test1');

      expect(store.injectedSagas.test).toBe('done');
      expect(store.injectedSagas.test1).toBe('done');
      process.env.NODE_ENV = originalNodeEnv;
    });

    it("should not remove daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
      process.env.NODE_ENV = originalNodeEnv;
    });

    it("should not remove daemon saga's descriptor in development", () => {
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
    });
  });

  describe('injectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, createMemoryHistory());
      injectSaga = injectSagaFactory(store);
      ejectSaga = ejectSagaFactory(store);
    });

    it('should pass args to saga.run', () => {
      const args = {};
      store.runSaga = jest.fn();
      injectSaga('test', { saga: testSaga }, args);

      expect(store.runSaga).toHaveBeenCalledWith(testSaga, args);
    });

    it('should not start daemon and once-till-unmount sagas if were started before', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', { saga: testSaga, mode: DAEMON });
      injectSaga('test1', { saga: testSaga, mode: DAEMON });
      injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });
      injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      expect(store.runSaga).toHaveBeenCalledTimes(2);
    });

    it('should start any saga that was not started before', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', { saga: testSaga });
      injectSaga('test2', { saga: testSaga, mode: DAEMON });
      injectSaga('test3', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      expect(store.runSaga).toHaveBeenCalledTimes(3);
    });

    it('should restart a saga if different implementation for hot reloading', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { saga: testSaga, task: { cancel } };
      store.runSaga = jest.fn();

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectSaga('test', { saga: testSaga1 });

      expect(cancel).toHaveBeenCalledTimes(1);
      expect(store.runSaga).toHaveBeenCalledWith(testSaga1, undefined);
    });

    it('should not cancel saga if different implementation in production', () => {
      process.env.NODE_ENV = 'production';
      const cancel = jest.fn();
      store.injectedSagas.test = {
        saga: testSaga,
        task: { cancel },
        mode: RESTART_ON_REMOUNT,
      };

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectSaga('test', { saga: testSaga1, mode: DAEMON });

      expect(cancel).toHaveBeenCalledTimes(0);
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should save an entire descriptor in the saga registry', () => {
      injectSaga('test', { saga: testSaga, foo: 'bar' });
      expect(store.injectedSagas.test.foo).toBe('bar');
    });
  });
});