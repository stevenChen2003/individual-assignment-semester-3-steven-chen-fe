import axios from "axios";

const AdminMovieApi = {

    getMovies: () => axios.get("http://localhost:8080/movies")
    .then(repsonse => repsonse.data.movies),

    postMovie: (newMovie) => axios.post("http://localhost:8080/movies", newMovie)

}

export default AdminMovieApi