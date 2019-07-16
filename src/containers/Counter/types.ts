export interface CounterState {
  count: number;
}

export interface CounterIncrement {
  type: 'COUNTER_INCREMENT';
}

export interface CounterDecrement {
  type: 'COUNTER_DECREMENT';
}

export interface CounterClear {
  type: 'COUNTER_CLEAR';
}

export type CounterActions = CounterIncrement | CounterDecrement | CounterClear;
