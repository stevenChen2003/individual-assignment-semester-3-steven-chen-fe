import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import poster_test from '../../assets/images/poster_test.jpg';

const MovieCard = ({ id, title, genre, imageURL }) => {
  const [isHovered, setHovered] = useState(false);
  const imageHeight = '280px';

  return (
    <Card
      as={Link}
      to={`/movie/${id}`}
      style={{
        width: '15rem',
        margin: '10px',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 0 15px rgba(0, 0, 0, 0.3)' : 'none',
        textDecoration: 'none', 
      }}
      className="shadow"
      bg="light"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Card.Img
        variant="top"
        src={imageURL}
        alt={title}
        style={{ height: imageHeight, objectFit: 'cover' }}
      />
      <Card.Body style={{ height: '100px' }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Genre: {genre}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;










