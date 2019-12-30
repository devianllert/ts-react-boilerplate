import { Repo } from '../../services/repos.service';

export interface ReposState {
  data: Repo[];
  loading: boolean;
  error?: Error;
}

export interface ReposTrigger {
  type: 'boilerplate/Repos/REPOS_TRIGGER';
}

export interface ReposRequest {
  type: 'boilerplate/Repos/REPOS_REQUEST';
}

export interface ReposSuccess {
  type: 'boilerplate/Repos/REPOS_SUCCESS';
  payload: Repo[];
}

export interface ReposFailure {
  type: 'boilerplate/Repos/REPOS_FAILURE';
  payload: Error;
}

export interface ReposFulfill {
  type: 'boilerplate/Repos/REPOS_FULFILL';
}

export type ReposActions = ReposTrigger | ReposRequest | ReposSuccess | ReposFailure | ReposFulfill;
