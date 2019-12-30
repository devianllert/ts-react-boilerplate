import {
  REPOS_TRIGGER,
  REPOS_REQUEST,
  REPOS_FAILURE,
  REPOS_SUCCESS,
  REPOS_FULFILL,
} from '../constants';
import {
  reposTrigger,
  reposRequest,
  reposFailure,
  reposSuccess,
  reposFulfill,
} from '../actions';

describe('Repos actions', (): void => {
  describe('reposTrigger', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: REPOS_TRIGGER,
      };

      expect(reposTrigger()).toEqual(expected);
    });
  });

  describe('reposRequest', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: REPOS_REQUEST,
      };

      expect(reposRequest()).toEqual(expected);
    });
  });

  describe('reposFailure', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: REPOS_FAILURE,
        payload: Error(),
      };

      expect(reposFailure(Error())).toEqual(expected);
    });
  });

  describe('reposSuccess', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: REPOS_SUCCESS,
        payload: [1, 2, 3],
      };

      expect(reposSuccess([1, 2, 3])).toEqual(expected);
    });
  });

  describe('reposFulfill', (): void => {
    it('should return the corrent type', (): void => {
      const expected = {
        type: REPOS_FULFILL,
      };

      expect(reposFulfill()).toEqual(expected);
    });
  });
});
