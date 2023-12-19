import React from 'react'
import WeeklyCalendar from '../components/commonComponents/WeeklyCalendar'

export default function CinemaPage() {
  return (
    <div>
      <div className='Container'>
        <WeeklyCalendar selectedDate={undefined} onDateChange={undefined}/>
      </div>
    </div>
  )
}
