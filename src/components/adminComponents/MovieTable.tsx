import React from 'react';
import MovieItem from './MovieItem';
import { Table } from 'react-bootstrap';

export default function MovieTable(props) {
  
  const { movieItems, refreshMovieList } = props;

  const containerStyle = {
    maxHeight: '750px', 
    overflowY: 'auto', 
  };
  

  return (
    <div style={containerStyle}>
      <Table striped bordered hover>
        <thead className='sticky-top bg-white'>
          <th>Movie ID</th>
          <th>Title</th>
          <th>Genre</th>
          <th>Poster</th>
          <th>Action</th>
        </thead>
        <tbody>
          {movieItems.map((movie) => 
          (
            <MovieItem key={movie.movieId} movie={movie} refreshMovieList={refreshMovieList}/>
          ))}
        </tbody>
      </Table>


    </div>

  );
}
