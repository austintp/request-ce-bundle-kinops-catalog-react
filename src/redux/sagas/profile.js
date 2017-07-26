import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { actions, types } from '../modules/profile';
import { actions as systemErrorActions } from '../modules/systemError';

export function* fetchProfileSaga() {
  const include = 'attributes,profileAttributes';
  const { profile, errors, serverError } = yield call(CoreAPI.fetchProfile, { include });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else if (errors) {
    yield put(actions.setProfileErrors(errors));
  } else {
    yield put(actions.setProfile(profile));
  }
}

export function* watchProfile() {
  yield takeEvery(types.FETCH_PROFILE, fetchProfileSaga);
}
