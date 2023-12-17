import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowtimeApi from '../api/ShowtimeApi';
import ShowCard from '../components/adminComponents/ShowCard';

export default function ShowDetailPage() {
  const { id } = useParams();
  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);

  const getShowInformation = async () => {
    try {
      const [showtimeData, seatsData] = await Promise.all([
        ShowtimeApi.getShowtime(id),
        ShowtimeApi.getSeats(id),
      ]);

      setShowtime(showtimeData);
      setSeats(seatsData);

      console.log(showtimeData);
      console.log(seatsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getShowInformation();
  }, [id]);

  return (
    <div className='container mt-4'>
      <h2>Show details:</h2>
      <hr></hr>
      {showtime === null ? (
        <p>No information</p>
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col-5'>
              <ShowCard showtime={showtime} />
            </div>
            <div className='col-7'>
              <h3>Test</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

