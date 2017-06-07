import React from 'react';
import { QuestionsLink } from './QuestionsLink';
import { ServiceCard } from './ServiceCard';
import { NavHeader } from './NavHeader';

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
              { forms.map(form => <ServiceCard form={form} key={form.slug} />) }
            </div>
          </div>
        </div>
      </section>
      <QuestionsLink />
    </div>
  </div>;
