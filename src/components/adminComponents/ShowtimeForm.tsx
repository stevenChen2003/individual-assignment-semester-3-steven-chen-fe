import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import CinemaApi from "../../api/CinemaApi";
import HallApi from "../../api/HallApi";
import MovieApi from "../../api/adminApi/MovieApi";

export default function ShowtimeForm({ show, onHide }) {
  const [cinemas, setCinemas] = useState([]);
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const moviesResponse = await MovieApi.getMovies();
        setMovies(moviesResponse);
        const cinemasResponse = await CinemaApi.getCinemas();
        setCinemas(cinemasResponse);
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        if (selectedCinema) {
          const hallsResponse = await HallApi.getHallsByCinema(
            selectedCinema.value
          );
          setHalls(hallsResponse);
        }
      } catch (error) {
        console.error("Error fetching halls:", error);
      }
    };

    fetchHalls();
  }, [selectedCinema]);

  const handleCinemaChange = (selectedOption) => {
    setSelectedCinema(selectedOption);
  };

  const cinemaOptions = cinemas.map((cinema) => ({
    value: cinema.cinemaId,
    label: cinema.name,
  }));

  const hallOptions = halls.map((hall) => ({
    value: hall.hallId,
    label: hall.hallNumber,
  }));

  const movieOptions = movies.map((movie) => ({
    value: movie.movieId,
    label: movie.title,
    image: movie.imageURL,
  }));

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>ShowtimeForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="cinemaSelect">
                <Form.Label>Select Cinema</Form.Label>
                <Select
                  options={cinemaOptions}
                  onChange={handleCinemaChange}
                  value={selectedCinema}
                />
              </Form.Group>
            </Col>
            {selectedCinema && (
              <Col>
                <Form.Group controlId="hallSelect">
                  <Form.Label>Select Hall</Form.Label>
                  <Select options={hallOptions} />
                </Form.Group>
              </Col>
            )}
          </Row>
          <Form.Group controlId="movieSelect">
            <Form.Label>Select Movie</Form.Label>
            <Select
            //change format in the future
              options={movieOptions}
              formatOptionLabel={(option) => (
                <div>
                  <img
                    src={option.image}
                    alt={option.label}
                    style={{
                      marginRight: "10px",
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      // borderRadius: "50%",
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              )}
            />
          </Form.Group>

          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control type="datetime-local" />
          </Form.Group>
          <Form.Group controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control type="datetime-local" />
          </Form.Group>
          <Form.Group controlId="pricePerSeat">
            <Form.Label>Price Per Seat</Form.Label>
            <Form.Control type="number" step="0.01" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            onHide();
            setSelectedCinema(null);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
