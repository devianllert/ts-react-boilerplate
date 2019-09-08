import { useState, useEffect, useRef } from 'react';

interface WindowScrollPosition {
  x: number;
  y: number;
}

const getWindowScrollPosition = (): WindowScrollPosition => ({ x: window.pageXOffset, y: window.pageYOffset });

/**
 * Hook that re-renders on window scroll.
 */

const useWindowScroll = (): WindowScrollPosition => {
  const frame = useRef(0);
  const [position, setScrollPosition] = useState<WindowScrollPosition>(getWindowScrollPosition());

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      cancelAnimationFrame(frame.current);

      frame.current = window.requestAnimationFrame((): void => {
        setScrollPosition(getWindowScrollPosition());
      });
    };

    window.addEventListener('scroll', handleScroll, {
      capture: false,
      passive: true,
    });

    return (): void => {
      cancelAnimationFrame(frame.current);

      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return position;
};

const useWindowXScroll = (): number => {
  const { x } = useWindowScroll();

  return x;
};

const useWindowYScroll = (): number => {
  const { y } = useWindowScroll();

  return y;
};

export {
  useWindowScroll,
  useWindowXScroll,
  useWindowYScroll,
};
