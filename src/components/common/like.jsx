import React, { Component } from "react";

class Like extends Component {
  // state = {
  //   liked: this.props.movie.liked
  // };

  // handleLike = () => {
  //   const liked = !this.props.liked;
  //   this.setState({
  //       liked
  //   });
  // };

  classes = () => {
    if (this.props.liked) {
      return "fa fa-heart";
    } else {
      return "fa fa-heart-o";
    }
  };

  render() {
    return (
      <i
        style={{ cursor: "pointer" }}
        className={this.classes()}
        aria-hidden="true"
        onClick={this.props.onClick}
      />
    );
  }
}

export default Like;
