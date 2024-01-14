import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingApi from "../api/BookingApi";
import BookingDetail from "../components/BookingDetail";
import ShowCard from "../components/adminComponents/ShowCard";
import { Button } from "react-bootstrap";
import TokenManager from "../api/TokenManager";

export default function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const claims = TokenManager.getClaims();

  const getBookingInformation = async () => {
    try {
      const data = await BookingApi.getBookingDetails(id);
      console.log("Booking Data", data);
      setBooking(data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const cancelBooking = async () => {
    try {
      await BookingApi.cancelBooking(id);
      navigate(`/user/${claims.userId}`);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  useEffect(() => {
    getBookingInformation();
  }, [id]);

  return (
    <div className="container mt-3">
      <h2>Booking Details:</h2>
      <hr></hr>
      {booking === null ? (
        <p>No information</p>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-5">
              <h4>Show information</h4>
              <hr></hr>
              <ShowCard showtime={booking.showtime} />
            </div>
            <div className="col-1">

            </div>
            <div className="col-6">
              <BookingDetail booking={booking} />
            </div>
          </div>

          {claims.roles.includes("Customer") && booking.status == "PAID" && new Date(booking.showtime.endTime) > new Date() && (
            <div className="container mt-3">
              <Button variant="primary" onClick={cancelBooking}>
                Cancel booking
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
