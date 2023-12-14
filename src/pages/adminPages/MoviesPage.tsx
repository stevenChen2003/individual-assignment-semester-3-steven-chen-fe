import { useEffect, useState } from "react";
import MovieTable from "../../components/adminComponents/MovieTable";
import MovieApi from "../../api/MovieApi";
import { ToastContainer, toast } from "react-toastify";
import AddMovieForm from "../../components/adminComponents/AddMovieForm";


function MoviePage() {
    const [movieItems, setMovieItems] = useState([]);
    
    //Refresh table
    useEffect(() => {
        refreshMovieList();
    },[])

    const refreshMovieList = () => {
        MovieApi.getMovies()
        .then(data => setMovieItems(data))
        .catch(error => console.log(error));
    }

    const handleAddMovie = (formData) => {
   
      MovieApi.postMovie(formData)
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
            <div className="row mt-4">
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