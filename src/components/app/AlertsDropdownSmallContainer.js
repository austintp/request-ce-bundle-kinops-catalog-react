import { connect } from 'react-redux';
import { AlertsDropdownSmall } from './AlertsDropdownSmall';

export const stateMapper = ({ alerts }) => ({
  alerts,
});

export const AlertsDropdownSmallContainer = connect(stateMapper)(AlertsDropdownSmall);
