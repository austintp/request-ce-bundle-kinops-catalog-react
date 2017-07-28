import React, { Component } from 'react';
import { RootCloseWrapper } from 'react-overlays';
import { Dropdown } from 'react-bootstrap';
import { bundle, CoreForm, CoreModal, CoreModalHeader, CoreModalBody } from 'react-kinetic-core';

import { getAttributeValue } from '../../helpers/utils';

export const getBadgeAttribute = (alerts, error) =>
  alerts.length > 0 && !error
    ? { 'data-badge-content': alerts.length }
    : {};

const AlertsIcon = ({ alerts, className, children }) =>
  <li
    className={`hidden-xs ${className}`}
    {...getBadgeAttribute(alerts.data, alerts.error)}
  >
    {children}
  </li>;

const AlertsMessage = ({ icon, message }) =>
  <li className="text-center">
    <span className={`fa ${icon}`} />
    &nbsp;
    <span>{message}</span>
  </li>;

const AlertsToggle = ({ id, onClick, onKeyDown, bsClass, open }) =>
  <a
    role="button"
    tabIndex={0}
    id={id}
    className={bsClass}
    title="Alerts"
    aria-haspopup
    aria-expanded={!!open}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    <span className="fa fa-bell-o fa-lg" />
  </a>;

class AlertsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeForm: null, completedForm: false };

    this.handleRootClose = this.handleRootClose.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.completeForm = this.completeForm.bind(this);
  }

  closeForm() {
    this.setState({ activeForm: null, completedForm: false });
  }

  openForm(form) {
    this.setState({ activeForm: form, completedForm: false });
  }

  completeForm() {
    this.setState({ completedForm: true });
  }

  handleRootClose(event) {
    this.props.onClose(event, { source: 'rootClose' });
  }

  render() {
    const {
      open,
      rootCloseEvent,
      fetchAlerts,
      isAdmin,
      isGuest,
      labelledBy,
      alerts,
      space,
    } = this.props;

    const backgroundColor = getAttributeValue('Theme Color Primary', space) || '##666';

    return (
      <RootCloseWrapper
        disabled={!open}
        onRootClose={this.handleRootClose}
        event={rootCloseEvent}
      >
        <div className="dropdown-menu dropdown-menu-right alerts-list" aria-labelledby={labelledBy} style={{ 'background-color': backgroundColor }}>
          <div className="heading" style={{ 'background-color': backgroundColor }}>
            <span>Alerts</span>
            <span className="pull-right">
              <a role="button" tabIndex={0} onClick={fetchAlerts}>Refresh</a>
              &nbsp;
              <span>&middot;</span>
              &nbsp;
              <a href={`${bundle.spaceLocation()}/#/alerts`}>View All</a>
              &nbsp;
              { (isAdmin || !isGuest) &&
                <span>&middot;&nbsp;</span>
              }
              { isAdmin &&
                <a href={`${bundle.spaceLocation()}/admin/alerts`}>Create Alert</a>
              }
              { !isAdmin && !isGuest &&
                <a
                  tabIndex={0}
                  role="button"
                  onClick={() => this.openForm('kinops-request-an-alert')}
                >
                  Request Alert
                </a>
              }
            </span>
          </div>
          <ul>
            {
              alerts.loading &&
              <AlertsMessage icon="fa-spinner" message="Loading" />
            }
            {
              alerts.error &&
              <AlertsMessage
                icon="fa-exclamation-triangle"
                message="There was a problem loading the alerts."
              />
            }
            {
              !alerts.loading &&
              !alerts.error &&
              alerts.data.length === 0 &&
              <AlertsMessage
                icon="fa-info-circle"
                message="There are no active alerts."
              />
            }
            {
              !alerts.loading &&
              !alerts.error &&
              alerts.data.length !== 0 &&
              alerts.data.map(alert =>
                <li key={alert.id}>
                  <a href={`${bundle.spaceLocation()}/#/alerts/${alert.id}`}>
                    <span className="title">
                      <span className="label">{alert.values.Source}</span>
                      <span>{alert.values.Title}</span>
                    </span>
                    <span className="body">{alert.values.Content}</span>
                  </a>
                </li>,
              )
            }
          </ul>
          {
            this.state.activeForm &&
            <CoreModal visible size="md" dismissed={this.closeForm}>
              <CoreModalHeader>
                <span>Request Alert</span>
                <span
                  role="button"
                  tabIndex={0}
                  className="fa fa-times pull-right"
                  onClick={this.closeForm}
                />
              </CoreModalHeader>
              <CoreModalBody>
                {
                  this.state.completedForm ? (
                    <h5>Your alert request has been submitted. Once approved it
                      will appear.</h5>
                  ) : (
                    <CoreForm
                      kapp="admin"
                      form={this.state.activeForm}
                      onCompleted={this.completeForm}
                    />
                  )
              }
              </CoreModalBody>
            </CoreModal>
          }
        </div>
      </RootCloseWrapper>
    );
  }
}

export const AlertsDropdown = props =>
  <Dropdown id="alertsMenu" componentClass={AlertsIcon} {...props}>
    <AlertsToggle bsRole="toggle" />
    <AlertsMenu bsRole="menu" {...props} />
  </Dropdown>;
