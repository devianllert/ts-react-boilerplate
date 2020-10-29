import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { withKnobs, select } from '@storybook/addon-knobs';

import Drawer from '../Drawer';
import Button from '../../Button';

import media from '../../../design/media';
import { createTransition, easing, duration } from '../../../design/transitions';

export default {
  title: 'Components/Drawer',
  decorators: [withKnobs],
};

const PermanentDrawer = styled(Drawer)`
  width: 240px;
`;

const PersistentNav = styled.nav<{ isDrawerOpen: boolean }>`
  @media ${media.tablet.up} {
    width: ${({ isDrawerOpen }): string => (isDrawerOpen ? '240px' : '0')};
    transition: ${createTransition('width', { easing: easing.easeOut, duration: duration.enteringScreen })};
    flex-shrink: 0;
  }
`;

const Main = styled.section`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Content = styled.main`
  display: flex;
  flex-grow: 1;

  padding: 24px;
`;

const Nav = styled.nav`
  @media ${media.tablet.up} {
    width: 240px;
    flex-shrink: 0;
  }
`;

export const Temporary = (): ReactElement => {
  const [open, setOpened] = React.useState(false);

  const handleOpen = (): void => {
    setOpened(true);
  };

  const handleClose = (): void => {
    setOpened(false);
  };

  return (
    <>
      <Button type="button" onClick={open ? handleClose : handleOpen}>
        {open ? 'close' : 'open'}
      </Button>

      <Drawer
        isOpen={open}
        onClose={handleClose}
      />
    </>
  );
};

export const Permanent = (): ReactElement => {
  const [open, setOpened] = React.useState(false);

  const handleOpen = (): void => {
    setOpened(true);
  };

  const handleClose = (): void => {
    setOpened(false);
  };

  return (
    <Main>
      <Nav>
        <PermanentDrawer
          variant="permanent"
          isOpen={open}
          onClose={handleClose}
        />
      </Nav>

      <Content>
        <Button type="button" onClick={open ? handleClose : handleOpen}>
          {open ? 'close' : 'open'}
        </Button>
      </Content>
    </Main>
  );
};

export const Persistent = (): ReactElement => {
  const [open, setOpened] = React.useState(true);

  const handleOpen = (): void => {
    setOpened(true);
  };

  const handleClose = (): void => {
    setOpened(false);
  };

  return (
    <Main>
      <PersistentNav isDrawerOpen={open}>
        <PermanentDrawer
          variant="persistent"
          isOpen={open}
          onClose={handleClose}
        />
      </PersistentNav>

      <Content>
        <Button type="button" onClick={open ? handleClose : handleOpen}>
          {open ? 'close' : 'open'}
        </Button>
      </Content>
    </Main>
  );
};

export const WithAnchor = (): ReactElement => {
  const [open, setOpened] = React.useState(false);

  const handleOpen = (): void => {
    setOpened(true);
  };

  const handleClose = (): void => {
    setOpened(false);
  };

  return (
    <>
      <Button type="button" onClick={open ? handleClose : handleOpen}>
        {open ? 'close' : 'open'}
      </Button>

      <Drawer
        anchor={select('anchor', {
          left: 'left',
          right: 'right',
          top: 'top',
          bottom: 'bottom',
        }, 'left')}
        isOpen={open}
        onClose={handleClose}
      />
    </>
  );
};
