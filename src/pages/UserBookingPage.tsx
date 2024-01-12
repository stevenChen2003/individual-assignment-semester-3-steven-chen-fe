import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BookingTable } from "../components/BookingTable";
import PaginationComponent from "../components/commonComponents/Pagination";
import TokenManager from "../api/TokenManager";
import BookingApi from "../api/BookingApi";

export default function UserBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllBookings();
  }, [currentPage]);

  const fetchAllBookings = () => {
    const claims = TokenManager.getClaims();
    console.log("Test claims", claims);

    BookingApi.getAllBookingsByUser(claims.userId, currentPage, 5)
      .then((response) => {
        console.log(response.data.content);
        setBookings(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <Container className="mt-3">
      <h2>Booking history</h2>
      <BookingTable bookings={bookings} />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}
