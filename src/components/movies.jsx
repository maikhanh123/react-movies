import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import {toast} from "react-toastify";

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
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();

    this.setState({
      genres: genres,
      movies: movies
    });
  }

  getData() {
    const {
      selectedGenre,
      movies,
      sortColumn,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;
    // const filtered = selectedGenre && selectedGenre._id
    //   ? movies.filter(m => m.genre._id === selectedGenre._id)
    //   : movies;

    let filtered = movies;
    if (searchQuery) {
      filtered = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = movies.filter(m => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const allMovies = paginate(currentPage, sorted, pageSize);

    return { totalCount: filtered.length, data: allMovies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { selectedGenre, genres, sortColumn, searchQuery } = this.state;

    if (count === 0) {
      return <h2>No have movie</h2>;
    }

    const { totalCount, data: allMovies } = this.getData();

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
          <Link to="/movie/new" className="btn btn-primary">
            New Movie
          </Link>
          <h2>Showing {totalCount} movies in the database</h2>

          <input
            name="search"
            value={searchQuery}
            className="form-control my-3"
            placeholder="Search..."
            onChange={this.hanleSearch}
          />

          <br />

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

  hanleSearch = e => {
    const searchQuery = e.currentTarget.value;
    this.setState({
      searchQuery,
      selectedGenre: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };

  handleGenreChange = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: ""
    });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({
      movies // movies : movies (key and value is the same so can do like this)
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }

      this.setState({
        movies: originalMovies
      });
    }
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
