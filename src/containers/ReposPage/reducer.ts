import { Reducer } from 'redux';

import { ReposState, ReposActions } from './types';
import {
  REPOS_REQUEST,
  REPOS_FAILURE,
  REPOS_SUCCESS,
  REPOS_FULFILL,
} from './constants';

export const initialState: ReposState = {
  data: [],
  loading: false,
};

const reposReducer: Reducer<ReposState, ReposActions> = (state = initialState, action): ReposState => {
  switch (action.type) {
    case REPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REPOS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case REPOS_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
      };

    case REPOS_FULFILL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reposReducer;
