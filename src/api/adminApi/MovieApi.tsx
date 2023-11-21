import axios from "axios";
import TokenManager from "../TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const MovieApi = {

    getMovies: () => axios.get(`/movies`)
    .then(response => response.data.movies),

    getMovie: (movieId) => axios.get(`/movies/${movieId}`).then((response) => response.data),

    postMovie: (newMovie) => axios.post("/movies", newMovie,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    updateMovie: (updateMovie) => axios.put(`/movies/${updateMovie.id}`, updateMovie, 
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    deleteMovie: (movieId) => axios.delete(`/movies/${movieId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then((response) => response.data)

}

export default MovieApi