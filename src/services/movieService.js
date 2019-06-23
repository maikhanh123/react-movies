import http from "./httpService";
import {
    apiUrl
} from "../config.json";

const apiEndpoint = apiUrl + "movies";

export function getMovies() {
    return http.get(apiEndpoint)
}

export function deleteMovie(movieId) {
    return http.delete(apiEndpoint + "/" + movieId);
}

export function getMovie(id) {
    return http.get(movieUrl(id));
}

export function saveMovie(movie) {
    // const { data:genres } = http.get("http://localhost:3900/api/genres");
    // const { data:movies } = http.get(apiEndpoint);
    // let movieInDb;
    // if(!movie._id) {
    //     movieInDb = {};
    // } else {
    //     movieInDb = movies.find(m => m._id === movie._id)
    // }
    // console.log("movie", movie);
    // // console.log("genres", genres);
    // movieInDb.title = movie.title;
    // movieInDb.genreId = movie.genreId;
    // movieInDb.numberInStock = movie.numberInStock;
    // movieInDb.dailyRentalRate = movie.dailyRentalRate;

    // if (!movieInDb._id) {
    // //   movieInDb._id = Date.now().toString();
    // //   movies.push(movieInDb);
    //   http.post(apiEndpoint, movie);
    // }

    // return movieInDb;

    if (movie._id) {
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }

    return http.post(apiEndpoint, movie);
}

function movieUrl(id) {
    return `${apiEndpoint}/${id}`;
}