import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./adminComponents/Show.css";

const ShowLayout = ({ seats, selectedSeats, handleSeatClick}) => {
 // Group the seats by row number
 const groupedSeats = seats.reduce((groups, seat) => {
  if (!groups[seat.rowNumber]) {
    groups[seat.rowNumber] = [];
  }
  groups[seat.rowNumber].push(seat);
  return groups;
 }, {});

 useEffect(() => {
  console.log("Booking", selectedSeats);
 }, [selectedSeats]);

 return (
  <div className="container">
    {Object.values(groupedSeats).map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((seat) => (
          <div className="seat" key={seat.seatId}>
            <Button
              disabled={seat.status == 'UNAVAILABLE'}
              className={`h-100 ${seat.status == 'UNAVAILABLE' ? 'unavailable-seat' : ''}`}
              variant={
               selectedSeats.includes(seat.seatId) ? "primary" : "secondary"
              }
              onClick={() => handleSeatClick(seat.seatId)}
            >
              {`${seat.rowNumber}-${seat.seatNumber}`}
            </Button>
          </div>
        ))}
      </Row>
    ))}
  </div>
 );
};

export default ShowLayout;
