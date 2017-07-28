import React, { Component } from 'react';
import { RootCloseWrapper } from 'react-overlays';
import { Dropdown } from 'react-bootstrap';
import { bundle, CoreForm, CoreModal, CoreModalHeader, CoreModalBody } from 'react-kinetic-core';

import { getAttributeValue } from '../../helpers/utils';

import { Avatar } from './Avatar';

const titles = {
  'kinops-invite-others': 'Invite Others',
  help: 'Get Help',
  feedback: 'Provide Feedback',
};

const confirmationMessages = {
  'kinops-invite-others': 'We\'ll send those invitations out right away.',
  help: 'We\'ll get you a response as soon as possible.',
  feedback: 'Thanks for your feedback. We\'ll get that routed to the right team.',
};

const ProfileToggle = ({ profile, id, onClick, onKeyDown, bsClass, open }) =>
  <a
    role="button"
    tabIndex={0}
    id={id}
    className={bsClass}
    aria-haspopup
    aria-expanded={!!open}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    <Avatar size={36} user={profile} />
  </a>;

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeForm: null, completedForm: false };
    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.completeForm = this.completeForm.bind(this);
    this.handleRootClose = this.handleRootClose.bind(this);
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
    const { profile, space } = this.props;
    const backgroundColor = getAttributeValue('Theme Color Primary', space) || '##666';

    return (
      <RootCloseWrapper
        disabled={!this.props.open}
        onRootClose={this.handleRootClose}
        event={this.props.rootCloseEvent}
      >
        <div
          className="user-tile dropdown-menu dropdown-menu-right"
          aria-labelledby={this.props.labelledBy}
          style={{ 'background-color': backgroundColor }}
        >
          <div>
            <div><b>{profile.displayName}</b></div>
            <div>{profile.email || profile.username}</div>
          </div>
          <div className="actions">
            <a href={`${bundle.spaceLocation()}?page=profile`}>
              <span className="fa fa-user fa-fw" />
              &nbsp;
              <span>Profile</span>
            </a>
            { profile.spaceAdmin && (
              <a tabIndex={0} role="button" onClick={() => this.openForm('kinops-invite-others')}>
                <span className="fa fa-envelope-o fa-fw" />
                &nbsp;
                <span>Invite Others</span>
              </a>
            )}
            <a tabIndex={0} role="button" onClick={() => this.openForm('help')}>
              <span className="fa fa-question fa-fw" />
              &nbsp;
              <span>Get Help</span>
            </a>
            <a tabIndex={0} role="button" onClick={() => this.openForm('feedback')}>
              <span className="fa fa-commenting-o fa-fw" />
              &nbsp;
              <span>Give Feedback</span>
            </a>
            <a href={`${bundle.spaceLocation()}?page=about`}>
              <span className="fa fa-info fa-fw" />
              &nbsp;
              <span>About My Space</span>
            </a>
            <a href={`${bundle.spaceLocation()}/app/logout`}>
              <span className="fa fa-sign-out fa-fw" />
              &nbsp;
              <span>Logout</span>
            </a>
          </div>
          {
            this.state.activeForm &&
            <CoreModal visible size="md" dismissed={this.closeForm}>
              <CoreModalHeader>
                <span>{titles[this.state.activeForm]}</span>
                <span
                  role="button"
                  tabIndex={0}
                  className="fa fa-times pull-right"
                  onClick={this.closeForm}
                />
              </CoreModalHeader>
              <CoreModalBody>
                {
                  (this.state.completedForm) ? (
                    <h5>{confirmationMessages[this.state.activeForm]}</h5>
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

export const ProfileDropdown = ({ profile, space }) =>
  <Dropdown
    componentClass={props => <li {...props} className={`hidden-xs clearfix ${props.className}`} />}
    id="user-menu"
  >
    <ProfileToggle bsRole="toggle" profile={profile} />
    <ProfileMenu bsRole="menu" profile={profile} space={space} />
  </Dropdown>;
