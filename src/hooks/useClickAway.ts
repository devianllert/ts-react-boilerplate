import { useEffect, RefObject } from 'react';

import { on, off } from '../utils/listeners';

/**
 * Hook that triggers a callback when user clicks outside the target element.
 *
 * @example
 * useClickAway(ref, () => alert('outside clicked'))
 */

const useClickAway = (ref: RefObject<HTMLElement>, handler: Function): void => {
  useEffect(
    (): (() => void) => {
      const listener = (event: Event): void => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }

        handler(event);
      };


      on(document, 'mousedown', listener);
      on(document, 'touchstart', listener);

      return (): void => {
        off(document, 'mousedown', listener);
        off(document, 'touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
};

export default useClickAway;
