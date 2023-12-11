import React, { useEffect, useState } from 'react'
import MovieApi from '../../api/adminApi/MovieApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditMovieForm(props) {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    id: 0,
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    durationInMin: 0,
  });

  const getMovieInformation = () => {
    MovieApi.getMovie(props.movieId)
    .then(data => {
      
      const formattedDate = data.releaseDate.split('T')[0];
      setMovie({
      id: data.movieId,
      title: data.title,
      description: data.description,
      genre: data.genre,
      releaseDate: formattedDate,
      durationInMin: data.durationInMin
    })})
  }

  //Update function
  const handleSubmit = (e) => {
    e.preventDefault();
    MovieApi.updateMovie(movie)
    .then(response => {
      showToast("Update succesfully", "success")

      //Delay for 2 sec and then redirect
      setTimeout(() => {
        navigate('/admin/movie');
      }, 2000);

    })
    .catch(error => {
      showToast("Update failed", "error")
    })
  }

  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: type === 'success' ? '#4CAF50' : '#FF5733',
        color: "#ffffff",
      },
    });
  }
  

  useEffect(() => {
    getMovieInformation()
  }, [props.movieId])
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={movie.description}
            onChange={(e) => setMovie({ ...movie, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            className="form-control"
            value={movie.genre}
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            className="form-control"
            value={movie.releaseDate}
            onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="durationInMin" className="form-label">
            Duration (in minutes)
          </label>
          <input
            type="number"
            id="durationInMin"
            min="0"
            className="form-control"
            value={movie.durationInMin}
            onChange={(e) => setMovie({ ...movie, durationInMin: parseInt(e.target.value) })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      <ToastContainer />
    </div>
    
  );
}
