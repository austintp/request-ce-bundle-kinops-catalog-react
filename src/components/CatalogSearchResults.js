import React from 'react';
import { ServiceCard } from './ServiceCard';
import { CatalogSearchContainer } from '../containers/CatalogSearchContainer';
import { NavHeader } from './NavHeader';

export const CatalogSearchResults = ({ query, forms }) =>
  <div>
    <NavHeader breadcrumbs={[{ title: 'Search' }]} />
    <div className="container">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <div className="search-bar wrapped">
                <CatalogSearchContainer />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="search-results">
        <h3>
          <span>Results for</span>
          &nbsp;
          <span className="label label-default">{query}</span>
        </h3>
        <div className="row">
          { forms.map(form => <ServiceCard form={form} key={form.slug} />) }
        </div>
      </section>
    </div>
  </div>;
