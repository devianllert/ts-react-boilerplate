import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Button';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <Helmet>
        <title>{t('notFound.headTitle')}</title>
      </Helmet>

      <h1 className={styles.logo}>404</h1>
      <h2 className={styles.title}>{t('notFound.title')}</h2>
      <span className={styles.subtitle}>{t('notFound.subtitle')}</span>

      <Button to="/">{t('notFound.button')}</Button>
    </div>
  );
};

export default NotFoundPage;
