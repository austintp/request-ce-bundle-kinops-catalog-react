import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { isGuest } from '../../helpers/utils';
import { actions } from '../../redux/modules/alerts';

import { AlertsDropdown } from './AlertsDropdown';

export const stateMapper = ({ alerts, me, space }) => ({
  alerts,
  space: space.data,
  isAdmin: me.data.spaceAdmin,
  isGuest: !me.loading ? isGuest(me.data) : false,
});
export const dispatchMapper = { ...actions };

export const AlertsDropdownContainer = compose(
  connect(stateMapper, dispatchMapper),
  lifecycle({
    componentWillMount() {
      this.props.fetchAlerts();
    },
  }),
)(AlertsDropdown);
