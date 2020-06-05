/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { spacings } from '../../design/spacings';
import media, { breakpoints, Breakpoint } from '../../design/media';

interface ContainerProps {
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters?: boolean;
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth?: Breakpoint | false;
}

export const StyledContainer = styled.div<ContainerProps>`
  box-sizing: border-box;

  display: block;

  width: 100%;

  margin-left: auto;
  margin-right: auto;

  padding-left: ${spacings[2]};
  padding-right: ${spacings[2]};

  @media ${media.tablet.up} {
    padding-left: ${spacings[3]};
    padding-right: ${spacings[3]};
  }

  ${({ disableGutters }): string | undefined | false => disableGutters && `
    padding-left: 0;
    padding-right: 0;
  `}

  ${({ maxWidth }): string | undefined | false => maxWidth && `
    @media ${media[maxWidth].up} {
      max-width: ${breakpoints[maxWidth]}px;
    }
  `};
`;
