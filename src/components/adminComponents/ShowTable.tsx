import React from "react";
import { Table } from "react-bootstrap";
import ShowItem from "./ShowItem";

export default function ShowTable({showtimes}) {
  const containerStyle = {
    maxHeight: "750px",
    overflowY: "auto",
  };

  console.log(showtimes)
  return (
    <div style={containerStyle}>
      <Table striped bordered hover>
        <thead className="mt-1 bg-light">
          <th>Show ID</th>
          <th>Movie</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Price per seat</th>
          <th>Action</th>
        </thead>
        <tbody>
          {showtimes.showtimeList && showtimes.showtimeList.length > 0 ? (
            showtimes.showtimeList.map((show) => (
              <ShowItem key={show.showtimeId} show={show} />
            ))
          ) : (
            <tr>
              <td colSpan="6">No showtimes available.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
