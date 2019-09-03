import { useLayoutEffect } from 'react';

function useLockBodyScroll(): void {
  useLayoutEffect((): (() => void) => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = 'hidden';

    return (): void => { document.body.style.overflow = originalStyle; };
  }, []);
}

export default useLockBodyScroll;
