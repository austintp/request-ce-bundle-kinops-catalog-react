import React from 'react';

const ServiceCardTop = ({ form }) =>
  <div className="service-icon-wrapper">
    <div className="icn-frame">
      <i className={`fa fa-fw ${form.icon}`} />
    </div>
  </div>;

const ServiceCardBottom = ({ form }) =>
  <div className="service-details-wrapper">
    <h5 className="ellipsis">
      <a href="/bens-playground/services/cleaning">{form.name}</a>
    </h5>
    <p className="ellipsis">{form.description}</p>
  </div>;

export const ServiceCardLarge = ({ form }) =>
  <div className="card-wrapper col-xs-12">
    <div className="service-card clearfix">
      <ServiceCardTop form={form} />
      <ServiceCardBottom form={form} />
    </div>
  </div>;

export const ServiceCardSmall = ({ form }) =>
  <div className="clearfix submission">
    <ServiceCardTop form={form} />
    <ServiceCardBottom form={form} />
  </div>;
