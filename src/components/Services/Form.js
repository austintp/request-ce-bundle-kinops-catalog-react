import React from 'react';
import { CoreForm } from 'react-kinetic-core';
import { NavHeader } from '../Shared/NavHeader';
import { kappSlug } from '../../constants';

export const buildBreadcrumbs = (form, category) =>
  category
    ? [
      { title: 'Categories', path: '/categories' },
      { title: category.name, path: `/categories/${category.slug}` },
      { title: form.name },
    ]
    : [
      { title: form.name },
    ];

export const Form = ({ form, category }) =>
  <div>
    <NavHeader breadcrumbs={buildBreadcrumbs(form, category)} />
    <CoreForm
      kapp={kappSlug}
      form={form.slug}
      globals={() => import('../../globals')}
    />
  </div>;
