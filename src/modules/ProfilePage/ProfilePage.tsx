import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Skeleton } from 'react-essential-tools';

import { getMe } from '../../services/users.service';

import useRouter from '../../hooks/useRouter';
import useAuth from '../../hooks/useAuth';

import Typography from '../../components/Typography';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Box from '../../components/Box';

const ProfilePage = (): ReactElement => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { logout } = useAuth();
  const { data, status } = useQuery('users/me', getMe);

  const logoutWithRedirect = async (): Promise<void> => {
    await logout();

    push('/');
  };

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
        {status === 'loading' && (
          <Skeleton width={80} />
        )}
        {status === 'success' && (
          <Typography>
            {data?.username}
          </Typography>
        )}

        <Button onClick={logoutWithRedirect}>Logout</Button>
      </Box>
    </>
  );
};

export default ProfilePage;
