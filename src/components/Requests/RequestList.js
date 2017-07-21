import React from 'react';
import { CatalogHomeSubmission } from './CatalogHomeSubmission';
import { NavHeader } from '../Shared/NavHeader';
import { CORE_STATE_SUBMITTED } from '../../constants';

const submissionMatches = mode => submission =>
  !mode ||
  submission.coreState === mode ||
  (submission.coreState === CORE_STATE_SUBMITTED && mode === 'Open');

export const RequestList = ({ submissions, forms, counts, mode, setMode }) =>
  <div>
    <NavHeader breadcrumbs={[{ title: 'My Requests', path: '/requests' }]} />
    <br />
    <div className="content">
      <div className="container requests-nav">
        <ul className="nav nav-tabs">
          <li role="presentation" className={mode === null && 'active'}>
            <a onClick={() => setMode(null)} role="button" tabIndex={0}>
              All
            </a>
          </li>
          <li role="presentation" className={mode === 'Open' && 'active'}>
            <a onClick={() => setMode('Open')} role="button" tabIndex={0}>
              Open
              <badge>{counts.Submitted}</badge>
            </a>
          </li>
          <li role="presentation" className={mode === 'Closed' && 'active'}>
            <a onClick={() => setMode('Closed')} role="button" tabIndex={0}>
              Closed
              <badge>{counts.Closed}</badge>
            </a>
          </li>
          <li role="presentation" className={mode === 'Draft' && 'active'}>
            <a onClick={() => setMode('Draft')} role="button" tabIndex={0}>
              Draft
              <badge>{counts.Draft}</badge>
            </a>
          </li>
        </ul>
      </div>
      <div className="container requests">
        <div className="row">
          {
            submissions
              .filter(submissionMatches(mode))
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
