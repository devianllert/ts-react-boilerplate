import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';

import useKey from '../../hooks/useKey';

import { makeSelectCount } from './selectors';

import { counterIncrement, counterDecrement } from './actions';

import Button from '../../components/Button';

import styles from './Counter.module.scss';

interface StateToProps {
  count: number;
}

interface DispatchToProps {
  increment: () => import('./types').CounterIncrement;
  decrement: () => import('./types').CounterDecrement;
}

type Props = StateToProps & DispatchToProps & {};

const Counter = ({ count, increment, decrement }: Props): ReactElement => {
  const { t } = useTranslation();

  useKey('ArrowUp', increment);
  useKey('ArrowDown', decrement);

  return (
    <>
      <Helmet>
        <title>{t('counter.headTitle')}</title>
      </Helmet>

      <div className={styles.content}>
        <div className={styles.counter}>
          <Button onClick={decrement}>-</Button>

          <span className={styles.count}>{count}</span>

          <Button onClick={increment}>+</Button>
        </div>

        <div className={styles.info}>{t('counter.info')}</div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector<AppState, StateToProps>({
  count: makeSelectCount(),
});

const mapDispatchToProps: DispatchToProps = {
  increment: counterIncrement,
  decrement: counterDecrement,
};

export default connect<StateToProps, DispatchToProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
