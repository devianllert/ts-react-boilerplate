import { useMemo } from 'react';

import useEvent from './useEvent';

export type Handler = (event: KeyboardEvent) => void;

export type KeyFilter = null | undefined | string | ((event: KeyboardEvent) => boolean);

export type KeyPredicate = (event: KeyboardEvent) => boolean;

export interface UseKeyOptions {
  event?: 'keydown' | 'keypress' | 'keyup';
  target?: EventTarget;
  options?: AddEventListenerOptions;
}

const noop = (): void => {};

const createKeyPredicate = (keyFilter: KeyFilter): KeyPredicate => {
  if (typeof keyFilter === 'function') return keyFilter;

  if (typeof keyFilter === 'string') return (event: KeyboardEvent): boolean => event.key === keyFilter;

  return keyFilter
    ? (): boolean => true
    : (): boolean => false;
};

/**
 * Hook that executes a handler when a keyboard key is used.
 *
 * @example
 * useKey('a', () => alert('"a" pressed'));
 *
 * const predicate = (event) => event.key === 'a';
 * useKey(predicate, handler, { event: 'keyup' });
 */

const useKey = (key: KeyFilter, fn: Handler = noop, opts: UseKeyOptions = {}): void => {
  const { event = 'keydown', target, options } = opts;

  const useMemoHandler = useMemo((): Handler => {
    const predicate: KeyPredicate = createKeyPredicate(key);

    const handler: Handler = (handlerEvent): void => {
      if (!predicate(handlerEvent)) return;

      fn(handlerEvent);
    };

    return handler;
  }, [key, fn]);

  useEvent(event, useMemoHandler, target, options);
};

export default useKey;
