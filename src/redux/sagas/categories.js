import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { fetchCategories } from 'react-kinetic-core/src/apis/categories';

import { kappSlug } from '../../constants';
import { actions, types } from '../modules/categories';
import { actions as systemErrorActions } from '../modules/systemError';

export function* fetchCategoriesSaga() {
  const { categories, errors, serverError } =
    yield call(fetchCategories, { kappSlug, include: 'attributes' });

  if (serverError) {
    yield put(systemErrorActions.setSystemError(serverError));
  } else if (errors) {
    yield put(actions.setCategoriesErrors(errors));
  } else {
    yield put(actions.setCategories(categories));
  }
}

export function* watchCategories() {
  yield takeEvery(types.FETCH_CATEGORIES, fetchCategoriesSaga);
}
