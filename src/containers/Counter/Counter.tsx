import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

import { counterIncrement, counterDecrement } from './actions';

interface Props {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const Counter = ({ count, increment, decrement }: Props): ReactElement => (
  <div>
    <button type="button" onClick={increment}>+</button>
    {count}
    <button type="button" onClick={decrement}>-</button>
  </div>
);

const mapStateToProps = (state: any): any => ({
  count: state.counter.count,
});

const mapDispatchToProps = {
  increment: counterIncrement,
  decrement: counterDecrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
