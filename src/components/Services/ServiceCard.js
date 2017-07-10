import React from 'react';

export const ServiceCard = ({ form }) =>
  <div className="card-wrapper col-xs-12">
    <div className="service-card clearfix">
      <div className="service-icon-wrapper">
        <div className="icn-frame">
          <i className={`fa fa-fw ${form.icon}`} />
        </div>
      </div>
      <div className="service-details-wrapper">
        <h5 className="ellipsis">
          <a href="/bens-playground/services/cleaning">{form.name}</a>
        </h5>
        <p className="ellipsis">{form.description}</p>
      </div>
    </div>
  </div>;
