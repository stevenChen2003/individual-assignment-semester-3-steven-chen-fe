import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingApi from "../api/BookingApi";
import BookingDetail from "../components/BookingDetail";
import ShowCard from "../components/adminComponents/ShowCard";

export default function BookingDetailPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  const getBookingInformation = async () => {
    try {
      const data = await BookingApi.getBookingDetails(id);
      console.log("Booking Data", data);
      setBooking(data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
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
        </div>
      )}
    </div>
  );
}
