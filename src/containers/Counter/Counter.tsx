import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

import { counterIncrement, counterDecrement } from './actions';

import Button from '../../components/Button';

interface Props {
  count: number;
  increment: () => import('./types').CounterIncrement;
  decrement: () => import('./types').CounterDecrement;
}

const Counter = ({ count, increment, decrement }: Props): ReactElement => (
  <div>
    <Button onClick={increment}>+</Button>
    <span>{count}</span>
    <Button onClick={decrement}>-</Button>
  </div>
);

const mapStateToProps = (state: any): any => ({
  count: state.counter.count,
});

const mapDispatchToProps = {
  increment: counterIncrement,
  decrement: counterDecrement,
};

export default connect<Props, typeof mapDispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(Counter);
