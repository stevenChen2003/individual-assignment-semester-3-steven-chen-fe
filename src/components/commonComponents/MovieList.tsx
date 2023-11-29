import React from 'react';
import MovieCard from '../commonComponents/MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="d-flex flex-wrap">
      {movies.map((movie) => (
        <MovieCard
          key={movie.movieId}
          id={movie.movieId}
          title={movie.title}
          genre={movie.genre}
        />
      ))}
    </div>
  );
};

export default MovieList;
