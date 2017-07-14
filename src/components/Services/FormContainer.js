import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose, withHandlers } from 'recompose';
import { Form } from './Form';

export const mapStateToProps = (state, { match: { params } }) =>
  ({
    category: params.categorySlug
      ? state.categories.data.find(category => category.slug === params.categorySlug)
      : null,
    form: state.forms.data.find(form => form.slug === params.formSlug),
    submissionId: params.submissionId,
    submissionLabel:
      state.submissions.data
        .filter(submission => submission.id === params.submissionId)
        .map(submission => submission.label)
        .first(),
  });

export const mapDispatchToProps = { push };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleCompleted: props => (response, action) => {
      action.stop();
      props.push(`/requests/${response.submission.id}/confirmation`);
    },
    handleCreated: props => (response, action) => {
      action.stop();
      props.push(
        response.submission.coreState === 'Submitted'
          ? `/requests/${response.submission.id}/confirmation`
          : `${props.match.url}/${response.submission.id}`,
      );
    },
  }),
);

export const FormContainer = enhance(Form);
