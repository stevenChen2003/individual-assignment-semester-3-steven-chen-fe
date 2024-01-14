import React, { useEffect, useState } from "react";
import ShowtimeForm from "../../components/adminComponents/ShowtimeForm";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import CinemaApi from "../../api/CinemaApi";
import HallApi from "../../api/HallApi";
import ShowTable from "../../components/adminComponents/ShowTable";
import ShowtimeApi from "../../api/ShowtimeApi";
import PaginationComponent from "../../components/commonComponents/Pagination";

export default function ShowtimePage() {
  const [show, setShow] = useState(false);
  const [cinemas, setCinemas] = useState([]);
  const [halls, setHalls] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
    setSelectedHall(null); // Reset selected hall when changing cinema
    setShowtimes([]); // Clear showtimes when changing cinema
  };

  const handleHallChange = (selectedOption) => {
    setSelectedHall(selectedOption);
    console.log(selectedHall);
    ShowtimeApi.getShowtimeByHallId(selectedOption.value, currentPage, 7)
    .then(response => {
      console.log("Content",response);
      setShowtimes(response.content)
      setTotalPages(response.totalPages)
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
  
  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
    // Fetch showtimes again when the page changes
    if (selectedHall) {
      ShowtimeApi.getShowtimeByHallId(selectedHall.value, page - 1, 7)
        .then(response => {
          setShowtimes(response.content);
          setTotalPages(response.totalPages);
        })
        .catch(error => {
          console.error("Error fetching showtimes:", error);
        });
    }
  };

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
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
          </div>
        </div>

        <ShowtimeForm show={show} onHide={handleClose} />
      </div>
    </div>
  );
}
