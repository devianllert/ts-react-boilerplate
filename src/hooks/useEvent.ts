import { useEffect } from 'react';

export interface AddListenerType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener: (name: string, handler: (event: Event) => void, ...args: any[]) => void;

  removeEventListener: (name: string, handler: (event: Event) => void) => void;
}

export interface OnListenerType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (name: string, handler: (event: Event) => void, ...args: any[]) => void;

  off: (name: string, handler: (event: Event) => void) => void;
}

export type EventTargetType = AddListenerType | OnListenerType;

/**
 * Hook that subscribes a handler to events.
 *
 * @example
 * useEvent('keydown', handler)
 *
 * useEvent('scroll', handler, window, {capture: true})
 */

const useEvent = (
  name: string,
  handler: (event?: any) => void, // eslint-disable-line @typescript-eslint/no-explicit-any
  target: null | EventTargetType = window,
  options?: AddEventListenerOptions,
): void => {
  useEffect((): (() => void) => {
    const fn: Function = (target as AddListenerType).addEventListener || (target as OnListenerType).on;

    fn.call(target, name, handler, options);

    return (): void => {
      const cleanFn: Function = (target as AddListenerType).removeEventListener || (target as OnListenerType).off;

      cleanFn.call(target, name, handler, options);
    };
  }, [name, handler, target, options]);
};

export default useEvent;
