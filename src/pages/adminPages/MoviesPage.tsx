import { useEffect, useState } from "react";
import MovieTable from "../../components/adminComponents/MovieTable";
import MovieApi from "../../api/adminApi/MovieApi";
import { useNavigate } from "react-router-dom";


function MoviePage() {
    const [movieItems, setMovieItems] = useState([]);

    const navigate = useNavigate();
    const navigateToAddMoviePage = () => {
        navigate('/addMovie');
      };

    //Refresh table
    useEffect(() => {
        refreshMovieList();
    },[])

    const refreshMovieList = () => {
        MovieApi.getMovies()
        .then(data => setMovieItems(data))
        .catch(error => console.log(error));
    }



    return (
        <div className="container">
            <MovieTable movieItems={movieItems} refreshMovieList={refreshMovieList}/>
            <div className="col-md-6 mt-3">
                <button className='btn btn-primary'  onClick={navigateToAddMoviePage}>+ Add Movie</button>
            </div> 
        </div>
    )
}

export default MoviePage;