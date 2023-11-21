// MovieList.js
import React from 'react';
import MovieCard from '../commonComponents/MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="d-flex flex-wrap">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          genre={movie.genre}
        />
      ))}
    </div>
  );
};

export default MovieList;
