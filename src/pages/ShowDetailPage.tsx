import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowtimeApi from '../api/ShowtimeApi';

export default function ShowDetailPage() {
  const { id } = useParams();
  const [showtime, setShowtime] = useState([])
  const [seats, setSeats] = useState([])

  const getShowInformation = () => {
    ShowtimeApi.getShowtime(id)
    .then(data => {
      console.log(showtime);
      setShowtime(data);
    })
  };

  useEffect(() => {
    getShowInformation();
  }, [id]);
  
  return (
    <div className='container'>
      <h2>Test</h2>
    </div>
  )
}
