/**
 * Check browser or OS preference for dark mode
 */

const checkPrefersDarkMode = (): boolean => {
  const preferDarkQuery = '(prefers-color-scheme: dark)';

  const mediaQuery = matchMedia(preferDarkQuery);

  return mediaQuery.media === preferDarkQuery;
};

export default checkPrefersDarkMode;
