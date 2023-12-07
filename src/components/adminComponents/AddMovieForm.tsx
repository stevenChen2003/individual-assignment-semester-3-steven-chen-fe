import React, { useState } from 'react';

const AddMovieForm = ({ onAddMovie }) => {

  const [movie, setMovie] = useState({
    id: 0,
    title: '',
    description: '',
    genre: '',
    rating: 0,
    releaseDate: '',
    durationInMin: 0,
  });

  const [file, setFile] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
        "request",
        new Blob([JSON.stringify(movie)], { type: "application/json" }),
    );

    if (file) {
      formData.append("file", file)
    }
    onAddMovie(formData);
    // Clear the form fields
    setMovie({
      id: 0,
      title: '',
      description: '',
      genre: '',
      rating: 0,
      releaseDate: '',
      durationInMin: 0,
    })
    setFile(null);
    document.getElementById('imageFile').value = '';
  };

  return (
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
      <div className="mb-3">
        <label htmlFor="imageFile" className="form-label">
          Upload Image
        </label>
        <input
          type="file"
          id="imageFile"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;
