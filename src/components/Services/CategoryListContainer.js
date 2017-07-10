import { connect } from 'react-redux';
import { CategoryList } from './CategoryList';

const stateMapper = state => ({
  categories: state.catalog.get('categories'),
  forms: state.catalog.get('forms'),
});

export const CategoryListContainer = connect(stateMapper)(CategoryList);
