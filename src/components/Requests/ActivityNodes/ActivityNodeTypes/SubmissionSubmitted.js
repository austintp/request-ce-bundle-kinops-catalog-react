import React from 'react';
import { TimeAgo } from '../../../TimeAgo';
import { activityData } from '../../RequestActivityList';

export const SubmissionSubmittedHeader = ({ activity }) =>
  <h4 className="col-sm-12">{activity.label}</h4>;

export const SubmissionSubmittedBody = ({ activity, submission }) => {
  const data = activityData(activity);
  return (
    <div>
      <div className="row">
        <span className="fa fa-fw fa-2x fa-handshake-o" />
        <div className="col-xs-10">
          <span className="fa fa-calendar" />
          <span>Submitted</span>
          <TimeAgo timestamp={submission.submittedAt} />
        </div>
      </div>
      {
        data.Comments &&
        <div className="row">
          <div className="col-xs-12">
            <span>{data.Comments}</span>
          </div>
        </div>
      }
    </div>
  );
};
