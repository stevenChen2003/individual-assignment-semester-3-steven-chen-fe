import React from 'react'
import { useParams } from 'react-router-dom'
import EditMovieForm from '../../components/adminComponents/EditMovieForm';

export default function EditMoviePage() {

    const { id } = useParams();

    return (
        <div className="container">
            <h2>Edit Movie</h2>
            <EditMovieForm movieId={id}/>
        </div>
    )
}
