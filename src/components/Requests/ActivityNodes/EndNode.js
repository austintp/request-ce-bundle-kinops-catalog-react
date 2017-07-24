import React from 'react';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TimeAgo } from '../../TimeAgo';
import { TIME_FORMAT } from '../../../constants';

export const EndNode = ({ timestamp }) =>
  <li className="text-center end">
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{moment(timestamp).format(TIME_FORMAT)}</Tooltip>}
    >
      <div className="finish">
        Finished
        <div>
          <TimeAgo tooltip={false} timestamp={timestamp} />
        </div>
      </div>
    </OverlayTrigger>
  </li>;
