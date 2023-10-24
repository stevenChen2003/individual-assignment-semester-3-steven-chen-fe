import AddMovieForm from "../../components/adminComponents/AddMovieForm";
import AdminMovieApi from "../../api/adminApi/AdminMovieApi";

export default function AddMoviePage() {

  const handleAddMovie = (newMovie) => {
    
    AdminMovieApi.postMovie(newMovie)
    .then(response => {
      console.log("Movie added successfully:", response);
      alert('Movie added successfully');
    })
    .catch(error => {
      if (error.response.status === 400) {
        console.log("Movie already exists error:", error.response.data);
        alert("Movie already exists");
      } else {
        alert("Sorry, something went wrong");
      }
    });
    
    
  }

  return (
    <div className="container">
      <h2>Add Movie</h2>
      <AddMovieForm onAddMovie={handleAddMovie}/>
    </div>
  )
}
