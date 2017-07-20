import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { SubmissionsAPI } from 'react-kinetic-core';
import { Map, Seq } from 'immutable';
import { push } from 'connected-react-router';

import { actions, types } from '../modules/submission';
import { actions as systemErrorActions } from '../modules/systemError';

export function* fetchSubmissionSaga(action) {
  const { submission, errors, serverError } =
    yield call(SubmissionsAPI.fetchSubmission, { id: action.payload });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else if (errors) {
    yield put(actions.setSubmissionErrors(errors));
  } else {
    yield put(actions.setSubmissions(submission));
  }
}

export function* cloneSubmissionSaga(action) {
  const include = 'details,values,form,form.fields.details,form.kapp';
  const { submission, errors, serverError } =
    yield call(SubmissionsAPI.fetchSubmission, { id: action.payload, include });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else if (errors) {
    yield put(actions.cloneSubmissionErrors(errors));
  } else {
    // The values of attachment fields cannot be cloned so we will filter them out
    // of the values POSTed to the new submission.
    const attachmentFields = Seq(submission.form.fields)
      .filter(field => field.dataType === 'file')
      .map(field => field.name)
      .toSet();

    // Some values on the original submission should be reset.
    const overrideFields = Map({
      Status: 'Draft', 'Discussion Id': null, Observers: [],
    });

    // Copy the values from the original submission with the transformations
    // described above.
    const values = Seq(submission.values)
      .filter((value, fieldName) => !attachmentFields.contains(fieldName))
      .map((value, fieldName) => overrideFields.get(fieldName) || value)
      .toJS();

    // Make the call to create the clone.
    const { submission: cloneSubmission, postErrors, postServerError } =
      yield call(SubmissionsAPI.createSubmission, {
        kappSlug: submission.form.kapp.slug,
        formSlug: submission.form.slug,
        values,
        completed: false,
      });

    if (postServerError) {
      yield put(systemErrorActions.setSystemError(serverError));
    } else if (postErrors) {
      yield put(actions.cloneSubmissionErrors(postErrors));
    } else {
      yield put(actions.cloneSubmissionSuccess());
      yield put(push(`/requests/${cloneSubmission.id}`));
    }
  }
}

export function* deleteSubmissionSaga(action) {
  const { errors, serverError } =
    yield call(SubmissionsAPI.deleteSubmission, { id: action.payload });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else if (errors) {
    yield put(actions.deleteSubmissionErrors(errors));
  } else {
    yield put(actions.deleteSubmissionSuccess());
  }
}

export function* watchSubmission() {
  yield takeEvery(types.FETCH_SUBMISSION, fetchSubmissionSaga);
  yield takeEvery(types.CLONE_SUBMISSION, cloneSubmissionSaga);
  yield takeEvery(types.DELETE_SUBMISSION, deleteSubmissionSaga);
}