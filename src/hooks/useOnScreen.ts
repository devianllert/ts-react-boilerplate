import { useState, useEffect, RefObject } from 'react';

/**
 * Hook to track the visibility of a functional component based on IntersectionVisible Observer.
 *
 * @example
 *
 * const isIntersecting = useOnScreen(ref);
 */

const useOnScreen = (ref: RefObject<HTMLElement>, rootMargin = '0px'): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect((): (() => void) => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]): void => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (element) {
      observer.observe(element);
    }
    return (): void => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useOnScreen;
