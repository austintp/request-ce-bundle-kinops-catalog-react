import React from 'react';
import { bundle } from 'react-kinetic-core';
import { getBadgeAttribute } from './AlertsDropdown';

export const AlertsDropdownSmall = ({ alerts }) =>
  <li
    className="dropdown badge-link hidden-sm hidden-md hidden-lg"
    {...getBadgeAttribute(alerts.data, alerts.error)}
  >
    <a href={`${bundle.spaceLocation()}?page=alerts`} title="Alerts">
      <span className="fa fa-bell fa-lg" />
    </a>
  </li>;
