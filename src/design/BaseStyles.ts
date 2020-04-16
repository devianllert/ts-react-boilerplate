import { createGlobalStyle } from 'styled-components';

import { BACKGROUND, TEXT_PRIMARY, PRIMARY } from './colors';

const BaseStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    text-rendering: optimizeLegibility;

    font-display: swap;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6em;
    font-weight: 400;

    letter-spacing: normal;

    background-color: ${BACKGROUND};

    color: ${TEXT_PRIMARY};
  }

  .app {
    min-height: 100vh;
  }

  a {
    color: ${PRIMARY};

    text-decoration: none;
  }

  /* Make sure images have an alt attribute */

  img:not([alt]) {
    border: 5px dashed red;
  }
`;

export default BaseStyles;
