import React, { Component } from "react";

class TableHeader extends Component {
  state = {};

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th key={column.label} onClick={() => this.raiseSort(column.path)} scope="col">
              {column.label}
            </th>
          ))}
          {/* <th onClick={() => this.raiseSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => this.raiseSort("genre.name")} scope="col">
            Genre
          </th>
          <th onClick={() => this.raiseSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col">
            Rate
          </th>
          <th onClick={() => {}} scope="col">
            Like
          </th>
          <th onClick={() => {}} scope="col">
            Delete
          </th> */}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
