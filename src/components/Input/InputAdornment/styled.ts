/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { spacings } from '../../../design/spacings';

interface AdornmentProps {
  position: 'start' | 'end';
  variant?: 'standard' | 'outlined' | 'filled';
  disablePointerEvents: boolean;
}

export const Adornment = styled.div<AdornmentProps>`
  display: flex;
  align-items: center;

  max-height: 2em;

  white-space: nowrap;

  margin-right: ${({ position }): string => (position === 'start' ? spacings[1] : '0')} ;
  margin-left: ${({ position }): string => (position === 'end' ? spacings[1] : '0')} ;

  pointer-events: ${({ disablePointerEvents }): string => (disablePointerEvents ? 'none' : 'auto')}
`;
