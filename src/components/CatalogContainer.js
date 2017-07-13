import { connect } from 'react-redux';
import { Catalog } from './Catalog';

const stateMapper = state => ({
  profile: state.profile.data,
  categories: state.categories.data,
  forms: state.forms.data,
  submissions: state.submissions.data,
});

export const CatalogContainer = connect(stateMapper)(Catalog);