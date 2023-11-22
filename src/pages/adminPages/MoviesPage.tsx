import { useEffect, useState } from "react";
import MovieTable from "../../components/adminComponents/MovieTable";
import MovieApi from "../../api/adminApi/MovieApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddMovieForm from "../../components/adminComponents/AddMovieForm";


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

    const handleAddMovie = (newMovie) => {
    
        MovieApi.postMovie(newMovie)
        .then(response => {
          console.log("Movie added successfully:", response);
          toast.success('Movie added successfully');
          refreshMovieList();
        })
        .catch(error => {
          if (error.response.status === 400) {
            console.log("Movie already exists error:", error.response.data);
            toast.error("Movie already exists");
          } else {
            toast.error("Sorry, something went wrong");
          }
        });
        
      }



    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <MovieTable movieItems={movieItems} refreshMovieList={refreshMovieList}/>
                </div>
                <div className="col-3">
                    <div className="container">
                    <h2>Add Movie</h2>
                    <ToastContainer position="top-center" toastStyle={{ marginTop: '50px' }} />
                    <AddMovieForm onAddMovie={handleAddMovie}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoviePage;