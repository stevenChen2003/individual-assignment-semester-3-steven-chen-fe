import React from 'react'
import MovieApi from '../../api/MovieApi';
import { useNavigate } from 'react-router-dom';

export default function MovieItem(props) {
    const navigate = useNavigate();
    const {movie, refreshMovieList} = props;

    const handleDeleteMovie = () => {
        const movieId = parseInt(movie.movieId, 10);

        MovieApi.deleteMovie(movieId)
        .then(response => {refreshMovieList()})
    }

    const handleNavigateEditMovie = () => {
        navigate("/editMovie/" + movie.movieId)
    }

    return (
        <tr>
            <td>{movie.movieId}</td>
            <td>{movie.title}</td>
            <td>{movie.genre}</td>
            <td>{movie.rating}</td>
            <td className="d-flex">
                <button className="btn btn-primary mx-2" onClick={handleNavigateEditMovie}>
                    Edit
                </button>
                <button className="btn btn-danger" onClick={handleDeleteMovie}>
                    Delete
                </button>
            </td>
        </tr>
    )
}
