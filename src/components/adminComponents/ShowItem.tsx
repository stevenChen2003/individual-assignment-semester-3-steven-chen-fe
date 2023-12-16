import React from 'react'

export default function ShowItem({show}) {
  console.log(show)
  return (
    <tr>
        <td>{show.showtimeId}</td>
        <td>{show.movie.title}</td>
    </tr>
  )
}
