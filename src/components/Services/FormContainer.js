import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose, withHandlers, withState } from 'recompose';
import { Form } from './Form';

export const mapStateToProps = (state, { match: { params } }) =>
  ({
    category: params.categorySlug
      ? state.categories.data.find(category => category.slug === params.categorySlug)
      : null,
    form: state.forms.data.find(form => form.slug === params.formSlug),
    submissionLabel: params.submissionId ? (
      state.submissions.data
        .filter(submission => submission.id === params.submissionId)
        .map(submission => submission.label)
        .first()
    ) : (
      null
    ),
  });

export const getSubmissionId = props =>
  props.match.isExact
    ? props.match.params.submissionId
    : props.location.pathname.replace(props.match.url, '').replace('/', '');

export const mapDispatchToProps = { push };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('submissionId', '_', getSubmissionId),
  withHandlers({
    handleCompleted: props => response => {
      props.push(`/requests/${response.submission.id}/confirmation`);
    },
    handleCreated: props => response => {
      props.push(
        response.submission.coreState === 'Submitted'
          ? `/requests/${response.submission.id}/confirmation`
          : `${props.match.url}/${response.submission.id}`,
      );
    },
  }),
);

export const FormContainer = enhance(Form);
