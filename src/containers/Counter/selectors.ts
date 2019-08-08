import { createSelector, OutputSelector } from 'reselect';

type CounterState = import('./types').CounterState;

const selectCounter = (state: AppState): CounterState => state.counter;

const makeSelectCount = (): OutputSelector<AppState, number, (res: CounterState) => number> => createSelector(
  selectCounter,
  (counter): number => counter.count,
);

export { selectCounter, makeSelectCount };
