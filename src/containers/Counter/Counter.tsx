import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';

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
  useKey('ArrowUp', increment);
  useKey('ArrowDown', decrement);

  return (
    <>
      <Helmet>
        <title>Counter</title>
      </Helmet>

      <div className={styles.content}>
        <div className={styles.counter}>
          <Button onClick={increment}>+</Button>

          <span className={styles.count}>{count}</span>

          <Button onClick={decrement}>-</Button>
        </div>

        <div className={styles.info}>
          You can use Up and Down keyboard arrows for change value.
        </div>
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
