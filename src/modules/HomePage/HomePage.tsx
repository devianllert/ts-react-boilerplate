import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import Typography from '../../components/Typography';
import Container from '../../components/Container';

const HomePage = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('HOME_TITLE')}</title>
      </Helmet>

      <Container>
        <Typography variant="h1" align="center" gutterBottom>Home</Typography>
        <Typography variant="h2" align="center" paragraph>React typescript boilerplate</Typography>
      </Container>
    </>
  );
};

export default HomePage;
