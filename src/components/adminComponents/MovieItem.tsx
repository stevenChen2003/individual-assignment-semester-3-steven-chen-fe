import React from 'react'
import AdminMovieApi from '../../api/adminApi/AdminMovieApi';

export default function MovieItem(props) {

    const {movie, refreshMovieList} = props;

    const handleDeleteMovie = () => {
        const movieId = parseInt(movie.movieId, 10);

        AdminMovieApi.deleteMovie(movieId)
        .then(response => {refreshMovieList()})
    }

    return (
        <tr>
            <td>{movie.movieId}</td>
            <td>{movie.title}</td>
            <td>{movie.genre}</td>
            <td>{movie.rating}</td>
            <td className="d-flex">
                <button className="btn btn-primary mx-2">
                    Edit
                </button>
                <button className="btn btn-danger" onClick={handleDeleteMovie}>
                    Delete
                </button>
            </td>
        </tr>
    )
}
