import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { MdBubbleChart } from 'react-icons/md';

import useAuth from '../../hooks/useAuth';

import Typography from '../../components/Typography';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Box from '../../components/Box';

const HomePage = (): ReactElement => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <Helmet>
        <title>{t('HOME_TITLE')}</title>
      </Helmet>

      <Box
        as={Container}
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography component="h1" variant="h4" gutterBottom>
          <MdBubbleChart />
          Reactive
        </Typography>

        {isAuthenticated ? (
          <div>
            <Button to="/users/me">Profile</Button>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div>
            <Button to="/login">Login</Button>
            <Button to="/signup">Sign up</Button>
          </div>
        )}
      </Box>
    </>
  );
};

export default HomePage;
