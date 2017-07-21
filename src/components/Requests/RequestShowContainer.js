import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { actions } from '../../redux/modules/submission';
import { RequestShow } from './RequestShow';

export const mapStateToProps = state => ({
  submission: state.submission.data,
});

export const mapDispatchToProps = {
  clearSubmission: actions.clearSubmission,
  fetchSubmission: actions.fetchSubmission,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.fetchSubmission(this.props.match.params.submissionId);
    },
    componentWillUnmount() {
      this.props.clearSubmission();
    },
  }),
);

export const RequestShowContainer = enhance(RequestShow);
