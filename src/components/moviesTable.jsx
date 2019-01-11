import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path:"like",
      key: "like",
      label: "Like",
      content: movie => (
        <Like
          liked={movie.liked}
          movie={movie}
          onClick={() => this.props.onLike(movie)}
        />
      )
    },
    {
      path:"delete",
      key: "delete",
      label: "Delete",
      content: movie => (
        <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger">
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
