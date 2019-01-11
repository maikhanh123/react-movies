import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

import Pagination from "./common/pagination";
import ListGroup from "./common/list-groupt";
import { paginate } from "../utils/paginate";
// import { moviesByGenre } from "../utils/movieByGenre";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({
      genres: getGenres(),
      movies: getMovies()
    });
  }

  getData() {
    const { selectedGenre, movies, sortColumn, pageSize, currentPage } = this.state;
    const filtered = selectedGenre
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;

    const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);

    const allMovies = paginate(
      currentPage,
      sorted,
      pageSize
    );

    return {totalCount: filtered.length, data: allMovies};
  }

  render() {
    const { length: count } = this.state.movies;
    const { selectedGenre, genres, sortColumn } = this.state;

    if (count === 0) {
      return <h2>No have movie</h2>;
    }
    
    const {totalCount, data:allMovies} = this.getData();

    return (
      <div className="row mt-5">
        <div className="col-3">
          <ListGroup
            genres={genres}
            onSelectedGenre={this.handleGenreChange}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col-9">
          <h2>Showing {totalCount} movies in the database</h2>

          <MoviesTable
            onSort={this.handleSort}
            sortColumn={sortColumn}
            movies={allMovies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />

          <Pagination
            itemsCount={totalCount}
            currentPage={this.state.currentPage}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    })
  };

  handleGenreChange = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({
      movies // movies : movies (key and value is the same so can do like this)
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i]._id === movie._id) {
        movies[i].liked = !movies[i].liked;
      }
    }

    this.setState({
      movies
    });
  };
}

export default Movies;
