import { useEffect, EffectCallback } from 'react';

/**
 * Hook that calls a function after the component is mounted.
 *
 * @param fn
 */

const useMount = (fn: EffectCallback): void => {
  useEffect(fn, []);
};

export default useMount;
