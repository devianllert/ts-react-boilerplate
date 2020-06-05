import React, { ReactNode, ReactElement } from 'react';

import Container from '../../components/Container';
import Hidden from '../../components/Hidden';

import Picture from './Picture';
import Header from './Header';
import Footer from './Footer';

import * as S from './styled';
import Grid from '../../components/Grid';

interface Props {
  children: ReactNode;
}

const AuthLayout = (props: Props): ReactElement => {
  const { children } = props;

  return (
    <Grid container>
      <Grid item mobile={12} laptop={6}>
        <Container style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />

          <S.Main>
            {children}
          </S.Main>

          <Footer />
        </Container>
      </Grid>

      <Hidden breakpoint="laptop">
        <Grid item laptop={6}>
          <Picture />

        </Grid>
      </Hidden>
    </Grid>
  );
};

export default AuthLayout;
