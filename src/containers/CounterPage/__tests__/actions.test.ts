import { COUNTER_INCREMENT, COUNTER_DECREMENT, COUNTER_CLEAR } from '../constants';
import { counterIncrement, counterDecrement, counterClear } from '../actions';

describe('Counter actions', (): void => {
  describe('counterIncrement', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: COUNTER_INCREMENT,
      };

      expect(counterIncrement()).toEqual(expected);
    });
  });

  describe('counterDecrement', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: COUNTER_DECREMENT,
      };

      expect(counterDecrement()).toEqual(expected);
    });
  });

  describe('counterClear', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: COUNTER_CLEAR,
      };

      expect(counterClear()).toEqual(expected);
    });
  });
});
