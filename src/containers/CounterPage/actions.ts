import { CounterIncrement, CounterDecrement, CounterClear } from './types';
import { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_CLEAR } from './constants';

const counterIncrement = (): CounterIncrement => ({
  type: COUNTER_INCREMENT,
});

const counterDecrement = (): CounterDecrement => ({
  type: COUNTER_DECREMENT,
});

const counterClear = (): CounterClear => ({
  type: COUNTER_CLEAR,
});

export {
  counterIncrement,
  counterDecrement,
  counterClear,
};
