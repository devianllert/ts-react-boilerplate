import React, { ReactNode, ReactElement } from 'react';

import * as S from './styled';

interface Props {
  children: ReactNode;
}

const MainLayout = (props: Props): ReactElement => {
  const { children } = props;

  return <S.Main>{children}</S.Main>;
};

export default MainLayout;
