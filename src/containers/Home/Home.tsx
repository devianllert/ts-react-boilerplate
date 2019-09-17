import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import styles from './Home.module.scss';

const Home = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('home.headTitle')}</title>
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.subtitle}>{t('home.subtitle')}</p>
      </div>
    </>
  );
};

export default Home;
