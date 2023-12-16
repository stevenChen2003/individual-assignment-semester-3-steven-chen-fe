import React from "react";
import { Table } from "react-bootstrap";
import ShowItem from "./ShowItem";

export default function ShowTable({showtimes}) {
  const containerStyle = {
    maxHeight: "750px",
    overflowY: "auto",
  };
  return (
    <div style={containerStyle}>
      <Table striped bordered hover>
        <thead className="mt-1 bg-light">
          <th>Show ID</th>
          <th>Movie</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Price per seat</th>
        </thead>
        <tbody>
          {showtimes.map((show) => (
            <ShowItem key={show.showtimeId} show={show}/>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
