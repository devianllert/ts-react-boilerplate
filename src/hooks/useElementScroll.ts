import {
  useState,
  useEffect,
  useRef,
  RefObject,
} from 'react';

import { on, off } from '../utils/listeners';

export interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Hook that re-renders on element scroll.
 *
 * @example
 *
 * const { x, y } = useElementScroll(ref);
 */

const useElementScroll = (ref: RefObject<HTMLElement>): ScrollPosition => {
  const frame = useRef(0);
  const [position, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect((): (() => void) => {
    const element = ref.current;

    const handleScroll = (): void => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame((): void => {
        if (element) {
          setScrollPosition({
            x: element.scrollLeft,
            y: element.scrollTop,
          });
        }
      });
    };

    if (element) {
      on(element, 'scroll', handleScroll, {
        capture: false,
        passive: true,
      });
    }

    return (): void => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      if (element) {
        off(element, 'scroll', handleScroll);
      }
    };
  }, [ref]);

  return position;
};

/**
 * Hook that re-renders on element scroll.
 *
 * @example
 *
 * const x = useElementXScroll(ref);
 */

const useElementXScroll = (ref: RefObject<HTMLElement>): number => {
  const { x } = useElementScroll(ref);

  return x;
};

/**
 * Hook that re-renders on element scroll.
 *
 * @example
 *
 * const y = useElementYScroll(ref);
 */

const useElementYScroll = (ref: RefObject<HTMLElement>): number => {
  const { y } = useElementScroll(ref);

  return y;
};

export {
  useElementScroll,
  useElementXScroll,
  useElementYScroll,
};
