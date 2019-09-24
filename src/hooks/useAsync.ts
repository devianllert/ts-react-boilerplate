import { useEffect, DependencyList } from 'react';
import useAsyncFn from './useAsyncFn';

export interface AsyncState<T> {
  loading: boolean;
  error?: Error;
  value?: T;
}

export type AsyncFn<T, Args extends any[] = any[]> = [ // eslint-disable-line
  AsyncState<T>,
  (...args: Args) => Promise<T | Error>
];

/**
 * Hook that resolves an async function or a function that returns a promise
 *
 * @param fn - async function or a function that returns a promise
 * @param deps - hook dependencies
 */

const useAsync = <T>(fn: (...args: any[]) => Promise<T>, deps: DependencyList = []): AsyncFn<T> => {  // eslint-disable-line
  const [state, callback] = useAsyncFn<T>(fn, deps, {
    loading: true,
  });

  useEffect((): void => {
    callback();
  }, [callback]);

  return [state, callback];
};

export default useAsync;
