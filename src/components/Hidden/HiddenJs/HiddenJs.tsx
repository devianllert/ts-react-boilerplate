import { ReactElement } from 'react';
import { useMedia } from 'react-essential-tools';

import media, { isWidthDown, isWidthUp, Breakpoint } from '../../../design/media';

interface Props {
  /**
   * The content.
   */
  children?: ReactElement;
  /**
   * Max or min constraints
   */
  constraint?: 'up' | 'down';
  /**
   * Screens this size and (up/down based on constraint prop) will be hidden.
   */
  breakpoint: Breakpoint;
  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
   * As `window.matchMedia` is unavailable on the server,
   * we default to rendering an empty component during the first mount.
   * You might want to use an heuristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * https://caniuse.com/#search=client%20hint
   */
  initialWidth?: Breakpoint;
}

/**
 * Responsively hides children based on the matchMedia API.
 */
const HiddenJs = (props: Props): ReactElement | null => {
  const {
    children,
    constraint = 'down',
    breakpoint,
    initialWidth,
  } = props;
  const isWidthEqual = constraint === 'down' ? isWidthDown : isWidthUp;

  const visible = useMedia(media[breakpoint][constraint]);

  if (!children) return null;

  if (visible || (initialWidth && isWidthEqual(breakpoint, initialWidth))) return null;

  return children;
};

export default HiddenJs;
