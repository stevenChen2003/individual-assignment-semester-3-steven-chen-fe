import React, { useState } from "react";
import ShowtimeForm from "../../components/adminComponents/ShowtimeForm";

export default function ShowtimePage() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <button onClick={handleShow}>Add show</button>
      <ShowtimeForm show={show} onHide={handleClose} />
    </div>
  );
}
