/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const ListGroup = props => {
  const { genres, onSelectedGenre, selectedGenre, valueProperty, textProperty } = props;
  return (
    <div className="list-group">
      <a
        style={{ cursor: "pointer" }}
        className={(!genres.includes(selectedGenre)) ?  "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
        onClick={() => onSelectedGenre() }
      >
        All Genres
      </a>
      
      {genres.map(genre => (
        <a
          key={genre[valueProperty]}
          style={{ cursor: "pointer" }}
          className={(selectedGenre === genre) ?  "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
          onClick={() => onSelectedGenre(genre) }
        >
          {genre[textProperty]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
    textProperty : "name",
    valueProperty : "_id"
}

export default ListGroup;
