import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import CinemaApi from "../../api/CinemaApi";

export default function ShowCard({ showtime }) {
  const [cinema, setCinema] = useState('');
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

  useEffect(() => {
    console.log(showtime);
    console.log(showtime.hall.cinemaId);
    CinemaApi.getCinema(showtime.hall.cinemaId)
        .then((response) => {
          setCinema(response.name);
        })
        .catch((error) => {
          console.error("Error fetching cinema details:", error);
        });
  }, []);

  return (
    <Card>
      <Row>
        <Col className="m-2 border-end border-3 border-grey">
          {" "}
          {/* Added border-end class */}
          <Card.Title>{showtime.movie.title}</Card.Title>
          <Card.Img variant="top" src={showtime.movie.imageURL} />
        </Col>
        <Col className="m-2">
          <Card.Text>
            <strong>Date:</strong> {date}
            <br />
            <strong>Start Time:</strong> {formattedStartTime}
            <br />
            <strong>End Time:</strong> {formattedEndTime}
            <br />
            <strong>Price per Seat:</strong> {showtime.pricePerSeat.toFixed(2)}
          </Card.Text>
          <Card.Text>
            <strong>Location:</strong> {cinema}
            <br />
            <strong>Hall Number:</strong> {showtime.hall.hallNumber}
          </Card.Text>
        </Col>
      </Row>
    </Card>
  );
}
