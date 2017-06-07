import React from 'react';
import { Link } from 'react-router-dom';
import { Seq } from 'immutable';

export const NavHeader = ({ breadcrumbs }) =>
  <nav className="navbar navbar-default" id="bundle-subheader">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 breadcrumbs">
          <ol className="breadcrumb">
            <li>
              <Link to="/">
                <span className="fa fa-book" />
                &nbsp;
                <span>Services</span>
              </Link>
            </li>
            {
              Seq(breadcrumbs).butLast().map(
                breadcrumb =>
                  <li key={breadcrumb.path}>
                    <Link to={breadcrumb.path}>{breadcrumb.title}</Link>
                  </li>,
              )
            }
            <li className="active">
              {Seq(breadcrumbs).last().title}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </nav>;
