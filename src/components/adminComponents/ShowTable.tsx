import React from "react";
import { Table } from "react-bootstrap";

export default function ShowTable({showtimes}) {
  const containerStyle = {
    maxHeight: "750px",
    overflowY: "auto",
  };
  return (
    <div style={containerStyle}>
      <Table striped bordered hover>
        <thead className="sticky-top bg-light">
          <th>Show ID</th>
          <th>Hall number</th>
          <th>Movie</th>
          <th>Start time</th>
          <th>End time</th>
        </thead>
        <tbody>
        </tbody>
      </Table>
    </div>
  );
}
