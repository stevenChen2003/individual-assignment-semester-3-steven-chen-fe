import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import BookingApi from "../api/BookingApi";
import TokenManager from "../api/TokenManager";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const BookingInformation = ({ selectedSeats, showtime }) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const navigate = useNavigate();

  const calculateTotalAmount = () => {
    const totalAmount = selectedSeats.length * showtime.pricePerSeat;
    return totalAmount.toFixed(2); // Format to two decimal places
  };

  const handleProceedToPayment = async () => {
    setIsPaymentSuccessful(true);
    const claims = TokenManager.getClaims();
    const bookingRequest = {
      userId: claims.userId,
      showId: showtime.showtimeId,
      bookingDate: new Date(),
      showSeatIds: selectedSeats,
    };

    try {
      await BookingApi.addBooking(bookingRequest);
      console.log("Booking successful!", bookingRequest);
      toast.success("Payment Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Please select seats", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setIsPaymentSuccessful(false);
    }
  };

  return (
    <>
      <ToastContainer/>
      <Card>
        <Card.Body>
          <Card.Title>Booking Information</Card.Title>
          <Card.Text>
            <strong>Selected Seats:</strong>
            {selectedSeats.length === 0 ? (
              <span> No seats selected</span>
            ) : (
              <ul>
                {selectedSeats.map((seatId) => (
                  <li key={seatId}>Seat {seatId}</li>
                ))}
              </ul>
            )}
          </Card.Text>
          <Card.Text>
            <strong>Total Amount:</strong> {calculateTotalAmount()}
          </Card.Text>
          <Button variant="primary" onClick={handleProceedToPayment} disabled={isPaymentSuccessful}>
            Proceed to Payment
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookingInformation;
