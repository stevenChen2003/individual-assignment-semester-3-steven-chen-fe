import AddMovieForm from "../../components/adminComponents/AddMovieForm";
import AdminMovieApi from "../../api/adminApi/AdminMovieApi";
import { ToastContainer, toast } from 'react-toastify';

export default function AddMoviePage() {

  const handleAddMovie = (newMovie) => {
    
    AdminMovieApi.postMovie(newMovie)
    .then(response => {
      console.log("Movie added successfully:", response);
      toast.success('Movie added successfully');
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
      <h2>Add Movie</h2>
      <ToastContainer position="top-center" toastStyle={{ marginTop: '50px' }} />
      <AddMovieForm onAddMovie={handleAddMovie}/>
    </div>
  )
}
