import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Pagination } from 'react-bootstrap';
import { BookingTable } from '../../components/BookingTable';
import BookingApi from '../../api/BookingApi';
import PaginationComponent from '../../components/commonComponents/Pagination';

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [searchUserId, setSearchUserId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAllBookings();
  }, [currentPage]);

  const fetchAllBookings = () => {
    const apiCall = searchUserId
      ? BookingApi.getAllBookingsByUser(searchUserId, currentPage, 5)
      : BookingApi.getAllBookings(currentPage, 5);

    apiCall
      .then((response) => {
        console.log(response.data.content);
        setBookings(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error('Error fetching bookings:', error));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchAllBookings();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <Container className='mt-3'>
      <Form>
        <Form.Group controlId="formUserId">
          <Form.Label>Search by User ID:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter User ID"
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <button type="button" className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </Form.Group>
      </Form>

      <BookingTable bookings={bookings} />
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
    </Container>
  );
}
