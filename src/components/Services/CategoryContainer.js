import { connect } from 'react-redux';
import { Category } from '../components/Category';

const stateMapper = (state, props) => ({
  category:
    state.catalog.get('categories')
      .filter(category => category.slug === props.match.params.categorySlug)
      .first(),
  forms:
    state.catalog.get('forms')
      .filter(form => form.categories.indexOf(props.match.params.categorySlug) > -1),
});

export const CategoryContainer = connect(stateMapper)(Category);
