import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import CinemaApi from "../../api/CinemaApi";
import HallApi from "../../api/HallApi";
import MovieApi from "../../api/MovieApi";
import ShowtimeApi from "../../api/ShowtimeApi";
import { ToastContainer, toast } from "react-toastify";

export default function ShowtimeForm({ show, onHide }) {
  const [cinemas, setCinemas] = useState([]);
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

  const [showtime, setShowtime] = useState({
    hallId: 0,
    movieId: 0,
    startTime: "",
    endTime: "",
    pricePerSeat: 0,
  });

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

  const cinemaOptions = cinemas.map((cinema) => ({
    value: cinema.cinemaId,
    label: cinema.name,
  }));

  const hallOptions = halls.map((hall) => ({
    value: hall.hallId,
    label: `Hall number: ${hall.hallNumber}`,
  }));

  //Sorting by Number
  hallOptions.sort((a, b) =>
    a.label.split(": ")[1].localeCompare(b.label.split(": ")[1])
  );

  const movieOptions = movies.map((movie) => ({
    value: movie.movieId,
    label: movie.title,
    image: movie.imageURL,
  }));

  const handleCinemaChange = (selectedOption) => {
    setSelectedCinema(selectedOption);
  };

  const handleChange = (e) => {
    setShowtime({ ...showtime, [e.target.name]: e.target.value });
    console.log(showtime);
  };

  const handleAddShow = () => {
    console.log("Showtime", showtime);
    const formattedShowtime = {
      ...showtime,
      startTime: format(new Date(showtime.startTime), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
      endTime: format(new Date(showtime.endTime), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    };
    // Make the API call here
    ShowtimeApi.addShowtime(formattedShowtime)
      .then((response) => {
        console.log(response);
        // Reset the showtime state
        setShowtime({
          hallId: 0,
          movieId: 0,
          startTime: "",
          endTime: "",
          pricePerSeat: 0,
        });
        setSelectedCinema(null);
        onHide();
      })
      .catch((error) => {
        console.error("Error creating show:", error);
        toast.error("There is time conflict with other shows", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      });
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setSelectedCinema(null);
      }}
      centered
    >
      <ToastContainer/>
      <Modal.Header closeButton>
        <Modal.Title>ShowtimeForm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="cinemaSelect">
                <Form.Label>Select Cinema:</Form.Label>
                <Select
                  options={cinemaOptions}
                  onChange={handleCinemaChange}
                  value={selectedCinema}
                  placeholder="Select a cinema"
                />
              </Form.Group>
            </Col>
            {selectedCinema && (
              <Col>
                <Form.Group controlId="hallSelect">
                  <Form.Label>Select Hall:</Form.Label>
                  <Select
                    options={hallOptions}
                    onChange={(selectedOption) =>
                      setShowtime({ ...showtime, hallId: selectedOption.value })
                    }
                    placeholder="Select a Hall"
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
          <Form.Group controlId="movieSelect">
            <Form.Label>Select Movie</Form.Label>
            <Select
              options={movieOptions}
              onChange={(selectedOption) =>
                setShowtime({ ...showtime, movieId: selectedOption.value })
              }
              placeholder="Select a Movie"
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
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              )}
            />
          </Form.Group>

          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startTime"
              onChange={handleChange}
              min={new Date(new Date().getTime()).toISOString().slice(0,10) + "T00:00"}
            />
          </Form.Group>
          <Form.Group controlId="endTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endTime"
              onChange={handleChange}
              min={new Date(new Date().getTime()).toISOString().slice(0,10) + "T00:00"}
            />
          </Form.Group>
          <Form.Group controlId="pricePerSeat">
            <Form.Label>Price Per Seat</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="pricePerSeat"
              onChange={handleChange}
            />
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
        <Button variant="primary" onClick={handleAddShow}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
