import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowtimeApi from "../../api/ShowtimeApi";
import ShowCard from "../../components/adminComponents/ShowCard";
import ShowLayout from "../../components/ShowLayout";
import EditForm from "../../components/adminComponents/EditShowForm";
import { Button } from "react-bootstrap";

export default function ShowDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const getShowInformation = async () => {
    try {
      const [showtimeData, seatsData] = await Promise.all([
        ShowtimeApi.getShowtime(id),
        ShowtimeApi.getSeats(id),
      ]);

      setShowtime(showtimeData);
      setSeats(seatsData.seats);

      console.log(showtimeData);
      console.log("Test", seatsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getShowInformation();
  }, []);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatId)) {
        return prevSeats.filter((id) => id !== seatId);
      } else if (prevSeats.length < 5) {
        return [...prevSeats, seatId];
      } else {
        return prevSeats;
      }
    });
  };

  const openEditForm = () => {
    setIsEditFormOpen(true);
  };

  const handleRedirect = () => {
    navigate(`/admin/showtime`);
  };
  

  return (
    <div className="container mt-4">
      <h2>Show details:</h2>
      <hr></hr>
      {showtime === null ? (
        <p>No information</p>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-5">
              <ShowCard showtime={showtime} />
            </div>
            <div className="col-7">
              <h3>Bookings:</h3>
              <ShowLayout
                seats={seats}
                selectedSeats={selectedSeats}
                handleSeatClick={handleSeatClick}
              />
              <Button onClick={openEditForm}>Edit Time</Button>
            </div>
          </div>
          {isEditFormOpen && (
            <EditForm
              show={isEditFormOpen}
              onHide={() => setIsEditFormOpen(false)}
              initialShowtime={showtime}
              onRedirect={handleRedirect}
            />
          )}
        </div>
      )}
    </div>
  );
}
