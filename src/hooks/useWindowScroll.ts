import { useState, useEffect, useRef } from 'react';

import { on, off } from '../utils/listeners';

interface WindowScrollPosition {
  x: number;
  y: number;
}

const getWindowScrollPosition = (): WindowScrollPosition => ({ x: window.pageXOffset, y: window.pageYOffset });

/**
 * Hook that re-renders on window scroll.
 *
 * @example
 *
 * const { x, y } = useWindowScroll(ref);
 */

const useWindowScroll = (): WindowScrollPosition => {
  const frame = useRef(0);
  const [position, setScrollPosition] = useState<WindowScrollPosition>(getWindowScrollPosition());

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame((): void => {
        setScrollPosition(getWindowScrollPosition());
      });
    };

    on(window, 'scroll', handleScroll, {
      capture: false,
      passive: true,
    });

    return (): void => {
      cancelAnimationFrame(frame.current);

      off(window, 'scroll', handleScroll);
    };
  }, []);

  return position;
};

/**
 * Hook that re-renders on window scroll.
 *
 * @example
 *
 * const x = useWindowXScroll(ref);
 */

const useWindowXScroll = (): number => {
  const { x } = useWindowScroll();

  return x;
};

/**
 * Hook that re-renders on window scroll.
 *
 * @example
 *
 * const y = useWindowYScroll(ref);
 */

const useWindowYScroll = (): number => {
  const { y } = useWindowScroll();

  return y;
};

export {
  useWindowScroll,
  useWindowXScroll,
  useWindowYScroll,
};
