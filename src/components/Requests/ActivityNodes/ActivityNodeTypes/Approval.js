import React from 'react';
import { TimeAgo } from '../../../TimeAgo';
import { activityData } from '../../RequestActivityList';

const getIcon = data => {
  switch (data.Status) {
    case 'Approved':
      return 'fa-thumbs-o-up';
    case 'Denied':
      return 'fa-thumbs-o-down';
    default:
      return 'fa-pencil-square-o';
  }
};

export const ApprovalHeader = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <h4 className="col-sm-6">{activity.label}</h4>
      <h4 className="col-sm-6 text-right">{data.Status}</h4>
    </div>
  );
};

export const ApprovalBody = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <div className="row">
        <span className={`fa fa-fw fa-2x ${getIcon(data)}`} />
        <div className="col-xs-10">
          <span className="fa fa-calendar" />
          <span>Created</span>
          <TimeAgo timestamp={activity.createdAt} />
        </div>
        <div className="col-xs-10">
          <span className="fa fa-calendar" />
          <span>Updated</span>
          <TimeAgo timestamp={activity.updatedAt} />
        </div>
      </div>
      <div className="row">
        {
          (data['Assigned Team'] || data['Assigned Individual']) &&
          <div className="col-xs-12">
            <span className="title">Approver</span>
            <span>
              {
                data['Assigned Team'] && data['Assigned Individual']
                  ? `${data['Assigned Team']} > ${data['Assigned Individual']}`
                  : data['Assigned Team'] || data['Assigned Individual']
              }
            </span>
          </div>
        }
        {
          data.Status !== 'In Progress' && data.Decision &&
          <div className="col-xs-12">
            <span className="title">Decision</span>
            <span>{data.Decision}</span>
          </div>
        }
        {
          data.Status === 'Denied' && data['Denial Reason'] &&
          <div className="col-xs-12">
            <span className="title">Denial Reason</span>
            <span>{data['Denial Reason']}</span>
          </div>
        }
        {
          data.Comments &&
          <div className="col-xs-12">
            <span className="title">Comments</span>
            <span>{data.Comments}</span>
          </div>
        }
      </div>
    </div>
  );
};
