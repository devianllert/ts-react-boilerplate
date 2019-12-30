import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useKey, Tooltip } from 'react-essential-tools';

import { CounterIncrement, CounterDecrement } from './types';

import { counterIncrement, counterDecrement } from './actions';
import { makeSelectCount } from './selectors';

import useInjectReducer from '../../hooks/useInjectReducer';

import reducer from './reducer';

import Button from '../../components/Button';

import styles from './CounterPage.module.scss';

const CounterPage = (): ReactElement => {
  useInjectReducer({ key: 'counter', reducer });

  const { t } = useTranslation();

  const counterCount = useSelector(makeSelectCount());
  const dispatch = useDispatch();

  const increment = (): CounterIncrement => dispatch(counterIncrement());
  const decrement = (): CounterDecrement => dispatch(counterDecrement());

  useKey('ArrowUp', increment);
  useKey('ArrowDown', decrement);

  return (
    <>
      <Helmet>
        <title>{t('counter.headTitle')}</title>
      </Helmet>

      <div className={styles.content}>
        <div className={styles.counter}>
          <Tooltip title="Decrement" placement="top">
            <Button onClick={decrement}>-</Button>
          </Tooltip>

          <span className={styles.count}>{counterCount}</span>

          <Tooltip title="Increment" placement="top">
            <Button onClick={increment}>+</Button>
          </Tooltip>
        </div>

        <div className={styles.info}>{t('counter.info')}</div>
      </div>
    </>
  );
};

export default CounterPage;
