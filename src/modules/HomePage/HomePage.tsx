import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

import { getMe } from '../../services/users.service';

import useAuth from '../../hooks/useAuth';

import Typography from '../../components/Typography';
import Container from '../../components/Container';
import Button from '../../components/Button';

const HomePage = (): ReactElement => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const { data } = useQuery(isAuthenticated && 'users/me', getMe, {
    retry: false,
  });

  return (
    <>
      <Helmet>
        <title>{t('HOME_TITLE')}</title>
      </Helmet>

      <Container>
        <Typography variant="h1" align="center" gutterBottom>Home</Typography>
        <Typography variant="h2" align="center" paragraph>React typescript boilerplate</Typography>

        {isAuthenticated && (
          <>
            <Typography>{data?.username}</Typography>
            <Button onClick={logout}>Logout</Button>
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
