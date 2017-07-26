import React from 'react';
import { Link } from 'react-router-dom';
import { CatalogHomeSubmission } from './CatalogHomeSubmission';
import { NavHeader } from '../Shared/NavHeader';

export const RequestList =
({
   submissions,
   counts,
   mode,
   match,
   hasNextPage,
   hasPreviousPage,
   handleNextPage,
   handlePreviousPage,
}) =>
  <div>
    <NavHeader breadcrumbs={[{ title: 'My Requests', path: '/requests' }]} />
    <br />
    <div className="content">
      <div className="container requests-nav">
        <ul className="nav nav-tabs">
          <li role="presentation" className={mode === null && 'active'}>
            <Link to={match.path}>
              All
            </Link>
          </li>
          <li role="presentation" className={mode === 'Open' && 'active'}>
            <Link to={`${match.path}?mode=Open`}>
              Open
              <badge>{counts.Submitted}</badge>
            </Link>
          </li>
          <li role="presentation" className={mode === 'Closed' && 'active'}>
            <Link to={`${match.path}?mode=Closed`}>
              Closed
              <badge>{counts.Closed}</badge>
            </Link>
          </li>
          <li role="presentation" className={mode === 'Draft' && 'active'}>
            <Link to={`${match.path}?mode=Draft`}>
              Draft
              <badge>{counts.Draft}</badge>
            </Link>
          </li>
        </ul>
      </div>
      <div className="container requests">
        <div className="row">
          {
            submissions.map(submission =>
              <CatalogHomeSubmission
                key={submission.id}
                submission={submission}
                includeActions
              />,
            )
          }
          <div className="m-b-4">
            {
              hasPreviousPage &&
              <button
                className="btn btn-default pagination-btn pull-left read prev"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
            }
            {
              hasNextPage &&
              <button
                className="btn btn-default pagination-btn pull-right read next"
                onClick={handleNextPage}
              >
                Next
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  </div>;
