import React from "react";

export default function BookingDetail({ booking }) {
  return (
    <div>
      <h4>Payment information:</h4>
      <hr></hr>
      <strong>Selected Seats:</strong>
      <ul>
        {booking.seatList.map((seat) => (
          <li key={seat.seatId}>Seat: {seat.rowNumber}-{seat.seatNumber}</li>
        ))}
      </ul>
      <strong>Status:</strong> {booking.status}
    </div>
  );
}
