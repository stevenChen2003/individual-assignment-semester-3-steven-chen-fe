import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HallCard = ({ hall }) => {
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
      </Card.Body>
    </Card>
  );
};

export default HallCard;
