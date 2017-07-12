import { connect } from 'react-redux';
import { Form } from './Form';

export const mapStateToProps = (state, { match: { params } }) =>
  ({
    category: params.categorySlug
      ? state.categories.data.find(category => category.slug === params.categorySlug)
      : null,
    form: state.forms.data.find(form => form.slug === params.formSlug),
  });

export const FormContainer = connect(mapStateToProps)(Form);
