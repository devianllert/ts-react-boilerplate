import {
  ReposRequest,
  ReposSuccess,
  ReposFailure,
  ReposFulfill,
  ReposTrigger,
} from './types';
import {
  REPOS_REQUEST,
  REPOS_FAILURE,
  REPOS_SUCCESS,
  REPOS_FULFILL,
  REPOS_TRIGGER,
} from './constants';
import { Repo } from '../../services/repos.service';

const reposTrigger = (): ReposTrigger => ({
  type: REPOS_TRIGGER,
});

const reposRequest = (): ReposRequest => ({
  type: REPOS_REQUEST,
});

const reposSuccess = (data: Repo[]): ReposSuccess => ({
  type: REPOS_SUCCESS,
  payload: data,
});

const reposFailure = (error: Error): ReposFailure => ({
  type: REPOS_FAILURE,
  payload: error,
});

const reposFulfill = (): ReposFulfill => ({
  type: REPOS_FULFILL,
});

export {
  reposTrigger,
  reposRequest,
  reposSuccess,
  reposFailure,
  reposFulfill,
};
