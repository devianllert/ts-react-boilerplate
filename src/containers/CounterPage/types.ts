export interface CounterState {
  count: number;
}

export interface CounterIncrement {
  type: 'boilerplate/Counter/COUNTER_INCREMENT';
}

export interface CounterDecrement {
  type: 'boilerplate/Counter/COUNTER_DECREMENT';
}

export interface CounterClear {
  type: 'boilerplate/Counter/COUNTER_CLEAR';
}

export type CounterActions = CounterIncrement | CounterDecrement | CounterClear;
