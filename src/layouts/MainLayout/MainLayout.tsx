import React, { ReactNode, ReactElement } from 'react';

import Drawer from '../../components/Drawer';

import * as S from './styled';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = (props: MainLayoutProps): ReactElement => {
  const { children } = props;

  const [open, setOpened] = React.useState(true);

  const handleClose = (): void => {
    setOpened(false);
  };

  return (
    <S.Main>
      <Drawer
        variant="persistent"
        isOpen={open}
        onClose={handleClose}
      />

      {children}
    </S.Main>
  );
};

export default MainLayout;
