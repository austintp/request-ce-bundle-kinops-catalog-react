export const types = {
  FETCH_PROFILE: '@kd/catalog/FETCH_PROFILE',
  SET_PROFILE: '@kd/catalog/SET_PROFILE',
  SET_PROFILE_ERRORS: '@kd/catalog/SET_PROFILE_ERRORS',
};

export const actions = {
  fetchProfile: () => ({ type: types.FETCH_PROFILE }),
  setProfile: profile => ({ type: types.SET_PROFILE, payload: profile }),
  setProfileErrors: errors => ({ type: types.SET_PROFILE_ERRORS, payload: errors }),
};

export const defaultState = {
  loading: true,
  errors: [],
  data: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE:
      return { ...state, loading: true, errors: [] };
    case types.SET_PROFILE:
      return { ...state, loading: false, errors: [], data: action.payload };
    case types.SET_PROFILE_ERRORS:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export default reducer;
