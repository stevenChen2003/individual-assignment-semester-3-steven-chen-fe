import axios from "axios";

const AdminMovieApi = {

    getMovies: () => axios.get("http://localhost:8080/movies")
    .then(repsonse => repsonse.data.movies)

}

export default AdminMovieApi