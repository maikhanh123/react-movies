import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import auth from '../services/authService';
import {Link} from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    { 
      path: "title", 
      label: "Title", 
      content: movie => (
        <Link to={`/movie/${movie._id}`} >
          {movie.title}
        </Link>
      ) 
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path:"like",
      // key: "like",
      label: "Like",
      content: movie => (
        <Like
          liked={movie.liked}
          movie={movie}
          onClick={() => this.props.onLike(movie)}
        />
      )
    }
    
  ];

  deleteColumn = {
      path:"delete",
      // key: "delete",
      label: "Delete",
      content: movie => (
        <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger">
          Delete
        </button>
      )
  }
  

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if(user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

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
