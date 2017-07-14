import { connect } from 'react-redux';
import { RequestList } from './RequestList';

const mapStateToProps = (state, props) => ({
  forms: state.forms.data,
  submissions: state.submissions.data,
  mode: props.match.params.mode,
});

export const RequestListContainer = connect(mapStateToProps)(RequestList);
