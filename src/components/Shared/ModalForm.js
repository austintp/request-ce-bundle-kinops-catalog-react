import React from 'react';
import { CoreForm, CoreModal, CoreModalHeader, CoreModalBody } from 'react-kinetic-core';

export const ModalForm = ({ form, completed, handleCompleted, handleDismissed }) =>
  form &&
  <CoreModal visible size="60px" dismissed={handleDismissed}>
    <CoreModalHeader>
      <span>{form.title}</span>
      <span
        role="button"
        tabIndex={0}
        className="fa fa-times pull-right"
        onClick={handleDismissed}
      />
    </CoreModalHeader>
    <CoreModalBody>
      {
        completed
          ? <h5>{form.confirmationMessage}</h5>
          : (
            <CoreForm
              kapp={form.kappSlug}
              form={form.formSlug}
              onCompleted={handleCompleted}
            />
          )
      }
    </CoreModalBody>
  </CoreModal>;
