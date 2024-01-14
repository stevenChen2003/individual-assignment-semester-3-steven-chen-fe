import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function BookingItem({ booking }) {
  const navigate = useNavigate();
  const formattedDate = format(
    new Date(booking.bookingDate),
    "yyyy-MM-dd HH:mm"
  );

  const handleNavigateBookingDetail= () => {
    navigate("/bookingDetails/" + booking.bookingId);
  };

  return (
    <tr>
      <td>{booking.user.userId}</td>
      <td>{booking.user.email}</td>
      <td>{booking.status}</td>
      <td>{booking.price.toFixed(2)}</td>
      <td>{formattedDate}</td>
      <td>
        <button onClick={handleNavigateBookingDetail} className="btn btn-primary mx-2">View Details</button>
      </td>
    </tr>
  );
}
