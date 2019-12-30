import reposReducer from '../reducer';
import {
  reposTrigger,
  reposRequest,
  reposFailure,
  reposSuccess,
  reposFulfill,
} from '../actions';

describe('Repos actions', (): void => {
  let state: import('../types').ReposState;

  beforeEach((): void => {
    state = {
      data: [],
      loading: false,
    };
  });

  it('should return the initial state', (): void => {
    const expected = state;

    expect(reposReducer(undefined, {})).toEqual(expected);
  });

  it('should handle the reposTrigger action correctly', (): void => {
    const expected = {
      data: [],
      loading: false,
    };

    expect(reposReducer(state, reposTrigger())).toEqual(expected);
  });

  it('should handle the reposRequest action correctly', (): void => {
    const expected = {
      data: [],
      loading: true,
    };

    expect(reposReducer(state, reposRequest())).toEqual(expected);
  });

  it('should handle the reposSuccess action correctly', (): void => {
    const expected = {
      data: [1, 2, 3],
      loading: true,
    };

    const stateAfterRequest = reposReducer(state, reposRequest());

    expect(reposReducer(stateAfterRequest, reposSuccess([1, 2, 3]))).toEqual(expected);
  });

  it('should handle the reposFailure action correctly', (): void => {
    const expected = {
      data: [],
      loading: true,
      error: Error(),
    };

    const stateAfterRequest = reposReducer(state, reposRequest());

    expect(reposReducer(stateAfterRequest, reposFailure(Error()))).toEqual(expected);
  });

  it('should handle the reposFulfill action correctly', (): void => {
    const expected = {
      data: [],
      loading: false,
    };

    const stateAfterRequest = reposReducer(state, reposRequest());

    expect(reposReducer(stateAfterRequest, reposFulfill())).toEqual(expected);
  });
});
