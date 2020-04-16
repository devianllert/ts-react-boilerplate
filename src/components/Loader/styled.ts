/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { PRIMARY } from '../../design/colors';

interface OverlayProps {
  fullscreen?: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  display: flex;

  color: ${PRIMARY};

  align-items: center;
  justify-content: center;

  flex: 1;

  width: 100%;
  height: ${({ fullscreen }): string => (fullscreen ? '100vh' : '100%')};
`;
