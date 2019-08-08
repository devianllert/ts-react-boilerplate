import React, { Fragment, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { makeSelectCount } from './selectors';

import { counterIncrement, counterDecrement } from './actions';

import Button from '../../components/Button';

interface StateToProps {
  count: number;
}

interface DispatchToProps {
  increment: () => import('./types').CounterIncrement;
  decrement: () => import('./types').CounterDecrement;
}

type Props = StateToProps & DispatchToProps & {};

const Counter = ({ count, increment, decrement }: Props): ReactElement => (
  <Fragment>
    <Helmet>
      <title>Counter</title>
    </Helmet>

    <div>
      <Button onClick={increment}>+</Button>
      <span>{count}</span>
      <Button onClick={decrement}>-</Button>
    </div>
  </Fragment>
);

const mapStateToProps = createStructuredSelector<AppState, StateToProps>({
  count: makeSelectCount(),
});

const mapDispatchToProps: DispatchToProps = {
  increment: counterIncrement,
  decrement: counterDecrement,
};

export default connect<StateToProps, DispatchToProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Counter);
