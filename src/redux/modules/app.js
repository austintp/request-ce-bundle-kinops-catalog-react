import { getAttributeValue, getTeams, isMemberOf } from '../../helpers/utils';

/* TYPES */
export const types = {
  SET_APP_STATE: '@kd/catalog/SET_APP_STATE',
};

/* ACTIONS */
export const actions = {
  setAppState: state => ({ type: types.SET_APP_STATE, payload: state }),
};

/* DEFAULT STATE */
export const defaultState = {};

const selectKappBySpaceAttribute = (state, slugAttributeName) =>
  !state.space.loading ?
    state.space.data.kapps
      .find(kapp => kapp.slug === getAttributeValue(slugAttributeName, state.space.data))
  : null;

/* SPECIAL APP SELECTORS */
const selectHasRoleDataAdmin = state => !state.me.loading ? isMemberOf(state.me.data, 'Role::Data Admin') : false;
const selectHasRoleSubmissionSupport = state => !state.me.loading ? isMemberOf(state.me.data, 'Role::Submission Support') : false;
const selectHasAccessToManagement = state =>
  !state.me.loading ?
    state.me.data.spaceAdmin || selectHasRoleDataAdmin(state) || getTeams(state.me.data).length > 0
  : false;
const selectHasAccessToSupport = state =>
  !state.me.loading ? (state.me.data.spaceAdmin || selectHasRoleSubmissionSupport(state)) : false;
const selectAdminKapp = state => selectKappBySpaceAttribute(state, 'Admin Kapp Slug');
const selectCatalogKapp = state => selectKappBySpaceAttribute(state, 'Catalog Kapp Slug');
const selectQueueKapp = state => selectKappBySpaceAttribute(state, 'Queue Kapp Slug');
const selectTeamsKapp = state => selectKappBySpaceAttribute(state, 'Teams Kapp Slug');
const selectPredefinedKapps = state =>
  !state.space.loading ? [selectTeamsKapp(state), selectCatalogKapp(state), selectQueueKapp(state)]
    .filter(kapp => kapp != null)
    : [];
const selectAdditionalKapps = state =>
  !state.space.loading ? (state.space.data.kapps.filter(kapp =>
    kapp !== selectAdminKapp(state) && !selectPredefinedKapps(state).includes(kapp))) : [];

export const selectors = {
  hasRoleDataAdmin: selectHasRoleDataAdmin,
  hasRoleSubmissionSupport: selectHasRoleSubmissionSupport,
  hasAccessToManagement: selectHasAccessToManagement,
  hasAccessToSupport: selectHasAccessToSupport,
  adminKapp: selectAdminKapp,
  catalogKapp: selectCatalogKapp,
  queueKapp: selectQueueKapp,
  teamsKapp: selectTeamsKapp,
  predefinedKapps: selectPredefinedKapps,
  additionalKapps: selectAdditionalKapps,
};

/* APP REDUCER */
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_APP_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
