import React from 'react';
import classNames from 'classnames';

import { bundle } from 'react-kinetic-core';
import { Nav, NavItem, NavDropdown, MenuItem, Navbar } from 'react-bootstrap';

import { getAttributeValue, isGuest } from '../../helpers/utils';
import { AlertsDropdownContainer } from './AlertsDropdownContainer';
import { AlertsDropdownSmallContainer } from './AlertsDropdownSmallContainer';
import { ProfileDropdown } from './ProfileDropdown';

const MenuIcon = <span className="hidden-xs fa fa-bars fa-lg" />;

const BuildMenuLink = ({ obj, nameOverride = obj.name }) =>
  <MenuItem href={`${obj.kapps ? bundle.spaceLocation() : bundle.kappLocation(obj.slug)}`} key={obj.slug}>
    <span
      className={classNames('fa fa-fw', getAttributeValue('Icon', obj) || (obj.kapps ? 'fa-home' : 'fa-book'))}
    />{nameOverride}
  </MenuItem>;

export const AppHeader = props => {
  const {
    space, kapp, profile,
    hasAccessToManagement,
    hasAccessToSupport,
    adminKapp,
    predefinedKapps,
    additionalKapps,
  } = props;

  const backgroundColor = getAttributeValue('Theme Color Primary', space) || '##666';

  return (
    <Navbar fixedTop id="bundle-header" style={{ 'background-color': backgroundColor }}>
      <Navbar.Header>
        <Navbar.Toggle className="dropdown"><span className="fa fa-bars fa-lg fa-fw" /></Navbar.Toggle>
        { !isGuest(profile) &&
          <Nav className="hidden-xs">
            <NavDropdown noCaret title={MenuIcon} id="linkMenu" style={{ 'background-color': backgroundColor }}>
              <BuildMenuLink obj={space} />
              <MenuItem divider />
              {predefinedKapps.map(thisKapp =>
                <BuildMenuLink obj={thisKapp} key={thisKapp.slug} />)
              }
              {additionalKapps.map(thisKapp =>
                <BuildMenuLink obj={thisKapp} key={thisKapp.slug} />)
              }
              { (hasAccessToManagement || hasAccessToSupport) && <MenuItem divider /> }
              { hasAccessToManagement && <BuildMenuLink obj={adminKapp} nameOverride="Admin Console" key={adminKapp.slug} />}
              { hasAccessToSupport &&
                <MenuItem href={`${bundle.kappLocation(adminKapp.slug)}/submission-support`}>
                  <span className="fa fa-fw fa-clipboard" />Submission Support
                </MenuItem>
              }
            </NavDropdown>
          </Nav>
        }
        <Navbar.Brand>
          <a href={`${bundle.spaceLocation()}`} className="space-home-link" >
            <span className="hidden-xs">{space && space.name}</span>{' '}
            <span className="hidden-sm hidden-md hidden-lg fa fa-home" />
          </a>
          {kapp &&
            <a href={`${bundle.kappLocation()}`} className="kapp-home-link">{' '}
              <span>{kapp && kapp.name}</span>
            </a>
          }
        </Navbar.Brand>
        <div className="right-nav">
          <ul className="nav navbar-nav navbar-right">
            <AlertsDropdownContainer />
            <AlertsDropdownSmallContainer />
            <ProfileDropdown {...props} />
          </ul>
        </div>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav className="hidden-sm hidden-md hidden-lg">
          <BuildMenuLink obj={space} key={space.slug} />
          { !isGuest(profile) &&
            <NavItem className="divider" />
          }
          { !isGuest(profile) &&
            predefinedKapps.map(thisKapp => <BuildMenuLink obj={thisKapp} key={thisKapp.slug} />)
          }
          { !isGuest(profile) &&
            additionalKapps.map(thisKapp => <BuildMenuLink obj={thisKapp} key={thisKapp.slug} />)
          }
          { !isGuest(profile) && (hasAccessToManagement || hasAccessToSupport) && <NavItem className="divider" /> }
          { !isGuest(profile) && hasAccessToManagement && <BuildMenuLink obj={adminKapp} nameOverride="Admin Console" key={adminKapp.slug} />}
          { !isGuest(profile) && hasAccessToSupport &&
            <NavItem key={'submission-support'} href={`${bundle.kappLocation(adminKapp.slug)}/submission-support`}>
              <span className="fa fa-fw fa-clipboard" />Submission Support
            </NavItem>
          }
          { !isGuest(profile) && <NavItem className="divider" />}
          <NavItem href={`${bundle.spaceLocation()}?page=profile`}>
            <span className="fa fa-user fa-fw" />Profile
          </NavItem>
          <NavItem href={`${bundle.spaceLocation()}?page=about`}>
            <span className="fa fa-info fa-fw" />About
          </NavItem>
          <NavItem href={`${bundle.spaceLocation()}/app/logout`}>
            <span className="fa fa-sign-out fa-fw" />Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
