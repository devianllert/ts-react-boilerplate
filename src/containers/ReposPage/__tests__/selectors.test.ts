import { selectRepos, makeSelectReposData } from '../selectors';

describe('Repos selectors', () => {
  describe('selectRepos', (): void => {
    it('should select the repos state', (): void => {
      const reposState = {
        data: [],
        loading: false,
      };

      const mockedState: AppState = {
        repos: reposState,
        router: null,
      };

      expect(selectRepos(mockedState)).toEqual(reposState);
    });
  });

  describe('makeSelectReposData', (): void => {
    const countSelector = makeSelectReposData();

    it('should select the data', (): void => {
      const data = [1, 2, 3];
      const reposState = {
        data,
        loading: false,
      };

      const mockedState: AppState = {
        repos: reposState,
        router: null,
      };

      expect(countSelector(mockedState)).toEqual(data);
    });
  });
});
