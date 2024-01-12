import { Table } from "react-bootstrap";
import BookingItem from "./BookingItem";

export function BookingTable({ bookings }) {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          {/* <th>Booking ID</th> */}
          <th>User ID</th>
          <th>Email</th>
          <th>Status</th>
          <th>Total Price</th>
          <th>Booking Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingItem key={bookings.bookingId} booking={booking} />
          ))
        ) : (
          <tr>
            <td colSpan="6">No bookings available.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
