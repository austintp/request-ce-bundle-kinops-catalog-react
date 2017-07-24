import React from 'react';
import { bundle } from 'react-kinetic-core';
import { RequestActionListContainer } from './RequestActionListContainer';
import { RequestActivityList } from './RequestActivityList';
import { TimeAgo } from '../TimeAgo';
import * as constants from '../../constants';
import * as helpers from '../../helpers';

const ProfileLink = ({ submitter }) =>
  <a href={`${bundle.spaceLocation()}?page=profile&username=${encodeURIComponent(submitter)}`}>
    { submitter === bundle.identity() ? 'you' : submitter }
  </a>;

export const RequestShow = ({ submission, match }) => {
  if (!submission) {
    return <div />;
  }

  const form = submission.form;
  const formIcon = helpers.getAttributeValue(form, constants.ATTRIBUTE_ICON,
    constants.DEFAULT_FORM_ICON);
  const dueDate = helpers.getDueDate(submission, constants.ATTRIBUTE_SERVICE_DAYS_DUE);
  const serviceOwner = helpers.getConfig({
    submission,
    name: constants.ATTRIBUTE_SERVICE_OWNING_TEAM,
  });
  const duration = submission.coreState === constants.CORE_STATE_CLOSED &&
    helpers.getDurationInDays(submission.createdAt, submission.closedAt);

  return (
    <div className="content">
      <section className="page">
        <div className="container">
          <div className="row submission-details">
            <div className="col-xs-12">
              <div className="submission-meta col-md-5 p-y-3">
                <div className="row form">
                  <div className="col-sm-2 hidden-xs">
                    <div className="icn-frame">
                      <i className={`fa fa-fw ${formIcon}`} />
                    </div>
                  </div>
                  <div className="col-sm-10">
                    <h5 className="ellipsis">{form.name}</h5>
                    {
                      form.name !== submission.label &&
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
                      <li>
                        <em>Status:</em>
                        &nbsp;
                        <strong>{helpers.getStatus(submission)}</strong>
                      </li>
                      {
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
                        )
                      }
                      {
                        serviceOwner &&
                        <li>
                          <em>Service Owning Team:</em>
                          &nbsp;
                          <strong>{serviceOwner} Team</strong>
                        </li>
                      }
                      {
                        submission.coreState === constants.CORE_STATE_SUBMITTED &&
                        dueDate &&
                        <li>
                          <em>Estimated Completion:</em>
                          &nbsp;
                          <strong><TimeAgo timestamp={dueDate} /></strong>
                        </li>
                      }
                      {
                        (duration || duration === 0) &&
                        <li>
                          <em>Completed in:</em>
                          &nbsp;
                          <strong>{duration} {duration === 1 ? 'day' : 'days'}</strong>
                        </li>
                      }
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
                <RequestActivityList submission={submission} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
