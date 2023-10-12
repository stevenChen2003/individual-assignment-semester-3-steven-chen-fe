import React from 'react'

export default function MovieList(props) {
  
  const { movieItems } = props;

  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>Movie ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {movieItems.map((movie) => (
          <tr key={movie.movieId}>
            <td>{movie.movieId}</td>
            <td>{movie.title}</td>
            <td>{movie.description}</td>
            <td>{movie.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
