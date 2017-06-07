import React from 'react';

export const CatalogHomeService = ({ form }) =>
  <div className="clearfix submission">
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
  </div>;
