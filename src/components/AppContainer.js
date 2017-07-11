import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../styles/master.css';
import { CatalogContainer } from './CatalogContainer';
import { CategoryListContainer } from './Services/CategoryListContainer';
import { CategoryContainer } from './Services/CategoryContainer';
import { CatalogSearchResultsContainer } from '../components/Services/CatalogSearchResultsContainer';
import { actions as categoriesActions } from '../redux/modules/categories';
import { actions as formsActions } from '../redux/modules/forms';
import { actions as profileActions } from '../redux/modules/profile';
import { actions as submissionsActions } from '../redux/modules/submissions';
import { MyRequestsContainer } from './Requests/MyRequestsContainer';

const mapStateToProps = ({ categories, forms, profile, submissions }) => ({
  loading: categories.loading || forms.loading || profile.loading || submissions.loading,
  errors: [...categories.errors, ...forms.errors, ...profile.errors, ...submissions.errors],
});

const mapDispatchToProps = {
  fetchCategories: categoriesActions.fetchCategories,
  fetchForms: formsActions.fetchForms,
  fetchProfile: profileActions.fetchProfile,
  fetchSubmissions: submissionsActions.fetchSubmissions,
};

export const App = props => {
  if (props.loading) {
    return <div>Loading catalog data...</div>;
  } else if (props.errors.length > 0) {
    return <div>Error loading catalog data.</div>;
  }
  return (
    <div className="layout">
      <Route exact path="/" component={CatalogContainer} />
      <Route exact path="/categories" component={CategoryListContainer} />
      <Route exact path="/categories/:categorySlug" component={CategoryContainer} />
      <Route exact path="/search" component={CatalogSearchResultsContainer} />
      <Route exact path="/requests" component={MyRequestsContainer} />
      <Route path="/requests/:mode" component={MyRequestsContainer} />
    </div>
  );
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.fetchCategories();
      this.props.fetchForms();
      this.props.fetchProfile();
      this.props.fetchSubmissions();
    },
  }),
);

export const AppContainer = enhance(App);
