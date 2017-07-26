import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { actions } from '../../redux/modules/submission';
import { actions as modalFormActions } from '../../redux/modules/modalForm';
import * as constants from '../../constants';
import { RequestActionList } from './RequestActionList';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = {
  cloneSubmission: actions.cloneSubmission,
  deleteSubmission: actions.deleteSubmission,
  openForm: modalFormActions.openForm,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    addComment: props => () => props.openForm(constants.COMMENT_FORM_CONFIG),
    requestToCancel: props => () => props.openForm(constants.CANCEL_FORM_CONFIG),
    feedback: props => () => props.openForm(constants.FEEDBACK_FORM_CONFIG),
    cloneAsDraft: props => () => props.cloneSubmission(props.submission.id),
    cancel: props => () => props.deleteSubmission(props.submission.id),
  }),
);

export const RequestActionListContainer = enhance(RequestActionList);
