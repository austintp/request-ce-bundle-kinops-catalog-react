import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { FormsAPI } from 'react-kinetic-core';

import { kappSlug } from '../../constants';
import { actions, types } from '../modules/forms';
import { actions as systemErrorActions } from '../modules/systemError';

export function* fetchFormsSaga() {
  const { forms, errors, serverError } =
    yield call(FormsAPI.fetchForms, { kappSlug, include: 'categorizations,attributes' });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else if (errors) {
    yield put(actions.setFormsErrors(errors));
  } else {
    yield put(actions.setForms(forms));
  }
}

export function* watchForms() {
  yield takeEvery(types.FETCH_FORMS, fetchFormsSaga);
}
