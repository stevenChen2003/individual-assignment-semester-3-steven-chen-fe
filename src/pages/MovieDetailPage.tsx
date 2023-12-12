import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieApi from '../api/MovieApi';
import { Container, Row, Col, Card } from 'react-bootstrap';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    id: 0,
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    durationInMin: 0,
    imageURL: ''
  });

  useEffect(() => {
    const getMovieInformation = async () => {
      try {
        const data = await MovieApi.getMovie(id);

        const formattedDate = data.releaseDate.split('T')[0];
        setMovie({
          id: data.movieId,
          title: data.title,
          description: data.description,
          genre: data.genre,
          releaseDate: formattedDate,
          durationInMin: data.durationInMin,
          imageURL: data.imageURL
        });
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    getMovieInformation();
  }, [id]);

  if (!movie.title) {
    // Loading state, you can replace it with a loading spinner or message
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card style={{ width: '100%' }}>
            <Card.Img
              variant="top"
              src={movie.imageURL}
              alt={movie.title}
            />
          </Card>
        </Col>
        <Col md={8}>
          <h2>{movie.title}</h2>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p>
            <strong>Duration:</strong> {movie.durationInMin} minutes
          </p>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
