import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { bundle, SubmissionsAPI } from 'react-kinetic-core';

import * as constants from '../../constants';
import { actions, types } from '../modules/submissions';
import { actions as systemErrorActions } from '../modules/systemError';

export function* fetchSubmissionsSaga({ payload: { coreState, pageToken } }) {
  const kapp = constants.SERVICES_KAPP;
  const searchBuilder =
    new SubmissionsAPI.SubmissionSearch()
      .type(constants.SUBMISSION_FORM_TYPE)
      .limit(constants.PAGE_SIZE)
      .includes(['details', 'values', 'form', 'form.attributes', 'form.kapp',
        'form.kapp.attributes', 'form.kapp.space.attributes'])
      .or()
        .eq(`values[${constants.REQUESTED_FOR_FIELD}]`, bundle.identity())
        .eq('submittedBy', bundle.identity())
      .end();
  // Add some of the optional parameters to the search
  if (coreState) searchBuilder.coreState(coreState);
  if (pageToken) searchBuilder.pageToken(pageToken);
  const search = searchBuilder.build();

  const { submissions, serverError } =
    yield call(SubmissionsAPI.searchSubmissions, { search, kapp });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else {
    yield put(actions.setSubmissions(submissions));
  }
}

export function* watchSubmissions() {
  yield takeEvery(types.FETCH_SUBMISSIONS, fetchSubmissionsSaga);
}
