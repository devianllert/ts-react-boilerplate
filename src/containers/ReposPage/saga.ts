import { takeLatest, put, call } from 'redux-saga/effects';

import {
  reposRequest,
  reposSuccess,
  reposFailure,
  reposFulfill,
} from './actions';
import { REPOS_TRIGGER } from './constants';

import { fetchRepos } from '../../services/repos.service';

export function* getRepos() {
  try {
    yield put(reposRequest());

    const data = yield call(fetchRepos);

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
