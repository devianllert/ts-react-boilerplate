import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect that does not show warning when server-side rendering.
 */

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
