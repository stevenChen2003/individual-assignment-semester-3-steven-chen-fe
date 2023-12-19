import React, { useState } from "react";

const WeeklyCalendar = ({ onDateSelect }) => {
  const [selectedDates, setSelectedDates] = useState({});

  const generateDateButtons = () => {
    const currentDate = new Date();
    const dateButtons = [...Array(7)].map((_, i) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      const buttonStyle = {
        backgroundColor: selectedDates[date.toDateString()] ? "yellow" : "",
      };

      return (
        <button
          className="btn btn-secondary text-dark mx-1"
          style={buttonStyle}
          key={i}
          onClick={() => handleDateClick(date)}
        >
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </button>
      );
    });

    return dateButtons;
  };

  const handleDateClick = (date) => {
    setSelectedDates((prevDates) => {
      const newDates = {};
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date);
        currentDate.setDate(date.getDate() + i);
        newDates[currentDate.toDateString()] = false;
      }
      newDates[date.toDateString()] = true;
      onDateSelect(date);
      return newDates;
    });
  };

  return <div>{generateDateButtons()}</div>;
};

export default WeeklyCalendar;

