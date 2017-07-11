import { connect } from 'react-redux';
import { CategoryList } from './CategoryList';

const mapStateToProps = state => ({
  categories: state.categories.data,
  forms: state.forms.data,
});

export const CategoryListContainer = connect(mapStateToProps)(CategoryList);
