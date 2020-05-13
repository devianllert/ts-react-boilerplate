import React, { ReactNode, ReactElement } from 'react';

import Container from '../../components/Container';
import Hidden from '../../components/Hidden';

import Picture from './Picture';
import Header from './Header';
import Footer from './Footer';

import * as S from './styled';

interface Props {
  children: ReactNode;
}

const AuthLayout = (props: Props): ReactElement => {
  const { children } = props;

  return (
    <S.Layout>
      <S.HalfBox>
        {/* !TODO: Rewrite Container wrapper */}
        <Container style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />

          <S.Main>
            {children}
          </S.Main>

          <Footer />
        </Container>
      </S.HalfBox>

      <Hidden breakpoint="tablet">
        <S.HalfBox>
          <Picture />
        </S.HalfBox>
      </Hidden>
    </S.Layout>
  );
};

export default AuthLayout;
