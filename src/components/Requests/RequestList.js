import React from 'react';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';
import { CatalogHomeSubmission } from './CatalogHomeSubmission';
import { NavHeader } from '../Shared/NavHeader';

const modeToCoreState = Map({
  Draft: 'Draft',
  Open: 'Submitted',
  Closed: 'Closed',
});

const countByMode = (submissions, mode) =>
  submissions
    .filter(submission => submission.coreState === modeToCoreState.get(mode))
    .count();

export const RequestList = ({ submissions, forms, mode, match }) =>
  <div>
    <NavHeader breadcrumbs={[{ title: 'My Requests', path: '/requests' }]} />
    <br />
    <div className="content">
      <div className="container requests-nav">
        <ul className="nav nav-tabs">
          <li role="presentation" className={match.url === '/requests' && 'active'}>
            <Link to="/requests">
              All
            </Link>
          </li>
          <li role="presentation" className={match.url === '/requests/Open' && 'active'}>
            <Link to="/requests/Open">
              Open
              <badge>{countByMode(submissions, 'Open')}</badge>
            </Link>
          </li>
          <li role="presentation" className={match.url === '/requests/Closed' && 'active'}>
            <Link to="/requests/Closed">
              Closed
              <badge>{countByMode(submissions, 'Closed')}</badge>
            </Link>
          </li>
          <li role="presentation" className={match.url === '/requests/Draft' && 'active'}>
            <Link to="/requests/Draft">
              Draft
              <badge>{countByMode(submissions, 'Draft')}</badge>
            </Link>
          </li>
        </ul>
      </div>
      <div className="container requests">
        <div className="row">
          {
            submissions
              .filter(submission =>
                !mode || submission.coreState === modeToCoreState.get(mode),
              )
              .map(submission =>
                <CatalogHomeSubmission
                  key={submission.id}
                  submission={submission}
                  forms={forms}
                  includeActions
                />,
              )
          }
        </div>
      </div>
    </div>
  </div>;
