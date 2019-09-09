import { useEffect } from 'react';

import { on, off } from '../utils/listeners';

/**
 * Hook that subscribes a handler to events.
 *
 * @example
 * useEvent('keydown', handler)
 *
 * useEvent('scroll', handler, window, {capture: true})
 */

const useEvent = (
  type: string,
  handler: (event: any) => void, // eslint-disable-line @typescript-eslint/no-explicit-any
  target: any | null = window, // eslint-disable-line @typescript-eslint/no-explicit-any
  options?: AddEventListenerOptions,
): void => {
  useEffect((): (() => void) => {
    on(target, type, handler, options);

    return (): void => {
      off(target, type, handler, options);
    };
  }, [type, handler, target, options]);
};

export default useEvent;
