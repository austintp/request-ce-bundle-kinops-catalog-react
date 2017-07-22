import { List } from 'immutable';

export const types = {
  FETCH_SUBMISSIONS: '@kd/catalog/FETCH_SUBMISSIONS',
  SET_SUBMISSIONS: '@kd/catalog/SET_SUBMISSIONS',
};

export const actions = {
  fetchSubmissions: (coreState, pageToken) =>
    ({ type: types.FETCH_SUBMISSIONS, payload: { coreState, pageToken } }),
  setSubmissions: submissions =>
    ({ type: types.SET_SUBMISSIONS, payload: submissions }),
};

export const defaultState = {
  loading: true,
  data: List(),
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_SUBMISSIONS:
      return { ...state, loading: true };
    case types.SET_SUBMISSIONS:
      return { ...state, loading: false, data: List(action.payload) };
    default:
      return state;
  }
};

export default reducer;
