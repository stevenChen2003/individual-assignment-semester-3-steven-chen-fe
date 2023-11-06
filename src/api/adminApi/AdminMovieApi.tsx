import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const AdminMovieApi = {

    getMovies: () => axios.get(`/movies`)
    .then(response => response.data.movies),

    getMovie: (movieId) => axios.get(`/movies/${movieId}`).then((response) => response.data),

    postMovie: (newMovie) => axios.post("/movies", newMovie),

    updateMovie: (updateMovie) => axios.put(`/movies/${updateMovie.id}`, updateMovie),

    deleteMovie: (movieId) => axios.delete(`/movies/${movieId}`).then((response) => response.data)

}

export default AdminMovieApi