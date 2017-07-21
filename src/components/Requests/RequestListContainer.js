import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { parse } from 'query-string';
import { RequestList } from './RequestList';
import { actions as submissionsActions } from '../../redux/modules/submissions';
import { actions as submissionCountsActions } from '../../redux/modules/submissionCounts';

const mapStateToProps = state => ({
  forms: state.forms.data,
  submissions: state.submissions.data,
  counts: state.submissionCounts.data,
});

const mapDispatchToProps = {
  fetchSubmissions: submissionsActions.fetchSubmissions,
  fetchSubmissionCounts: submissionCountsActions.fetchSubmissionCounts,
};

const parseModeParameter = location => {
  const params = parse(location.search);
  return (params.mode && params.mode.length > 0)
    ? params.mode
    : null;
};

const translateMode = mode => mode === 'Open' ? 'Submitted' : mode;

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    mode: parseModeParameter(props.location),
  })),
  lifecycle({
    componentWillMount() {
      this.props.fetchSubmissions(translateMode(this.props.mode));
      this.props.fetchSubmissionCounts();
    },
    componentWillUpdate(nextProps) {
      if (this.props.mode !== nextProps.mode) {
        this.props.fetchSubmissions(translateMode(nextProps.mode));
      }
    },
  }),
);

export const RequestListContainer = enhance(RequestList);
