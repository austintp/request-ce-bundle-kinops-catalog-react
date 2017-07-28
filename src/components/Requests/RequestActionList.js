import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Button } from 'react-bootstrap';

const getBtnClass = mode =>
  typeof mode === 'undefined' ? 'btn btn-link' : 'btn btn-tertiary';

const ActivityDetailsLink = submission =>
  submission.coreState !== 'Draft' &&
    <Link to={`/requests/${submission.id}/activity`}>
      <Button bsClass="btn btn-tertiary">Activity Details</Button>
    </Link>;

const ContinueLink = submission =>
  submission.coreState === 'Draft' &&
    <Link to={`/requests/${submission.id}`}>
      <Button bsClass="btn btn-tertiary">Continue</Button>
    </Link>;

const AddCommentLink = (submission, handleClick, mode) =>
  submission.coreState === 'Submitted' &&
    <Button bsClass={getBtnClass(mode)} onClick={handleClick}>
      Add Coment
    </Button>;

const CloneAsDraftLink = (submission, handleClick, mode) =>
  <Button bsClass={getBtnClass(mode)} onClick={handleClick}>
    Clone as Draft
  </Button>;

const RequestToCancelLink = (submission, handleClick, mode) =>
  submission.coreState === 'Submitted' &&
    <Button bsClass={getBtnClass(mode)} onClick={handleClick}>
      Request to Cancel
    </Button>;

const FeedbackLink = (submission, handleClick, mode) =>
  submission.coreState === 'Closed' &&
    <Button bsClass={getBtnClass(mode)} onClick={handleClick}>
      Feedback
    </Button>;

const CancelLink = (submission, handleClick, mode) =>
  submission.coreState === 'Draft' &&
    <Button bsClass={getBtnClass(mode)} onClick={handleClick}>
      Cancel
    </Button>;

const ReviewRequestLink = (submission, mode) =>
  submission.coreState !== 'Draft' &&
    <Link className={getBtnClass(mode)} to={`/requests/${submission.id}/review`}>
      Review Request
    </Link>;

export const RequestActionList =
  ({
     submission,
     addComment,
     cloneAsDraft,
     requestToCancel,
     feedback,
     cancel,
     mode,
  }) =>

    <div>
      <ButtonToolbar>
        { (!mode || mode === 'review') && ActivityDetailsLink(submission) }
        { ContinueLink(submission) }
        { AddCommentLink(submission, addComment, mode) }
        { CloneAsDraftLink(submission, cloneAsDraft, mode) }
        { RequestToCancelLink(submission, requestToCancel, mode) }
        { FeedbackLink(submission, feedback, mode) }
        { CancelLink(submission, cancel, mode) }
        { mode !== 'review' && ReviewRequestLink(submission, mode) }
      </ButtonToolbar>
    </div>;
