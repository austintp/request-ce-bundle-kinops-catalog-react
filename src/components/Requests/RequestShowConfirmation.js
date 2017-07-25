import React from 'react';
import { CoreForm, CoreModal, CoreModalHeader, CoreModalBody } from 'react-kinetic-core';
import * as constants from '../../constants';

export const RequetShowConfirmation = ({
  feedbackOpen,
  feedbackCompleted,
  handleOpened,
  handleDismissed,
  handleCompleted,
}) =>
  <div>
    <div className="row details">
      <h4>Thank you for your submission.</h4>
    </div>
    <div className="row details">
      <p>
        With&nbsp;
        <a onClick={handleOpened} role="button" tabIndex={0}>Feedback</a>
        &nbsp;we are able to continuously improve.
      </p>
    </div>
    <hr />
    {
      feedbackOpen &&
      <CoreModal visible size="md" dismissed={handleDismissed}>
        <CoreModalHeader>
          <span>Provide Feedback</span>
          <span
            role="button"
            tabIndex={0}
            className="fa fa-times pull-right"
            onClick={handleDismissed}
          />
        </CoreModalHeader>
        <CoreModalBody>
          {
            feedbackCompleted
              ? <h5>Thanks for your feedback. We&apos;ll get that routed to the right team.</h5>
              : (
                <CoreForm
                  kapp={constants.ADMIN_KAPP}
                  form={constants.FEEDBACK_FORM}
                  onCompleted={handleCompleted}
                />
              )
          }
        </CoreModalBody>
      </CoreModal>
    }
  </div>;
