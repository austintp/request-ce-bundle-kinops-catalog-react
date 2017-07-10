import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { stringify } from 'query-string';
import { CatalogSearch } from './CatalogSearch';
import { actions } from '../../redux/modules/catalog';

const stateMapper = state => ({
  searchTerm: state.catalog.get('searchTerm'),
  submitHandler: props => event => {
    event.preventDefault();
    props.push(`/search?${stringify({ q: props.searchTerm })}`);
  },
});

const dispatchMapper = { push, catalogSearchInput: actions.catalogSearchInput };

export const CatalogSearchContainer =
  connect(stateMapper, dispatchMapper)(CatalogSearch);
