import { createSelector, OutputSelector } from 'reselect';

import { initialState } from './reducer';
import { Repo } from '../../services/repos.service';

type ReposState = import('./types').ReposState;

const selectRepos = (state: AppState): ReposState => state.repos || initialState;

const makeSelectReposData = (): OutputSelector<AppState, Repo[], (res: ReposState) => Repo[]> => createSelector(
  selectRepos,
  (repos): Repo[] => repos.data,
);

export { selectRepos, makeSelectReposData };
