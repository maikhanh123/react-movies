import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {};

  renderCell = (movie, column) => {
    if (column.content) return column.content(movie);
    // let c = (column.path);
    return _.get(movie,column.path);    //get value of movie follow path (movie.title; movie.genre.name)
  };

  render() {
    const { data: movies, columns } = this.props;
    return (
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            {columns.map(column => (
              <td key={movie._id + column.label}>
                {this.renderCell(movie, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
