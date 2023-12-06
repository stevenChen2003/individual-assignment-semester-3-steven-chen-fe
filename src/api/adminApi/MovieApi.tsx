import axios from "axios";
import TokenManager from "../TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const MovieApi = {

    getMovies: () => axios.get(`/movies`)
    .then(response => response.data.movies),

    getMovie: (movieId: any) => axios.get(`/movies/${movieId}`).then((response) => response.data),

    postMovie: (newMovie: any) => axios.post("/movies", newMovie,
    {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${TokenManager.getAccessToken()}` 
        }
    }),

    updateMovie: (updateMovie: { id: any; }) => axios.put(`/movies/${updateMovie.id}`, updateMovie, 
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    deleteMovie: (movieId: any) => axios.delete(`/movies/${movieId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then((response) => response.data)

}

export default MovieApi