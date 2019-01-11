export function moviesByGenre(movies, genre) {
    return movies.filter(movie => movie.genre.name === genre);
}