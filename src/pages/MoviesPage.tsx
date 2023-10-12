import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import AdminMovieApi from "../api/AdminMovieApi";


function MoviePage() {
    const [movieItems, setMovieItems] = useState([]);

    /*
    const addItem = (title, description) => {
        
    }*/

    
    //Refresh table
    useEffect(() => {
        refreshMovieList();
    },[])

    const refreshMovieList = () => {
        AdminMovieApi.getMovies()
        .then(data => setMovieItems(data))
        .catch(error => console.log(error));
    }



    return (
        <div className="container">
            <MovieList movieItems={movieItems}/>
        </div>
    )
}

export default MoviePage;