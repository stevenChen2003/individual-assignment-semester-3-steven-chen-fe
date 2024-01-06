import React from "react";
import { Button, Card } from "react-bootstrap";

const BookingInformation = ({ selectedSeats, showtime }) => {
  const calculateTotalAmount = () => {
    const totalAmount = selectedSeats.length * showtime.pricePerSeat;
    return totalAmount.toFixed(2); // Format to two decimal places
  };

  return (
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
        <Button variant="primary">Proceed to Payment</Button>
      </Card.Body>
    </Card>
  );
};

export default BookingInformation;
