export const types = {
  FETCH_ALERTS: '@kd/catalog/FETCH_ALERTS',
  SET_ALERTS: '@kd/catalog/SET_ALERTS',
  SET_ALERTS_ERROR: '@kd/catalog/SET_ALERTS_ERROR',
};

export const actions = {
  fetchAlerts: () => ({ type: types.FETCH_ALERTS }),
  setAlerts: alerts => ({ type: types.SET_ALERTS, payload: alerts }),
  setAlertsError: (error = true) => ({ type: types.SET_ALERTS_ERROR, payload: error }),
};

export const defaultState = {
  loading: true,
  error: false,
  data: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_ALERTS:
      return { loading: true, error: false, data: [] };
    case types.SET_ALERTS:
      return { ...state, loading: false, error: false, data: action.payload };
    case types.SET_ALERTS_ERROR:
      return { ...state, loading: false, error: action.payload, data: [] };
    default: return state;
  }
};

export default reducer;
