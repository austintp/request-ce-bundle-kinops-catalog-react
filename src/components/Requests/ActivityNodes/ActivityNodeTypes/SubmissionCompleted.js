import React from 'react';
import { TimeAgo } from '../../../TimeAgo';
import { activityData } from '../../RequestActivityList';

export const SubmissionCompletedHeader = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <h4 className="col-sm-6">{activity.label}</h4>
      <h4 className="col-sm-6 text-right">{data.Status}</h4>
    </div>
  );
};

export const SubmissionCompletedBody = ({ activity, submission }) => {
  const data = activityData(activity);
  return (
    <div>
      <div className="row">
        <span className="fa fa-fw fa-2x fa-flag-checkered" />
        <div className="col-xs-10">
          <span className="fa fa-calendar" />
          <span>Closed</span>
          <TimeAgo timestamp={submission.closedAt} />
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
