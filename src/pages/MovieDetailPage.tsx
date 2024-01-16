import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MovieApi from "../api/MovieApi";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CinemaSelect from "../components/adminComponents/CinemaSelect";
import WeeklyCalendar from "../components/commonComponents/WeeklyCalendar";
import ShowList from "../components/commonComponents/ShowList";
import CinemaApi from "../api/CinemaApi";
import ShowtimeApi from "../api/ShowtimeApi";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    description: "",
    genre: "",
    releaseDate: "",
    durationInMin: 0,
    imageURL: "",
  });
  const [cinemas, setCinemas] = useState([]);
  const [date, setDate] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [cinema, setCinema] = useState({
    cinemaId: "",
    name: "",
    location: "",
    amountOfHalls: "",
  });

  const resultsRef = useRef(null);
  const handleSearchShows = () => {
    resultsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetCinemas = () => {
    CinemaApi.getCinemas()
      .then((response) => {
        setCinemas(response);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching cinemas:", error);
      });
  };

  const handleSelect = (selectedCinemaId) => {
    if (selectedCinemaId) {
      CinemaApi.getCinema(selectedCinemaId)
        .then((response) => {
          console.log(response);
          setCinema({
            cinemaId: response.cinemaId,
            name: response.name,
            location: response.location,
            amountOfHalls: response.amountOfHalls,
          });
        })
        .catch((error) => {
          console.error("Error fetching cinema details:", error);
        });
    } else {
      setCinema({
        cinemaId: "",
        name: "",
        location: "",
        amountOfHalls: "",
      });
    }
  };

  useEffect(() => {
    const getMovieInformation = async () => {
      try {
        const data = await MovieApi.getMovie(id);

        const formattedDate = data.releaseDate.split("T")[0];
        setMovie({
          id: data.movieId,
          title: data.title,
          description: data.description,
          genre: data.genre,
          releaseDate: formattedDate,
          durationInMin: data.durationInMin,
          imageURL: data.imageURL,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    handleGetCinemas();
    getMovieInformation();
  }, [id]);

  useEffect(() => {
    if (cinema.cinemaId && date) {
      ShowtimeApi.getShowtimeByCinemaAndMovieAndDay(
        cinema.cinemaId,
        movie.id,
        date
      )
        .then((response) => {
          setShowtimes(response);
        })
        .catch((error) => {
          console.error("Error fetching showtimes:", error);
        });
    }
  }, [cinema, date]);

  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
    setDate(date.toISOString().split("T")[0]);
    // Display shows based on the selected date
  };

  if (!movie.title) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid bg-warning">
        <Container className="p-5">
          <Row>
            <Col md={4}>
              <Card style={{ width: "95%" }}>
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
              <Button variant="secondary" className="mt-3"onClick={handleSearchShows}>Look for Shows</Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container p-3" ref={resultsRef}>
          <div className="row mt-3 vh-100">
            <div className="col-4 border-end border-dark">
              <h3>Cinema:</h3>
              <CinemaSelect
                cinemas={cinemas}
                onSelect={handleSelect}
                selectedCinema={cinema}
              />
            </div>
            <div className="col-8">
              <WeeklyCalendar onDateSelect={handleDateSelect} />
              <hr />
              <h2>Showtimes</h2>
              <div>
                <ShowList showtimes={showtimes} />
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default MovieDetailPage;
