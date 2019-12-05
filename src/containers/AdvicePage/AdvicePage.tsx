import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useAsync } from 'react-essential-tools';

import { fetchAdvice, Advice } from '../../services/advice.service';

import Button from '../../components/Button';

import styles from './AdvicePage.module.scss';

const AdvicePage = (): ReactElement => {
  const { t } = useTranslation();

  const [advice, fetch] = useAsync(async (): Promise<Advice> => {
    const newAdvice = await fetchAdvice();

    return newAdvice;
  });

  return (
    <>
      <Helmet>
        <title>{t('advice.headTitle')}</title>
      </Helmet>

      <div className={styles.content}>
        {advice.pending && <div>Loading...</div>}

        {(advice.error && !advice.pending) && (
          <div>
            Error:
            {advice.error.message}
          </div>
        )}

        {(advice.result && !advice.pending) && <div>{advice.result.slip.advice}</div>}

        <Button onClick={fetch}>{t('advice.button')}</Button>
      </div>
    </>
  );
};

export default AdvicePage;
