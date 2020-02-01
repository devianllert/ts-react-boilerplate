import { takeLatest, put, call } from 'redux-saga/effects';

import {
  reposRequest,
  reposSuccess,
  reposFailure,
  reposFulfill,
} from './actions';
import { REPOS_TRIGGER } from './constants';
import { ReposTrigger } from './types';

import { fetchRepos } from '../../services/repos.service';

export function* getRepos(action: ReposTrigger) {
  try {
    yield put(reposRequest());

    const data = yield call(fetchRepos, action.payload);

    yield put(reposSuccess(data));
  } catch (err) {
    yield put(reposFailure(err));
  } finally {
    yield put(reposFulfill());
  }
}

export default function* reposData() {
  yield takeLatest(REPOS_TRIGGER, getRepos);
}
