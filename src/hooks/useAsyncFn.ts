import { useState, useCallback, DependencyList } from 'react';

export interface AsyncState<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}

export type AsyncFn<T> = [
  AsyncState<T>,
  (...args: any[]) => Promise<T | Error> // eslint-disable-line
];

/**
 * Hook that returns state and a callback for an async function or a function that returns a promise.
 *
 * @param fn - async function or a function that returns a promise
 * @param deps - hook dependencies
 * @param initialState
 */

const useAsyncFn = <T>(
  fn: (...args: any[]) => Promise<T>, // eslint-disable-line
  deps: DependencyList = [],
  initialState: AsyncState<T> = { loading: false },
): AsyncFn<T> => {
  const [state, setState] = useState<AsyncState<T>>(initialState);

  const callback = useCallback(async (...args: any[]): Promise<T | Error> => { // eslint-disable-line
    setState({ loading: true });

    try {
      const value = await fn(...args);

      setState({ value, loading: false });

      return value;
    } catch (error) {
      setState({ error, loading: false });

      return error;
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return [state, callback];
};

export default useAsyncFn;
