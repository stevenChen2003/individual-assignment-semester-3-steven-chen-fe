import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const AdminMovieApi = {

    getMovies: () => axios.get("/movies")
    .then(response => response.data.movies),

    postMovie: (newMovie) => axios.post("/movies", newMovie)

}

export default AdminMovieApi