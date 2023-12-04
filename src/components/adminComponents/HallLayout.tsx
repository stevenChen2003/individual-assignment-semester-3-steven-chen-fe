import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './Hall.css';

const HallLayout = ({ hallLayout }) => {
  return (
    <Container className="hall-layout">
      {hallLayout.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((seat, seatIndex) => (
            <div key={seatIndex} className="seat">
              {seat}
            </div>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default HallLayout;
