import React, { ReactNode, ReactElement } from 'react';

interface Props {
  children: ReactNode;
}

const MainLayout = (props: Props): ReactElement => {
  const { children } = props;

  return <>{children}</>;
};

export default MainLayout;
