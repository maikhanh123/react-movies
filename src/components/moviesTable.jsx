import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  // raiseSort = (path) => {
  //   const sortColumn = { ...this.props.sortColumn };
  //   if (sortColumn.path === path) {
  //     sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  //   } else {
  //     sortColumn.path = path;
  //     sortColumn.order = "asc";
  //   }
  //   this.props.onSort(sortColumn);
  // };

  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
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
    const { movies, onLike, onDelete } = this.props;
    return (
      <table className="table">
        <TableHeader
          sortColumn={this.props.sortColumn}
          onSort={this.props.onSort}
          columns={this.columns}
        />
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <th scope="row">{movie.title}</th>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  liked={movie.liked}
                  movie={movie}
                  onClick={() => onLike(movie)}
                />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
