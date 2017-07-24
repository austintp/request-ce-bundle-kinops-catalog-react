import React from 'react';
import { TimeAgo } from '../../../TimeAgo';
import { activityData } from '../../RequestActivityList';

const getIcon = data => {
  switch (data.Status) {
    case 'Completed':
      return 'fa-check-circle-o';
    case 'In Progress':
      return 'fa-pencil-square-o';
    default:
      return '';
  }
};

export const TaskHeader = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <h4 className="col-sm-6">{activity.label}</h4>
      <h4 className="col-sm-6 text-right">{data.Status}</h4>
    </div>
  );
};

export const TaskBody = ({ activity }) => {
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
            <span className="title">Assignee</span>
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
