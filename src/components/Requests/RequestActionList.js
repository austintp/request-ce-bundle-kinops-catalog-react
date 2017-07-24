import React from 'react';
import { Link } from 'react-router-dom';
import { CoreForm, CoreModal, CoreModalHeader, CoreModalBody } from 'react-kinetic-core';

const getBtnClass = mode =>
  typeof mode === 'undefined' ? 'btn btn-link' : 'btn btn-tertiary';

const ActivityDetailsLink = submission =>
  submission.coreState !== 'Draft' &&
  <li>
    <Link to={`/requests/${submission.id}/activity`} className="btn btn-tertiary">
      Activity Details
    </Link>
  </li>;

const ContinueLink = submission =>
  submission.coreState === 'Draft' &&
  <li>
    <Link to={`/requests/${submission.id}`} className="btn btn-tertiary">
      Continue
    </Link>
  </li>;

const AddCommentLink = (submission, handleClick, mode) =>
  submission.coreState === 'Submitted' &&
  <li>
    <button className={getBtnClass(mode)} onClick={handleClick}>
      Add Comment
    </button>
  </li>;

const CloneAsDraftLink = (submission, handleClick, mode) =>
  <li>
    <button className={getBtnClass(mode)} onClick={handleClick}>
      Clone as Draft
    </button>
  </li>;

const RequestToCancelLink = (submission, handleClick, mode) =>
  submission.coreState === 'Submitted' &&
  <li>
    <button className={getBtnClass(mode)} onClick={handleClick}>
      Request to Cancel
    </button>
  </li>;

const FeedbackLink = (submission, handleClick, mode) =>
  submission.coreState === 'Closed' &&
  <li>
    <button className={getBtnClass(mode)} onClick={handleClick}>
      Feedback
    </button>
  </li>;

const CancelLink = (submission, handleClick, mode) =>
  submission.coreState === 'Draft' &&
  <li>
    <button className={getBtnClass(mode)} onClick={handleClick}>
      Cancel
    </button>
  </li>;

const ReviewRequestLink = (submission, mode) =>
  submission.coreState !== 'Draft' &&
  <li>
    <Link to={`/requests/${submission.id}/review`} className={getBtnClass(mode)}>
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
     mode,
   }) =>
     <div>
       <ul className="list-inline actions">
         { mode !== 'activity' && ActivityDetailsLink(submission) }
         { ContinueLink(submission) }
         { AddCommentLink(submission, addComment, mode) }
         { CloneAsDraftLink(submission, cloneAsDraft, mode) }
         { RequestToCancelLink(submission, requestToCancel, mode) }
         { FeedbackLink(submission, feedback, mode) }
         { CancelLink(submission, cancel, mode) }
         { mode !== 'review' && ReviewRequestLink(submission, mode) }
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
