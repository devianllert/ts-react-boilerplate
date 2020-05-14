import React, { ReactNode, ReactElement } from 'react';
import styled from 'styled-components';

import media, { Breakpoint } from '../../../design/media';

interface Props {
  /**
   * The content.
   */
  children?: ReactNode;
  /**
   * Max or min constraints
   */
  constraint?: 'up' | 'down';
  /**
   * Screens this size and (up/down based on constraint prop) will be hidden.
   */
  breakpoint: Breakpoint;
}

const HiddenComponent = styled.div<Props>`
  ${({ constraint = 'down', breakpoint }): string | undefined => breakpoint && `
    @media ${media[breakpoint][constraint]} {
      display: none;
    }
  `}
`;

/**
 * Responsively hides children based on the css media queries.
 */
const HiddenCss = (props: Props): ReactElement => {
  const {
    children,
    constraint = 'down',
    breakpoint,
  } = props;

  return <HiddenComponent constraint={constraint} breakpoint={breakpoint}>{children}</HiddenComponent>;
};

export default HiddenCss;
