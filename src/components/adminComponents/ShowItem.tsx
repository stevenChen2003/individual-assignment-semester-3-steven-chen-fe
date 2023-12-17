import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShowItem({ show }) {
  console.log(show);
  const navigate = useNavigate();

  const handleDeleteMovie = () => {
    //Need to add api later
    console.log(show);
  };

  const handleNavigateEditShowtime = () => {
    navigate("/admin/showtimeDetails/" + show.showtimeId);
  };

  const formattedStartTime = new Date(show.startTime).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedEndTime = new Date(show.endTime).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <tr>
      <td>{show.showtimeId}</td>
      <td>{show.movie.title}</td>
      <td>{formattedStartTime}</td>
      <td>{formattedEndTime}</td>
      <td>{show.pricePerSeat.toFixed(2)}</td>
      <td>
        <button
          className="btn btn-primary mx-2"
          onClick={handleNavigateEditShowtime}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDeleteMovie}>
          Delete
        </button>
      </td>
    </tr>
  );
}
