import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) {
      return <h2>No have movie</h2>;
    }
    return (
      <React.Fragment>
        <h2>Showing {count} movies in the database</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col">Like</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{this.renderTr()}</tbody>
        </table>

        <Pagination
          itemsCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }

  handlePageChange = (page) => {
    console.log(page);
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({
      movies // movies : movies (key and value is the same so can do like this)
    });
  };

  renderTr() {
    return this.state.movies.map(movie => (
      <tr key={movie._id}>
        <th scope="row">{movie.title}</th>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like movie={movie} />
        </td>
        <td>
          <button
            onClick={() => this.handleDelete(movie)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }
}

export default Movies;
