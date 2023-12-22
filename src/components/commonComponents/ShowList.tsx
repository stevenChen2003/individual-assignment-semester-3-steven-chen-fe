import React from 'react';
import ShowtimeCard from './ShowtimeCard';

export default function ShowList({ showtimes }) {
  return (
    <div className='d-flex flex-wrap'>
      {showtimes.length === 0 ? (
        <p>No shows</p>
      ) : (
        showtimes.showtimeList.map((show) => (
          <ShowtimeCard key={show.showtimeId} showtime={show} />
        ))
      )}
    </div>
  );
}

