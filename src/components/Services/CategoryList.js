import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionsLink } from '../Shared/QuestionsLink';
import { NavHeader } from '../Shared/NavHeader';

const countMatchingForms = (category, forms) =>
  forms
    .filter(form => form.categories.indexOf(category.slug) > -1)
    .count();

export const CategoryListCard = ({ category, forms }) =>
  <Link to={`/categories/${category.slug}`}>
    <div className="category-card">
      <div className="card-content" style={{ borderTopColor: '#81B922' }}>
        <div className="card-icon-bg" style={{ backgroundColor: '#81B922' }}>
          <i className={`fa-2x fa ${category.icon}`} />
        </div>
        <div className="card-title">
          <h3 className="ellipsis">{category.name}</h3>
          <p className="subtle">{countMatchingForms(category, forms)} Services</p>
        </div>
      </div>
    </div>
  </Link>;

export const CategoryList = ({ categories, forms }) =>
  <div>
    <NavHeader breadcrumbs={[{ title: 'Categories', path: '/categories' }]} />
    <div className="container">
      <section>
        <div className="row">
          <div className="col-sm-12">
            <h2>Browse by Category</h2>
            <div className="categories">
              {
                categories
                  .filter(category => category.slug !== 'home-page-services')
                  .map(category =>
                    <CategoryListCard
                      key={category.slug}
                      category={category}
                      forms={forms}
                    />)
              }
            </div>
          </div>
        </div>
      </section>
      <QuestionsLink />
    </div>
  </div>;