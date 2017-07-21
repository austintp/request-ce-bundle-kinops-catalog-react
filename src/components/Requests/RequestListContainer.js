import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';
import { RequestList } from './RequestList';
import { actions } from '../../redux/modules/submissionCounts';

const mapStateToProps = (state, props) => ({
  forms: state.forms.data,
  submissions: state.submissions.data,
  mode: props.match.params.mode,
  counts: state.submissionCounts.data,
});

const mapDispatchToProps = {
  fetchSubmissionCounts: actions.fetchSubmissionCounts,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.fetchSubmissionCounts();
    },
  }),
  withState('mode', 'setMode', null),
);

export const RequestListContainer = enhance(RequestList);
