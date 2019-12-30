import { createSelector, OutputSelector } from 'reselect';

import { initialState } from './reducer';

type CounterState = import('./types').CounterState;

const selectCounter = (state: AppState): CounterState => state.counter || initialState;

const makeSelectCount = (): OutputSelector<AppState, number, (res: CounterState) => number> => createSelector(
  selectCounter,
  (counter): number => counter.count,
);

export { selectCounter, makeSelectCount };
