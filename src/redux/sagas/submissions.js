import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { bundle, SubmissionsAPI } from 'react-kinetic-core';

import { SERVICES_KAPP as kappSlug } from '../../constants';
import { actions, types } from '../modules/submissions';
import { actions as systemErrorActions } from '../modules/systemError';

export function* fetchSubmissionsSaga() {
  const search =
    new SubmissionsAPI.SubmissionSearch()
      .eq('values[Requested By]', bundle.identity())
      .includes(['details', 'values', 'form'])
      .build();

  const { submissions, errors, serverError } =
    yield call(SubmissionsAPI.searchSubmissions, { search, kapp: kappSlug });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else if (errors) {
    yield put(actions.setSubmissionsErrors(errors));
  } else {
    yield put(actions.setSubmissions(submissions));
  }
}

export function* watchSubmissions() {
  yield takeEvery(types.FETCH_SUBMISSIONS, fetchSubmissionsSaga);
}
