import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button, Form, Modal } from "react-bootstrap";
import ShowtimeApi from "../../api/ShowtimeApi";
import { ToastContainer, toast } from "react-toastify";

export default function EditForm({
  show,
  onHide,
  initialShowtime,
  onRedirect,
}) {
  const [showtime, setShowtime] = useState(initialShowtime);

  const handleChange = (e) => {
    setShowtime({ ...showtime, [e.target.name]: e.target.value });
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  const handleSave = () => {
    console.log("Tets", showtime);
    const formattedShowtime = {
      showtimeId: showtime.showtimeId,
      hallId: showtime.hall.hallId,
      movieId: showtime.movie.movieId,
      pricePerSeat: showtime.pricePerSeat,
      startTime: format(
        new Date(showtime.startTime),
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      ),
      endTime: format(
        new Date(showtime.endTime),
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      ),
    };

    if (formattedShowtime.startTime >= formattedShowtime.endTime) {
      toast.error("Start time must be before end time", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      return;
    }

    // Check if start time and end time are on the same day
    const sameDay = isSameDay(
      new Date(formattedShowtime.startTime),
      new Date(formattedShowtime.endTime)
    );

    if (!sameDay) {
      console.log("Start time and end time must be on the same day");

      // Show an error toast
      toast.error("Start time and end time must be on the same day", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    
    ShowtimeApi.updateShowtime(formattedShowtime)
    .then((response) => {
      console.log(response);
      onHide();
      onRedirect();
    })
    .catch((error) => {
      console.error("Error creating show:", error);
      toast.error("There is time conflict with other shows", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <ToastContainer />
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
