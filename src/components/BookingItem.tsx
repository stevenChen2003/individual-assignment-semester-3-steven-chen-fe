import React from "react";
import { format } from "date-fns";

export default function BookingItem({ booking }) {
  const formattedDate = format(
    new Date(booking.bookingDate),
    "yyyy-MM-dd HH:mm"
  );

  return (
    <tr>
      <td>{booking.user.userId}</td>
      <td>{booking.user.email}</td>
      <td>{booking.status}</td>
      <td>{booking.price.toFixed(2)}</td>
      <td>{formattedDate}</td>
      <td>
        <button className="btn btn-primary mx-2">View Details</button>
      </td>
    </tr>
  );
}
