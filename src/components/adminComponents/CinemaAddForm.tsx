import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CinemaApi from "../../api/CinemaApi";
import { toast } from "react-toastify";

const CinemaAddForm = ({ show, handleClose, onGetCinemas }) => {
  const [cinema, setCinema] = useState({
    name: "",
    location: "",
    numHalls: "",
  });

  const handleChange = (e) => {
    setCinema({ ...cinema, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CinemaApi.addCinema(cinema)
      .then((response) => {
        onGetCinemas();
        console.log("Cinema added successfully:", response);
        toast.success("Cinema added successfully");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Cinema already exists error:", error.response.data);
          toast.error("Cinema already exists");
        } else {
          toast.error("Sorry, something went wrong");
        }
      });

    console.log(cinema);
    setCinema({
      name: "",
      location: "",
      numHalls: "",
    })
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Cinema</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Cinema Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cinema name"
              name="name"
              value={cinema.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={cinema.location}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Number of Halls</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of halls"
              name="numHalls"
              value={cinema.numHalls}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Add Cinema
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CinemaAddForm;
