import React, { useState } from "react";
import ShowtimeForm from "../../components/adminComponents/ShowtimeForm";
import { Button } from "react-bootstrap";

export default function ShowtimePage() {
  const [show, setShow] = useState(false);

  const handleDeleteShow = () => {

  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="container-fluid">
      <div className="container mt-3">
        <Button variant="success" onClick={handleShow}>Add show</Button>
        <ShowtimeForm show={show} onHide={handleClose} />
      </div>
    </div>
  );
}
