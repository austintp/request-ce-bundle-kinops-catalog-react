import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { parse } from 'query-string';
import { RequestList } from './RequestList';
import { actions } from '../../redux/modules/submissionCounts';

const mapStateToProps = state => ({
  forms: state.forms.data,
  submissions: state.submissions.data,
  counts: state.submissionCounts.data,
});

const mapDispatchToProps = {
  fetchSubmissionCounts: actions.fetchSubmissionCounts,
};

const parseModeParameter = location => {
  const params = parse(location.search);
  return (params.mode && params.mode.length > 0)
    ? params.mode
    : null;
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    mode: parseModeParameter(props.location),
  })),
  lifecycle({
    componentWillMount() {
      this.props.fetchSubmissionCounts();
    },
  }),
);

export const RequestListContainer = enhance(RequestList);
