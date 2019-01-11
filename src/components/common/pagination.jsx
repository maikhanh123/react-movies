/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const lastPage = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, lastPage+1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className={(page === currentPage) ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount : PropTypes.number.isRequired, 
  pageSize : PropTypes.number.isRequired,
  currentPage : PropTypes.number.isRequired,
  onPageChange : PropTypes.func.isRequired
}

export default Pagination;
