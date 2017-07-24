import React from 'react';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TimeAgo } from '../../TimeAgo';
import { TIME_FORMAT } from '../../../constants';

export const StartNode = ({ label, timestamp }) =>
  <li className="text-center">
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{moment(timestamp).format(TIME_FORMAT)}</Tooltip>}
    >
      <div className="start">
        {label}
        <div>
          <TimeAgo tooltip={false} timestamp={timestamp} />
        </div>
      </div>
    </OverlayTrigger>
  </li>;
