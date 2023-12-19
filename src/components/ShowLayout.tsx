import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./adminComponents/Show.css";

const ShowLayout = ({ seats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatId)) {
        return prevSeats.filter((id) => id !== seatId);
      } else {
        return [...prevSeats, seatId];
      }
    });
  };

  // Group the seats by row number
  const groupedSeats = seats.reduce((groups, seat) => {
    if (!groups[seat.rowNumber]) {
      groups[seat.rowNumber] = [];
    }
    groups[seat.rowNumber].push(seat);
    return groups;
  }, {});

  return (
    <div className="container">
      {Object.values(groupedSeats).map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((seat) => (
            <div className="seat" key={seat.seatId}>
              <Button
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
