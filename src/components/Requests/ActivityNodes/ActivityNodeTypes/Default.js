import React from 'react';
import { TimeAgo } from '../../../TimeAgo';
import { activityData } from '../../RequestActivityList';

const ActivityDataItem = ({ label, value }) =>
  <div>
    {label !== 'STRING' && <span className={'title'}>{label}</span>}
    <span>{value}</span>
  </div>;

export const DefaultHeader = ({ activity }) =>
  <h4 className="col-sm-12">{activity.label}</h4>;

export const DefaultBody = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <div className="row">
        <div className="col-xs-12">
          <span className="fa fa-calendar" />
          <span>Created</span>
          <TimeAgo timestamp={activity.createdAt} />
        </div>
        <div className="col-xs-12">
          <span className="fa fa-calendar" />
          <span>Updated</span>
          <TimeAgo timestamp={activity.updatedAt} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          {
            Object.keys(data)
              // map to a list of objects with label, value, and key properties
              .map(key => ({ key, label: key, value: data[key] }))
              // filter out keys with falsey values
              .filter(({ value }) => value)
              .map(props => <ActivityDataItem {...props} />)
          }
        </div>
      </div>
    </div>
  );
};
