import React from 'react';
import { QuestionsLink } from '../Shared/QuestionsLink';
import { ServiceCardLarge } from './ServiceCard';
import { NavHeader } from '../Shared/NavHeader';

export const Category = ({ category, forms }) =>
  <div>
    <NavHeader breadcrumbs={[{ title: 'Categories', path: '/categories' }, { title: category.name }]} />
    <br />
    <div className="container">
      <section className="category-header">
        <div className="category-icon-bg" style={{ backgroundColor: '#81B922' }}>
          <span className={`fa ${category.icon}`} />
        </div>
        <h2 style={{ color: '#81B922' }}>{category.name}</h2>
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
      <QuestionsLink />
    </div>
  </div>;
