import React, { useEffect, useState } from "react";
import ShowtimeForm from "../../components/adminComponents/ShowtimeForm";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import CinemaApi from "../../api/CinemaApi";
import HallApi from "../../api/HallApi";
import ShowTable from "../../components/adminComponents/ShowTable";
import ShowtimeApi from "../../api/ShowtimeApi";

export default function ShowtimePage() {
  const [show, setShow] = useState(false);
  const [cinemas, setCinemas] = useState([]);
  const [halls, setHalls] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  const cinemaOptions = cinemas.map((cinema) => ({
    value: cinema.cinemaId,
    label: cinema.name,
  }));

  const hallOptions = halls.map((hall) => ({
    value: hall.hallId,
    label: `Hall number: ${hall.hallNumber}`,
  }));

  const handleCinemaChange = (selectedOption) => {
    setSelectedCinema(selectedOption);
  };

  const handleHallChange = (selectedOption) => {
    setSelectedHall(selectedOption);
    console.log(selectedHall);
    ShowtimeApi.getShowtimeByHallId(selectedOption.value)
    .then(response => {
      console.log(response);
      setShowtimes(response)
    })
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
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

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="container-fluid">
      <div className="container mt-4">
        <div className="row">
          <div className="col-4">
            <Select
              options={cinemaOptions}
              onChange={handleCinemaChange}
              value={selectedCinema}
              placeholder="Select a Cinema"
            />
            {selectedCinema && <Select options={hallOptions} onChange={handleHallChange} value={selectedHall} placeholder="Select a Hall"/>}
          </div>
          <div className="col-8">
            <Button variant="success" onClick={handleShow}>
              + Add show
            </Button>
          </div>
        </div>
        <hr></hr>

        <div className="container mt-3">
          <h2>Showtimes</h2>
          <div>
            <ShowTable showtimes={showtimes}/>
          </div>
        </div>

        <ShowtimeForm show={show} onHide={handleClose} />
      </div>
    </div>
  );
}
