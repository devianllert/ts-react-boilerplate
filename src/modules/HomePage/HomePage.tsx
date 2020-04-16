import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import Typography from '../../components/Typography';

const HomePage = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('HOME_TITLE')}</title>
      </Helmet>

      <div>
        <Typography variant="h1">Home</Typography>
      </div>
    </>
  );
};

export default HomePage;
