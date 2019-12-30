import { selectCounter, makeSelectCount } from '../selectors';

describe('Counter selectors', () => {
  describe('selectCounter', (): void => {
    it('should select the counter state', (): void => {
      const counterState = {
        count: 0,
      };

      const mockedState: AppState = {
        counter: counterState,
        router: null,
      };

      expect(selectCounter(mockedState)).toEqual(counterState);
    });
  });

  describe('makeSelectCount', (): void => {
    const countSelector = makeSelectCount();

    it('should select the count', (): void => {
      const count = 15;
      const mockedState: AppState = {
        counter: {
          count,
        },
        router: null,
      };

      expect(countSelector(mockedState)).toEqual(count);
    });
  });
});
