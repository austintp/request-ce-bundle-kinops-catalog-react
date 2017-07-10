import { connect } from 'react-redux';
import { MyRequests } from './MyRequests';

const stateMapper = (state, props) => ({
  forms: state.catalog.get('forms'),
  submissions: state.catalog.get('submissions'),
  mode: props.match.params.mode,
});

export const MyRequestsContainer = connect(stateMapper)(MyRequests);
