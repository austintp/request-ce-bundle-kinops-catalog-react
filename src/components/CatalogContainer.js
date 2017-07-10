import { connect } from 'react-redux';
import { Catalog } from './Catalog';

const stateMapper = state => ({
  profile: state.catalog.get('profile'),
  categories: state.catalog.get('categories'),
  forms: state.catalog.get('forms'),
  submissions: state.catalog.get('submissions'),
});

export const CatalogContainer = connect(stateMapper)(Catalog);
