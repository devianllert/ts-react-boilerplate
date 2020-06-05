/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import { createTransition } from '../../design/transitions';
import { TEXT_PRIMARY, DIVIDER_COLOR, PAPER_COLOR } from '../../design/colors';
import { shape } from '../../design/shape';
import { shadows } from '../../design/shadows';

interface PaperProps {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   */
  elevation?: number;
  /**
   * If `true`, rounded corners are disabled.
   */
  square?: boolean;
  /**
   * The variant to use.
   */
  variant?: 'elevation' | 'outlined';
}

export const Paper = styled.div<PaperProps>`
  background-color: ${PAPER_COLOR};
  color: ${TEXT_PRIMARY};
  transition: ${createTransition('box-shadow')};

  border-radius: ${({ square = false }): string => (square ? 'auto' : `${shape.borderRadius}px`)};

  box-shadow: ${({ variant = 'elevation', elevation = 1 }): string => (
    variant === 'elevation' ? shadows[elevation] : 'none'
  )};

  border: ${({ variant = 'elevation' }) => (
    variant === 'outlined' ? css`1px solid ${DIVIDER_COLOR}` : 'none'
  )};
`;
