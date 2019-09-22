import counterReducer from '../reducer';
import { counterIncrement, counterDecrement, counterClear } from '../actions';

describe('Counter actions', (): void => {
  let state: import('../types').CounterState;

  beforeEach((): void => {
    state = {
      count: 0,
    };
  });

  it('should return the initial state', (): void => {
    const expected = state;

    expect(counterReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the counterIncrement action correctly', (): void => {
    const expected = {
      count: 1,
    };

    expect(counterReducer(state, counterIncrement())).toEqual(expected);
  });

  it('should handle the counterDecrement action correctly', (): void => {
    const expected = {
      count: -1,
    };

    expect(counterReducer(state, counterDecrement())).toEqual(expected);
  });

  it('should handle the counterClear action correctly', (): void => {
    const expected = {
      count: 0,
    };

    expect(counterReducer(state, counterClear())).toEqual(expected);
  });
});
