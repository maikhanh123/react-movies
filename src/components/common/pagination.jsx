import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize } = props;
  const lastPage = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, lastPage+1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(p => (
          <li key={p} className="page-item">
            <a className="page-link" href="#">
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
