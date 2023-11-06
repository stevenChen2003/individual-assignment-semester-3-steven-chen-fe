import React from 'react';
import MovieItem from './MovieItem';

export default function MovieList(props) {
  
  const { movieItems, refreshMovieList } = props;

  const containerStyle = {
    maxHeight: '500px', 
    overflowY: 'auto', 
  };
  

  return (
    <div style={containerStyle}>
      <table className='table table-striped mt-3'>
        <thead className='sticky-top'>
          <th>Movie ID</th>
          <th>Title</th>
          <th>Genre</th>
          <th>Rating</th>
          <th></th>
        </thead>
        <tbody>
          {movieItems.map((movie) => 
          (
            <MovieItem key={movie.id} movie={movie} refreshMovieList={refreshMovieList}/>
          ))}
        </tbody>
      </table>


    </div>

  );
}
