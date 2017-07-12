import React from 'react';
import { CoreForm } from 'react-kinetic-core';
import { NavHeader } from '../Shared/NavHeader';
import { kappSlug } from '../../constants';

export const Form = () =>
  <div>
    <NavHeader
      breadcrumbs={[
        { title: 'Categories', path: '/categories' },
        { title: 'Facilities', path: '/categories/facilities' },
        { title: 'iPad request' },
      ]}
    />
    <CoreForm
      kapp={kappSlug}
      form="cleaning"
      globals={() => import('../../globals')}
    />
  </div>;
