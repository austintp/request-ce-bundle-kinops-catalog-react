import React from 'react';
import { Link } from 'react-router-dom';
import * as helpers from '../../helpers';
import * as constants from '../../constants';
import { RequestActionListContainer } from './RequestActionListContainer';
import { RequestDetailList } from './RequestDetailList';

const getFormIcon = form =>
  helpers.getAttributeValue(form, constants.ATTRIBUTE_ICON, constants.DEFAULT_FORM_ICON);

export const CatalogHomeSubmission = ({ submission, titleLink, includeActions }) =>
  <div className={`clearfix submission ${submission.coreState}`}>
    <div className="service-icon-wrapper">
      <div className="icn-frame">
        <i className={`fa fa-fw ${getFormIcon(submission.form)}`} />
      </div>
    </div>
    <div className="service-details-wrapper">
      <span className="title__content">
        <h5 className="ellipsis">
          <span className={`label pull-right ${helpers.getStatusClass(submission)}`}>
            {helpers.getStatus(submission)}
          </span>
          {
            titleLink
              ? <Link to={titleLink}>{submission.form.name}</Link>
              : <span>{submission.form.name}</span>
          }
        </h5>
        {
          submission.label !== submission.form.name &&
          <h6 className="ellipsis">{submission.label}</h6>
        }
        <RequestDetailList submission={submission} abbreviated={!includeActions} />
        { includeActions && <RequestActionListContainer submission={submission} /> }
      </span>
    </div>
  </div>;
