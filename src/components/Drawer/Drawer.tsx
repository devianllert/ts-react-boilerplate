import React, { ReactElement, ReactNode } from 'react';

import {
  Modal,
  Backdrop,
  Slide,
  useMedia,
} from 'react-essential-tools';

import media, { Breakpoint } from '../../design/media';

import * as S from './styled';

type DrawerAnchor = 'bottom' | 'left' | 'right' | 'top';

interface DrawerProps {
  /**
   * The contents of the drawer.
   */
  children?: ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Side from which the drawer will appear.
   */
  anchor?: DrawerAnchor;
  /**
   * The variant to use.
   */
  variant?: 'permanent' | 'persistent' | 'temporary';
  /**
   * If `true`, the drawer is open.
   */
  isOpen?: boolean;
  /**
   * When drawer should be temporary
   */
  staticBreakpoint?: Breakpoint;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;
}

const oppositeDirection: Record<DrawerAnchor, 'down' | 'left' | 'right' | 'up'> = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

const Drawer = (props: DrawerProps): ReactElement | null => {
  const {
    children,
    className,
    variant = 'temporary',
    anchor = 'left',
    isOpen = false,
    staticBreakpoint = 'tablet',
    onClose,
  } = props;

  const visible = useMedia(media[staticBreakpoint].up);

  const drawer = (
    <S.DrawerContainer anchor={anchor} className={className}>
      {children}
    </S.DrawerContainer>
  );

  const slidingDrawer = (
    <Slide direction={oppositeDirection[anchor]} in={isOpen}>
      {drawer}
    </Slide>
  );

  if (variant === 'permanent' && visible) {
    return drawer;
  }

  if (variant === 'persistent' && visible) {
    return slidingDrawer;
  }

  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition BackdropComponent={Backdrop}>
      {slidingDrawer}
    </Modal>
  );
};

export default Drawer;
