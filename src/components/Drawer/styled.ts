import styled from 'styled-components';

import { spacings } from '../../design/spacings';

interface DrawerContainerProps {
  anchor: 'bottom' | 'left' | 'right' | 'top';
}

const drawerDirections = {
  left: `
    left: 0;
    right: auto;
  `,
  right: `
    left: auto;
    right: 0;
  `,
  top: `
    top: 0;
    left: 0;
    bottom: auto;
    right: 0;
    height: auto;
    width: auto;
    max-height: 100%;
  `,
  bottom: `
    top: auto;
    left: 0;
    bottom: 0;
    right: 0;
    height: auto;
    width: auto;
    max-height: 100%;
  `,
};

export const DrawerContainer = styled.aside<DrawerContainerProps>`
  position: fixed;
  top: 0;

  overflow-y: auto;
  outline: 0;
  z-index: 1;
  -webkit-overflow-scrolling: touch;

  display:flex;
  flex-direction: column;
  flex: 1 0 auto;

  /* min-height: 100vh; */
  height: 100%;
  width: 128px;

  background: white;

  ${({ anchor }): string => drawerDirections[anchor]}
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;

  height: ${spacings[5]};

  border-right-width: 1px;
  border-bottom-width: 1px;

  padding-left: ${spacings[1]};
  padding-right: ${spacings[1]};
`;

export const DrawerContent = styled.div`
  flex-grow: 1;

  border-right-width: 1px;
`;

export const DrawerTitle = styled.span`
  padding-top: ${spacings[1]};
  padding-bottom: ${spacings[1]};
`;
