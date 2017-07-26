import React from 'react';
import { QuestionsLinkContainer } from '../Shared/QuestionsLink';
import { ServiceCardLarge } from './ServiceCard';
import { NavHeader } from '../Shared/NavHeader';
import { getColor, getAttributeValue } from '../../helpers/utils';

export const Category = ({ category, forms }) =>
  <div>
    <NavHeader breadcrumbs={[{ title: 'Categories', path: '/categories' }, { title: category.name }]} />
    <br />
    <div className="container">
      <section className="category-header">
        <div className="category-icon-bg" style={{ backgroundColor: getAttributeValue('Color', category) || getColor(category.slug) }}>
          <span className={`fa ${category.icon}`} />
        </div>
        <h2 style={{ color: getAttributeValue('Color', category) || getColor(category.slug) }}>{category.name}</h2>
      </section>
      <section>
        <div className="row">
          <div className="col-sm-12">
            <h3>Services</h3>
            <div className="service-items row">
              {
                forms
                  .map(form => ({ form, categorySlug: category.slug, key: form.slug }))
                  .map(props => <ServiceCardLarge {...props} />)
              }
            </div>
          </div>
        </div>
      </section>
      <QuestionsLinkContainer />
    </div>
  </div>;
