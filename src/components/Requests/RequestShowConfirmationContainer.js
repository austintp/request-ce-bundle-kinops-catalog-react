import { compose, withHandlers, withState } from 'recompose';
import { RequetShowConfirmation } from './RequestShowConfirmation';

const enhance = compose(
  withState('feedbackOpen', 'setFeedbackOpen', false),
  withState('feedbackCompleted', 'setFeedbackCompleted', false),
  withHandlers({
    handleOpened: props => () => props.setFeedbackOpen(true),
    handleDismissed: props => event => {
      if (event) event.stopPropagation();
      props.setFeedbackOpen(false);
      props.setFeedbackCompleted(false);
    },
    handleCompleted: props => () => props.setFeedbackCompleted(true),
  }),
);

export const RequestShowConfirmationContainer = enhance(RequetShowConfirmation);
