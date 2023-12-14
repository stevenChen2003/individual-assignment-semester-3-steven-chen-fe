import React, { useEffect, useState } from "react";
import ShowtimeForm from "../../components/adminComponents/ShowtimeForm";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import CinemaApi from "../../api/CinemaApi";
import HallApi from "../../api/HallApi";

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
    label: hall.hallNumber,
  }));

  const handleCinemaChange = (selectedOption) => {
    setSelectedCinema(selectedOption);
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
            {selectedCinema && <Select options={hallOptions} />}
            <Button className="mt-3" variant="success" onClick={handleShow}>
              Add show
            </Button>
          </div>


          <div className="col-8">
            <h2 className="text-center">Showtimes</h2>
          </div>

        </div>
        <ShowtimeForm show={show} onHide={handleClose} />
      </div>
    </div>
  );
}
