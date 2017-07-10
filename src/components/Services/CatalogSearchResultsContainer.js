import { connect } from 'react-redux';
import { parse } from 'query-string';
import { CatalogSearchResults } from './CatalogSearchResults';

const matches = (form, term) =>
  form.name.toLowerCase().includes(term.toLowerCase()) ||
  (form.description && form.description.toLowerCase().includes(term.toLowerCase()));

const stateMapper = (state, props) => {
  const query = parse(props.location.search).q;
  return {
    query,
    forms: state.catalog.get('forms').filter(form => matches(form, query)),
  };
};

export const CatalogSearchResultsContainer = connect(stateMapper)(CatalogSearchResults);
