import { Reducer } from 'redux';

import { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_CLEAR } from './constants';
import { CounterState, CounterActions } from './types';

const initialState: CounterState = {
  count: 0,
};

const counterReducer: Reducer<CounterState, CounterActions> = (state = initialState, action): CounterState => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case COUNTER_DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case COUNTER_CLEAR:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

export default counterReducer;
