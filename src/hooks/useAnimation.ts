import { useState, useEffect } from 'react';

const easing = {
  linear: (n: number): number => n,
  elastic: (n: number): number => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n: number): number => (10 * (n - 1)) ** 2,
  cubic: (n: number): number => n * (4 * n * n - 9 * n + 6),
};

/**
 * Hook that calls useState every animation frame
 * giving us elapsed time and causing a rerender
 * as frequently as possible for a smooth animation
 */

const useAnimationTimer = (duration: number, delay: number): number => {
  const [elapsed, setTime] = useState(0);

  useEffect((): (() => void) => {
    let animationFrame: number;
    let timerStop: number;
    let start: number;

    const onFrame = (): void => {
      setTime(Date.now() - start);

      animationFrame = requestAnimationFrame(onFrame);
    };

    const onStart = (): void => {
      timerStop = window.setTimeout((): void => {
        cancelAnimationFrame(animationFrame);
        setTime(Date.now() - start);
      }, duration);

      start = Date.now();

      animationFrame = requestAnimationFrame(onFrame);
    };

    const timerDelay = setTimeout(onStart, delay);

    return (): void => {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);

      cancelAnimationFrame(animationFrame);
    };
  }, [duration, delay]);

  return elapsed;
};

/**
 * Hook that calls useAnimationTimer hook and returns easing value
 *
 * @example
 *
 * const animation = useAnimation('elastic', 500, 0);
 */

const useAnimation = (
  easingName: keyof typeof easing = 'linear',
  duration: number = 1000,
  delay: number = 0,
): number => {
  const elapsed = useAnimationTimer(duration, delay);

  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);

  // Return altered value based on our specified easing function
  return easing[easingName](n);
};

export default useAnimation;
