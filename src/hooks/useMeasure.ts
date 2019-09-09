import { useState, useCallback } from 'react';

export interface ContentRect {
  width: number;
  height: number;
  top: number;
  right: number;
  left: number;
  bottom: number;
}

/**
 * Hook that reacts to changes in size of any of the observed elements.
 *
 * @example
 *
 * const [ref, rect] = useMeasure();
 *
 * <div ref={ref}>Hello</div>
 */

const useMeasure = <T>(): [(instance: T) => void, ContentRect] => {
  const [rect, set] = useState<ContentRect>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  const ref = useCallback((node): void => {
    if (node) {
      set(node.getBoundingClientRect());
    }
  }, []);

  return [ref, rect];
};

export default useMeasure;
