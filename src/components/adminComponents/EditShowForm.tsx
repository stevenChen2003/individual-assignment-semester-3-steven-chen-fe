import React, { useState } from "react";
import { format } from 'date-fns';
import { Button, Form, Modal } from "react-bootstrap";
import ShowtimeApi from "../../api/ShowtimeApi";

export default function EditForm({ show, onHide, initialShowtime }) {
 const [showtime, setShowtime] = useState(initialShowtime);

 const handleChange = (e) => {
  setShowtime({ ...showtime, [e.target.name]: e.target.value });
 };

 const handleSave = () => {
  console.log("Tets",showtime)
  const formattedShowtime = {
    showtimeId: showtime.showtimeId,
    hallId: showtime.hall.hallId,
    movieId: showtime.movie.movieId,
    pricePerSeat: showtime.pricePerSeat,
    startTime: format(new Date(showtime.startTime), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
    endTime: format(new Date(showtime.endTime), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
  };
  console.log("For", formattedShowtime)
  ShowtimeApi.updateShowtime(formattedShowtime);
  setShowtime(initialShowtime);
  onHide();
 };

 return (
  <Modal
    show={show}
    onHide={onHide}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Edit Showtime</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="startTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="startTime"
            value={showtime.startTime}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="endTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="endTime"
            value={showtime.endTime}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
 );
}

