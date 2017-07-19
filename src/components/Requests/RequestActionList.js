import React from 'react';
import { Link } from 'react-router-dom';
import { CoreForm, CoreModal, CoreModalHeader, CoreModalBody } from 'react-kinetic-core';

const ActivityDetailsLink = submission =>
  submission.coreState !== 'Draft' &&
  <li>
    <Link to={`/requests/${submission.id}/activity`}>
      Activity Details
    </Link>
  </li>;

const ContinueLink = submission =>
  submission.coreState === 'Draft' &&
  <li>
    <Link to={`/requests/${submission.id}`}>
      Continue
    </Link>
  </li>;

const AddCommentLink = (submission, handleClick) =>
  submission.coreState === 'Submitted' &&
  <li>
    <button className="btn btn-link" onClick={handleClick}>
      Add Comment
    </button>
  </li>;

const CloneAsDraftLink = (submission, handleClick) =>
  <li>
    <button className="btn btn-link" onClick={handleClick}>
      Clone as Draft
    </button>
  </li>;

const RequestToCancelLink = (submission, handleClick) =>
  submission.coreState === 'Submitted' &&
  <li>
    <button className="btn btn-link" onClick={handleClick}>
      Request to Cancel
    </button>
  </li>;

const FeedbackLink = (submission, handleClick) =>
  submission.coreState === 'Closed' &&
  <li>
    <button className="btn btn-link" onClick={handleClick}>
      Feedback
    </button>
  </li>;

const CancelLink = (submission, handleClick) =>
  submission.coreState === 'Draft' &&
  <li>
    <button className="btn btn-link" onClick={handleClick}>
      Cancel
    </button>
  </li>;

const ReviewRequestLink = submission =>
  submission.coreState !== 'Draft' &&
  <li>
    <Link to={`/requests/${submission.id}/review`}>
      Review Request
    </Link>
  </li>;

export const RequestActionList =
  ({
     submission,
     addComment,
     cloneAsDraft,
     requestToCancel,
     feedback,
     cancel,
     modalForm,
     handleCompleted,
     handleDismissed,
   }) =>
     <div>
       <ul className="list-inline actions">
         { ActivityDetailsLink(submission) }
         { ContinueLink(submission) }
         { AddCommentLink(submission, addComment) }
         { CloneAsDraftLink(submission, cloneAsDraft) }
         { RequestToCancelLink(submission, requestToCancel) }
         { FeedbackLink(submission, feedback) }
         { CancelLink(submission, cancel) }
         { ReviewRequestLink(submission) }
       </ul>
       {
         modalForm &&
         <CoreModal visible size="md" dismissed={handleDismissed}>
           <CoreModalHeader>
             <span>{modalForm.title}</span>
             <span
               role="button"
               tabIndex={0}
               className="fa fa-times pull-right"
               onClick={handleDismissed}
             />
           </CoreModalHeader>
           <CoreModalBody>
             {
               modalForm.completed
                 ? <h5>{modalForm.confirmationMessage}</h5>
                 : (
                   <CoreForm
                     kapp={modalForm.kappSlug}
                     form={modalForm.formSlug}
                     onCompleted={handleCompleted}
                   />
                 )
             }
           </CoreModalBody>
         </CoreModal>
       }
     </div>;
