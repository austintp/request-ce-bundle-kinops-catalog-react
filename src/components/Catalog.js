import React from 'react';
import { Link } from 'react-router-dom';
import { CatalogSearchContainer } from './Services/CatalogSearchContainer';
import { ServiceCardSmall } from './Services/ServiceCard';
import { CatalogHomeSubmission } from './Requests/CatalogHomeSubmission';
import { QuestionsLinkContainer } from './Shared/QuestionsLink';

export const Catalog = ({ profile, forms, submissions }) =>
  <div className="content">
    <div className="home">
      <div className="hero">
        <img
          className="hero-img"
          src="https://s3.amazonaws.com/kinops.io/registered-images/books.jpeg"
          alt=""
        />
        <div className="container">
          <div className="hero-content">
            <div className="hero-heading hidden-xs">
              Hi {profile.displayName}, how can we help you?
            </div>
            <div className="search-bar">
              <CatalogSearchContainer />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 my-requests clearfix">
            <h3 className="p-y-2">
              <span>My Requests</span>
              <small className="pull-right">
                <Link to="/requests">
                  <span>View All</span>
                  &nbsp;
                  <span className="fa fa-caret-right" />
                </Link>
              </small>
            </h3>
            <div className="homepage-requests">
              {
                submissions
                  .take(5)
                  .map(submission => ({
                    submission,
                    forms,
                    key: submission.id,
                    titleLink: `/requests/${submission.id}/activity`,
                  }))
                  .map(props => <CatalogHomeSubmission {...props} />)
              }
            </div>
          </div>
          <div className="col-sm-6">
            <h3 className="p-y-2">
              <span>Popular Services</span>
              <small className="pull-right">
                <Link to="/categories/home-page-services">
                  <span>View All</span>
                  &nbsp;
                  <span className="fa fa-caret-right" />
                </Link>
              </small>
            </h3>
            <div className="homepage-popular-services">
              {
                forms
                  .filter(form => form.categories.indexOf('home-page-services') > -1)
                  .take(5)
                  .map(form => <ServiceCardSmall form={form} key={form.slug} />)
              }
            </div>
          </div>
        </div>
        <QuestionsLinkContainer />
      </div>
    </div>
  </div>;
