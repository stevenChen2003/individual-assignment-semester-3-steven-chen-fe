import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ShowtimeCard({ showtime }) {
  const formattedStartTime = new Date(showtime.startTime).toLocaleTimeString(
    "nl-NL",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const formattedEndTime = new Date(showtime.endTime).toLocaleTimeString(
    "nl-NL",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const date = new Date(showtime.endTime).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Card className="container">
      <Row>
        <Col className="m-2 border-end border-3 border-grey" md="5">
          <Card.Title>{showtime.movie.title}</Card.Title>
          <Card.Img
            variant="top"
            src={showtime.movie.imageURL}
            style={{ height: "280px", width: "200px", objectFit: "cover" }}
          />
        </Col>
        <Col className="mt-2">
          <Card.Text>
            <strong>Date:</strong> {date}
            <br />
            <strong>Start Time:</strong> {formattedStartTime}
            <br />
            <strong>End Time:</strong> {formattedEndTime}
            <br />
            <strong>Price per Seat:</strong> {showtime.pricePerSeat.toFixed(2)}
          </Card.Text>
        </Col>
      </Row>
      <hr />
      <Button
        as={Link}
        to={`/show/${showtime.showtimeId}`}
        className="m-3"
        variant="primary"
      >
        Book
      </Button>
    </Card>
  );
}
