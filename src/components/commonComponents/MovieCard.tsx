import React from 'react';
import poster_test from '../../assets/images/poster_test.jpg';

const MovieCard = ({ title, genre }) => {
  const imageHeight = '280px';

  return (
    <div className="card" style={{ width: '15rem', margin: '10px' }}>
      <img
        src={poster_test}
        className="card-img-top"
        alt={title}
        style={{ height: imageHeight, objectFit: 'cover' }}
      />
      <div className="card-body" style={{ height: '80px' }}>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Genre: {genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;






