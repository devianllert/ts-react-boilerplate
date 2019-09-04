import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import useKey from '../../hooks/useKey';

import { makeSelectCount } from './selectors';

import { counterIncrement, counterDecrement } from './actions';

import MainLayout from '../../layout/MainLayout';

import Button from '../../components/Button';

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
    <MainLayout>
      <Helmet>
        <title>Counter</title>
      </Helmet>

      <div>
        <Button onClick={increment}>+</Button>
        <span>{count}</span>
        <Button onClick={decrement}>-</Button>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = createStructuredSelector<AppState, StateToProps>({
  count: makeSelectCount(),
});

const mapDispatchToProps: DispatchToProps = {
  increment: counterIncrement,
  decrement: counterDecrement,
};

export default connect<StateToProps, DispatchToProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Counter);
