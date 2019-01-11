import React, { Component } from "react";
class Movie extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>{this.props.match.params.id}</h1>
        <button className="btn btn-primary" onClick={() => this.props.history.push('/movies')}>Save</button>
      </div>
    );
  }
}

export default Movie;
