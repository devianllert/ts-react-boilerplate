export type Breakpoint = 'desktop' | 'laptop' | 'tablet' | 'mobile';

interface MediaQueryType {
  up: string;
  down: string;
}

const customMediaQuery = (maxWidth: number): MediaQueryType => ({
  up: `@media (min-width: ${maxWidth}px)`,
  down: `@media (max-width: ${maxWidth}px)`,
});

export const breakpoints: Record<Breakpoint, number> = {
  mobile: 600,
  tablet: 960,
  laptop: 1280,
  desktop: 1920,
};

const media = {
  custom: customMediaQuery,
  mobile: customMediaQuery(breakpoints.mobile),
  tablet: customMediaQuery(breakpoints.tablet),
  laptop: customMediaQuery(breakpoints.laptop),
  desktop: customMediaQuery(breakpoints.desktop),
};

// By default, returns true if screen width is the same or greater than the given breakpoint.
export const isWidthUp = (breakpoint: Breakpoint, width: Breakpoint, inclusive = true): boolean => {
  const keys = Object.keys(breakpoints);

  if (inclusive) {
    return keys.indexOf(breakpoint) <= keys.indexOf(width);
  }

  return keys.indexOf(breakpoint) < keys.indexOf(width);
};

// By default, returns true if screen width is the same or less than the given breakpoint.
export const isWidthDown = (breakpoint: Breakpoint, width: Breakpoint, inclusive = true): boolean => {
  const keys = Object.keys(breakpoints);

  if (inclusive) {
    return keys.indexOf(width) <= keys.indexOf(breakpoint);
  }

  return keys.indexOf(width) < keys.indexOf(breakpoint);
};

export default media;
