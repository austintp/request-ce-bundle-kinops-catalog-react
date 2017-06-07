import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const statusLabels = {
  Draft: 'label-warning',
  Submitted: 'label-success',
  Closed: 'label-default',
};

const getFormIcon = (submission, forms) =>
  forms
    .filter(form => form.name === submission.form.name)
    .map(form => form.icon)
    .first() || 'fa-cube';

export const CatalogHomeSubmission = ({ submission, forms, includeActions }) =>
  <div className={`clearfix submission ${submission.coreState}`}>
    <div className="service-icon-wrapper">
      <div className="icn-frame">
        <i className={`fa fa-fw ${getFormIcon(submission, forms)}`} />
      </div>
    </div>
    <div className="service-details-wrapper">
      <span className="title__content">
        <h5 className="ellipsis">
          <span className={`label pull-right ${statusLabels[submission.coreState]}`}>
            {submission.values.Status}
          </span>
          {
            includeActions
              ? <span>{submission.form.name}</span>
              : <Link to="/requests">{submission.form.name}</Link>
          }
        </h5>
        <h6 className="ellipsis">{submission.label}</h6>
        <ul className="list-inline meta">
          <li>
            <em>Confirmation #: </em>
            <strong>{submission.handle}</strong>
          </li>
          {
            !submission.submittedAt && !submission.closedAt &&
            <li>
              <em>Created: </em>
              <strong>{moment(submission.createdAt).fromNow()}</strong>
            </li>
          }
          {
            submission.submittedAt &&
            <li>
              <em>Submitted: </em>
              <strong>{moment(submission.submittedAt).fromNow()}</strong>
            </li>
          }
          {
            submission.closedAt &&
            <li>
              <em>Closed: </em>
              <strong>{moment(submission.closedAt).fromNow()}</strong>
            </li>
          }
        </ul>
      </span>
    </div>
  </div>;
