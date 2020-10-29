import React, { ReactElement } from 'react';

import { Breakpoint } from '../../design/media';

import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';

interface HiddenProps {
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
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty component during the first mount.
   * You might want to use an heuristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * https://caniuse.com/#search=client%20hint
   */
  initialWidth?: Breakpoint;
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation?: 'js' | 'css';
}

/**
 * Responsively hides children based on the selected implementation.
 */
const Hidden = (props: HiddenProps): ReactElement => {
  const {
    children,
    constraint = 'down',
    breakpoint,
    initialWidth,
    implementation = 'js',
  } = props;

  if (implementation === 'js') {
    return (
      <HiddenJs
        constraint={constraint}
        breakpoint={breakpoint}
        initialWidth={initialWidth}
      >
        {children}
      </HiddenJs>
    );
  }

  return (
    <HiddenCss
      constraint={constraint}
      breakpoint={breakpoint}
    >
      {children}
    </HiddenCss>
  );
};

export default Hidden;
