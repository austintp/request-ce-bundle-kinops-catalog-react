import { connect } from 'react-redux';
import { Category } from './Category';

const mapStateToProps = (state, props) => ({
  category:
    state.categories.data
      .filter(category => category.slug === props.match.params.categorySlug)
      .first(),
  forms:
    state.forms.data
      .filter(form => form.categories.indexOf(props.match.params.categorySlug) > -1),
});

export const CategoryContainer = connect(mapStateToProps)(Category);
