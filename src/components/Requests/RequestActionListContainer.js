import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { actions } from '../../redux/modules/submission';
import * as constants from '../../constants';
import { RequestActionList } from './RequestActionList';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = {
  cloneSubmission: actions.cloneSubmission,
  deleteSubmission: actions.deleteSubmission,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('modalForm', 'setModalForm', null),
  withHandlers({
    addComment: props => () => props.setModalForm({
      formSlug: constants.COMMENT_FORM,
      kappSlug: constants.SERVICES_KAPP,
      completed: false,
      title: 'Add Comment',
      confirmationMessage: 'Your comment has been submitted.',
    }),
    requestToCancel: props => () => props.setModalForm({
      formSlug: constants.CANCEL_FORM,
      kappSlug: constants.SERVICES_KAPP,
      completed: false,
      title: 'Cancel Request',
      confirmationMessage: 'Your cancellation request has been received.',
    }),
    feedback: props => () => props.setModalForm({
      formSlug: constants.FEEDBACK_FORM,
      kappSlug: constants.ADMIN_KAPP,
      completed: false,
      title: 'Provide Feedback',
      confirmationMessage: 'Thanks for your feedback. We\'ll get that routed to the right team.',
    }),
    cloneAsDraft: props => () => props.cloneSubmission(props.submission.id),
    cancel: props => () => props.deleteSubmission(props.submission.id),
    handleCompleted: props => () => props.setModalForm({
      ...props.modalForm,
      completed: true,
    }),
    handleDismissed: props => event => {
      if (event) event.stopPropagation();
      props.setModalForm(null);
    },
  }),
);

export const RequestActionListContainer = enhance(RequestActionList);
