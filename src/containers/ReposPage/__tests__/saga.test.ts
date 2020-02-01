import {
  put,
  takeLatest,
  PutEffect,
  CallEffect,
} from 'redux-saga/effects';

import {
  ReposFulfill,
  ReposRequest,
  ReposSuccess,
  ReposFailure,
} from '../types';
import { Repo } from '../../../services/repos.service';

import { REPOS_TRIGGER } from '../constants';
import { reposSuccess, reposFailure } from '../actions';

import reposData, { getRepos } from '../saga';

describe('getRepos Saga', () => {
  let getReposGenerator: Generator<
  | PutEffect<ReposRequest>
  | CallEffect<Repo[]>
  | PutEffect<ReposSuccess>
  | PutEffect<ReposFailure>
  | PutEffect<ReposFulfill>,
  void,
  unknown
  >;

  let selectDescriptor: any;
  let callDescriptor: any;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos({ type: 'boilerplate/Repos/REPOS_TRIGGER', payload: 'name' });

    selectDescriptor = getReposGenerator.next().value;

    callDescriptor = getReposGenerator.next().value;
  });

  it('should match the snapshot', () => {
    expect(selectDescriptor).toMatchSnapshot();

    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [
      {
        id: 1,
        name: 'First repo',
      },
      {
        id: 2,
        name: 'Second repo',
      },
    ];

    const putDescriptor = getReposGenerator.next(response).value;

    expect(putDescriptor).toEqual(put(reposSuccess(response)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');

    const putDescriptor = getReposGenerator.throw(response).value;

    expect(putDescriptor).toEqual(put(reposFailure(response)));
  });
});

describe('reposDateSaga Saga', () => {
  const reposDateSaga = reposData();

  it('should start task to watch for REPOS_TRIGGER action', () => {
    const takeLatestDescriptor = reposDateSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(REPOS_TRIGGER, getRepos));
  });
});
