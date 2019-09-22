import React, { useState, useEffect, ReactElement } from 'react';

import { fetchAdvice, Advice } from '../../services/advice.service';

import Button from '../../components/Button';

import styles from './AdvicePage.module.scss';

const AdvicePage = (): ReactElement => {
  const [advice, setAdvice] = useState<Advice>();

  const getNewAdvice = async (): Promise<void> => {
    const newAdvice = await fetchAdvice();

    setAdvice(newAdvice);
  };

  useEffect((): void => {
    getNewAdvice();
  }, []);

  return (
    <div className={styles.content}>
      {advice && (
        <div>{advice.slip.advice}</div>
      )}

      <Button onClick={getNewAdvice}>New Advice</Button>
    </div>
  );
};

export default AdvicePage;
