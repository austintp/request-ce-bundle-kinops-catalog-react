import { List } from 'immutable';

export const types = {
  FETCH_SUBMISSIONS: '@kd/catalog/FETCH_SUBMISSIONS',
  SET_SUBMISSIONS: '@kd/catalog/SET_SUBMISSIONS',
  SET_SUBMISSIONS_ERRORS: '@kd/catalog/SET_SUBMISSIONS_ERRORS',
};

export const actions = {
  fetchSubmissions: () => ({ type: types.FETCH_SUBMISSIONS }),
  setSubmissions: submissions => ({ type: types.SET_SUBMISSIONS, payload: submissions }),
  setSubmissionsErrors: errors => ({ type: types.SET_SUBMISSIONS_ERRORS, payload: errors }),
};

export const defaultState = {
  loading: true,
  errors: [],
  data: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_SUBMISSIONS:
      return { ...state, loading: true, errors: [] };
    case types.SET_SUBMISSIONS:
      return { ...state, loading: false, errors: [], data: List(action.payload) };
    case types.SET_SUBMISSIONS_ERRORS:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export default reducer;
