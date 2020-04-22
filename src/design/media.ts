export type Breakpoints = 'desktop' | 'laptop' | 'tablet' | 'mobile';

interface MediaQueryType {
  up: string;
  down: string;
}

const customMediaQuery = (maxWidth: number): MediaQueryType => ({
  up: `@media (min-width: ${maxWidth}px)`,
  down: `@media (max-width: ${maxWidth}px)`,
});

export const breakpoints: Record<Breakpoints, number> = {
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

export default media;
