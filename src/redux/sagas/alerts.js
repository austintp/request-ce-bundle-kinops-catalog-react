import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { types, actions } from '../modules/alerts';

export function* fetchAlertsSaga() {
  const search = new CoreAPI.SubmissionSearch()
          .eq('values[Status]', 'Active')
          .include('values')
          .limit(1000)
          .build();
  const { submissions, serverError } = yield call(CoreAPI.searchSubmissions, {
    kapp: 'admin',
    form: 'alerts',
    search,
  });

  if (serverError) {
    yield put(actions.setAlertsError());
  } else {
    yield put(actions.setAlerts(submissions));
  }
}

export function* watchAlerts() {
  yield takeEvery(types.FETCH_ALERTS, fetchAlertsSaga);
}
