import { connect } from 'react-redux';
import { MyRequests } from './MyRequests';

const mapStateToProps = (state, props) => ({
  forms: state.forms.data,
  submissions: state.submissions.data,
  mode: props.match.params.mode,
});

export const MyRequestsContainer = connect(mapStateToProps)(MyRequests);
