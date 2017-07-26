import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import '../assets/styles';

import { actions as categoriesActions } from '../redux/modules/categories';
import { actions as formsActions } from '../redux/modules/forms';
import { actions as meActions } from '../redux/modules/me';
import { actions as spaceActions } from '../redux/modules/space';
import { actions as submissionsActions } from '../redux/modules/submissions';
import { selectors } from '../redux/modules/app';

import { AppFooter } from './app/AppFooter';
import { AppHeader } from './app/AppHeader';
import { AppHelpLink } from './app/AppHelpLink';
import { CatalogContainer } from './CatalogContainer';
import { CategoryListContainer } from './Services/CategoryListContainer';
import { CategoryContainer } from './Services/CategoryContainer';
import { CatalogSearchResultsContainer } from '../components/Services/CatalogSearchResultsContainer';
import { Loading } from './app/Loading';
import { FormContainer } from './Services/FormContainer';
import { ModalFormContainer } from './Shared/ModalFormContainer';
import { RequestListContainer } from './Requests/RequestListContainer';
import { RequestShowContainer } from './Requests/RequestShowContainer';

const mapStateToProps = state => {
  const { space, categories, forms, me, systemError } = state;
  return {
    space: space.data,
    profile: me.data,
    forms: forms.data,
    loading: categories.loading || forms.loading || me.loading || space.loading,
    errors: [...categories.errors, ...forms.errors],
    systemError,

    hasRoleDataAdmin: selectors.hasRoleDataAdmin(state),
    hasRoleSubmissionSupport: selectors.hasRoleSubmissionSupport(state),
    hasAccessToManagement: selectors.hasAccessToManagement(state),
    hasAccessToSupport: selectors.hasAccessToSupport(state),
    adminKapp: selectors.adminKapp(state),
    catalogKapp: selectors.catalogKapp(state),
    queueKapp: selectors.queueKapp(state),
    teamsKapp: selectors.teamsKapp(state),
    predefinedKapps: selectors.predefinedKapps(state),
    additionalKapps: selectors.additionalKapps(state),
  };
};

const mapDispatchToProps = {
  fetchSpace: spaceActions.fetchSpace,
  fetchCategories: categoriesActions.fetchCategories,
  fetchForms: formsActions.fetchForms,
  fetchProfile: meActions.fetchMe,
  fetchSubmissions: submissionsActions.fetchSubmissions,
};

export const App = props => {
  if (props.loading) {
    return <Loading text="App is loading ..." />;
  }
  return (
    <div className="view-port">
      <AppHeader {...props} />
      <AppHelpLink />
      <Route exact path="/" component={CatalogContainer} />
      <Route exact path="/categories" component={CategoryListContainer} />
      <Route exact path="/categories/:categorySlug" component={CategoryContainer} />
      <Route path="/categories/:categorySlug/:formSlug" component={FormContainer} />
      <Route path="/forms/:formSlug" component={FormContainer} />
      <Route exact path="/search" component={CatalogSearchResultsContainer} />
      <Route exact path="/requests" component={RequestListContainer} />
      <Route exact path="/requests/:submissionId" component={FormContainer} />
      <Route exact path="/requests/:submissionId/:mode" component={RequestShowContainer} />
      <ModalFormContainer />
      <AppFooter />
    </div>
  );
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.fetchSpace();
      this.props.fetchCategories();
      this.props.fetchForms();
      this.props.fetchProfile();
      this.props.fetchSubmissions();
    },
  }),
);

export const AppContainer = enhance(App);
