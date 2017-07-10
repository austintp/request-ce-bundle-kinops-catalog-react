import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../styles/master.css';
import { CatalogContainer } from './CatalogContainer';
import { CategoryListContainer } from './Services/CategoryListContainer';
import { CategoryContainer } from './Services/CategoryContainer';
import { CatalogSearchResultsContainer } from '../components/Services/CatalogSearchResultsContainer';
import { actions } from '../redux/modules/catalog';
import { MyRequestsContainer } from './Requests/MyRequestsContainer';

const stateMapper = state => ({
  catalog: state.catalog,
});

const dispatchMapper = {
  fetchProfile: actions.fetchProfile,
  fetchCategories: actions.fetchCategories,
  fetchForms: actions.fetchForms,
  fetchSubmissions: actions.fetchSubmissions,
};

@connect(stateMapper, dispatchMapper)
export class AppContainer extends React.Component {
  componentWillMount() {
    this.props.fetchProfile().then(data => {
      this.props.fetchCategories();
      this.props.fetchForms();
      this.props.fetchSubmissions(data.payload.data.username);
    });
  }

  render() {
    if (this.props.catalog.get('pending')) {
      return <div>Loading catalog data...</div>;
    } else if (this.props.catalog.get('error')) {
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
  }
}
