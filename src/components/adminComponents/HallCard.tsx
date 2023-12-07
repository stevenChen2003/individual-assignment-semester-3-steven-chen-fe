import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HallApi from "../../api/HallApi";

const HallCard = ({ hall, setHalls }) => {
  const handleDelete = () => {
    console.log(hall);
    HallApi.deleteHall(hall.hallId)
    .then(response => {HallApi.getHallsByCinema(hall.cinemaId).then((response) => {
      console.log(response);
      setHalls(response);
    });})
  };

  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Title>{`Hall ${hall.hallNumber}`}</Card.Title>
        <Button
          as={Link}
          variant="primary"
          className="mt-2"
        >
          View Details
        </Button>
        <Button variant="danger"className="mt-2" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default HallCard;
