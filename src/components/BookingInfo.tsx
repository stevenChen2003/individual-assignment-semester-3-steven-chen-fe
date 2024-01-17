import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import BookingApi from "../api/BookingApi";
import TokenManager from "../api/TokenManager";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import StripeButton from "./commonComponents/StripeButton";

const BookingInformation = ({ selectedSeats, showtime }) => {
  const navigate = useNavigate();

  const calculateTotalAmount = () => {
    const totalAmount = selectedSeats.length * showtime.pricePerSeat;
    return totalAmount.toFixed(2);
  };

  const handleProceedToPayment = async () => {
    const showSeatIds = selectedSeats.map(seat => seat.seatId);
    const claims = TokenManager.getClaims();
    const bookingRequest = {
      userId: claims.userId,
      showId: showtime.showtimeId,
      bookingDate: new Date(),
      showSeatIds: showSeatIds,
    };

    try {
      await BookingApi.addBooking(bookingRequest);
      console.log("Booking successful!", bookingRequest);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Error during booking", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer/>
      <Card>
        <Card.Body>
          <Card.Title>Booking Information</Card.Title>
          <hr></hr>
          <Card.Text>
            <strong>Selected Seats:</strong>
            <br></br>
            {selectedSeats.length === 0 ? (
              <span> No seats selected</span>
            ) : (
              <ul>
                {selectedSeats.map((seat) => (
                  <li key={seat.seatId}>Seat: {seat.rowNumber}-{seat.seatNumber}</li>
                ))}
              </ul>
            )}
          </Card.Text>
          <Card.Text>
            <strong>Total Amount:</strong> {calculateTotalAmount()}
          </Card.Text>
          {selectedSeats.length > 0 ? (
           <StripeButton price={calculateTotalAmount()} handleProceedToPayment={handleProceedToPayment} />
         ) : (
           <span>Please select a seat before proceeding to payment.</span>
         )}
        </Card.Body>
      </Card>
    </>
  );
};

export default BookingInformation;
