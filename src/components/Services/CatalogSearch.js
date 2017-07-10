import React from 'react';
import { Link } from 'react-router-dom';

export const CatalogSearch = props =>
  <form onSubmit={props.submitHandler(props)}>
    <div className="input-group">
      <input
        type="text"
        placeholder="Search..."
        value={props.searchTerm}
        onChange={event => props.catalogSearchInput(event.target.value)}
      />
      <span className="input-group-btn">
        <button type="submit">
          <span className="fa fa-search" />
        </button>
      </span>
    </div>
    <div className="search-sub-link browse-categories">
      <Link to="/categories">
        <span>Browse Categories</span>
        &nbsp;
        <span className="fa fa-caret-right" />
      </Link>
    </div>
  </form>;
