import React from 'react';
import { bundle, CoreForm } from 'react-kinetic-core';
import { RequestActionListContainer } from './RequestActionListContainer';
import { RequestShowConfirmationContainer } from './RequestShowConfirmation';
import { RequestActivityList } from './RequestActivityList';
import { TimeAgo } from '../TimeAgo';
import { NavHeader } from '../Shared/NavHeader';
import * as constants from '../../constants';
import * as helpers from '../../helpers';

const globals = import('../../globals');

const getBreadcrumbs = (submission, match) => {
  const result = [{ title: 'My Requests', path: '/requests' }];
  if (submission) {
    result.push({
      title: submission.form.name,
      path: `/requests/${match.params.submissionId}/activity`,
    });
  }
  if (match.params.mode === 'review') {
    result.push({ title: 'Review Request' });
  }
  if (match.params.mode === 'confirmation') {
    result.push({ title: 'Confirmation' });
  }
  return result;
};

const getIcon = form =>
  helpers.getAttributeValue(form, constants.ATTRIBUTE_ICON, constants.DEFAULT_FORM_ICON);

const ProfileLink = ({ submitter }) =>
  <a href={`${bundle.spaceLocation()}?page=profile&username=${encodeURIComponent(submitter)}`}>
    { submitter === bundle.identity() ? 'you' : submitter }
  </a>;

const StatusItem = ({ submission }) =>
  <li>
    <em>Status:</em>
    &nbsp;
    <strong>{helpers.getStatus(submission)}</strong>
  </li>;

const DisplayDateItem = ({ submission }) =>
  !submission.submittedAt ? (
    <li>
      <em>Created:</em>
      &nbsp;
      <strong><TimeAgo timestamp={submission.createdAt} /></strong>
      &nbsp;
      <em>by</em>
      &nbsp;
      <strong><ProfileLink submitter={submission.createdBy} /></strong>
    </li>
  ) : (
    <li>
      <em>Submitted:</em>
      &nbsp;
      <strong><TimeAgo timestamp={submission.submittedAt} /></strong>
      &nbsp;
      <em>by</em>
      &nbsp;
      <strong><ProfileLink submitter={submission.submittedBy} /></strong>
    </li>
  );

const ServiceOwnerItem = ({ submission }) => {
  const serviceOwner = helpers.getConfig({
    submission,
    name: constants.ATTRIBUTE_SERVICE_OWNING_TEAM,
  });
  return (
    !!serviceOwner &&
    <li>
      <em>Service Owning Team:</em>
      &nbsp;
      <strong>{serviceOwner} Team</strong>
    </li>
  );
};

const EstCompletionItem = ({ submission }) => {
  const dueDate = helpers.getDueDate(submission, constants.ATTRIBUTE_SERVICE_DAYS_DUE);
  return (
    submission.coreState === constants.CORE_STATE_SUBMITTED &&
    !!dueDate &&
    <li>
      <em>Estimated Completion:</em>
      &nbsp;
      <strong><TimeAgo timestamp={dueDate} /></strong>
    </li>
  );
};

const CompletedInItem = ({ submission }) => {
  const duration = submission.coreState === constants.CORE_STATE_CLOSED &&
    helpers.getDurationInDays(submission.createdAt, submission.closedAt);
  return (
    (duration || duration === 0) &&
    <li>
      <em>Completed in:</em>
      &nbsp;
      <strong>{duration} {duration === 1 ? 'day' : 'days'}</strong>
    </li>
  );
};

export const RequestShow = ({ submission, match }) =>
  <div>
    <NavHeader breadcrumbs={getBreadcrumbs(submission, match)} />
    <br />
    {
      submission &&
      <div className="content">
        <section className="page">
          <div className="container">
            <div className="row submission-details">
              <div className="col-xs-12">
                <div className="submission-meta col-md-5 p-y-3">
                  {
                    match.params.mode === 'confirmation' &&
                    <RequestShowConfirmationContainer />
                  }
                  <div className="row form">
                    <div className="col-sm-2 hidden-xs">
                      <div className="icn-frame">
                        <i className={`fa fa-fw ${getIcon(submission.form)}`} />
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <h5 className="ellipsis">{submission.form.name}</h5>
                      {
                        submission.form.name !== submission.label &&
                        <h6 className="ellipsis">{submission.label}</h6>
                      }
                      <p>
                        <em>Confirmation #</em>
                        <strong>{submission.handle}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <hr />
                      <ul className="list-unstyled">
                        <StatusItem submission={submission} />
                        <DisplayDateItem submission={submission} />
                        <ServiceOwnerItem submission={submission} />
                        <EstCompletionItem submission={submission} />
                        <CompletedInItem submission={submission} />
                      </ul>
                      <hr />
                    </div>
                  </div>
                  <div className="row actions">
                    <div className="col-xs-12">
                      <RequestActionListContainer
                        submission={submission}
                        mode={match.params.mode}
                      />
                    </div>
                  </div>
                </div>
                <div className="right-details col-md-7 p-y-3">
                  {
                    match.params.mode === 'review'
                      ? <CoreForm submission={submission.id} review globals={globals} />
                      : <RequestActivityList submission={submission} />
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    }
  </div>;
