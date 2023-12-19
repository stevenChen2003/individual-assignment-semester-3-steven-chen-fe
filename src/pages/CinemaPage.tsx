import React, { useEffect, useState } from "react";
import WeeklyCalendar from "../components/commonComponents/WeeklyCalendar";
import CinemaApi from "../api/CinemaApi";
import CinemaSelect from "../components/adminComponents/CinemaSelect";
import ShowTable from "../components/adminComponents/ShowTable";
import ShowtimeApi from "../api/ShowtimeApi";

export default function CinemaPage() {
  const [cinemas, setCinemas] = useState([]);
  const [date, setDate] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [cinema, setCinema] = useState({
    cinemaId: "",
    name: "",
    location: "",
    amountOfHalls: "",
  });

  const handleSelect = (selectedCinemaId) => {
    if (selectedCinemaId) {
      CinemaApi.getCinema(selectedCinemaId)
        .then((response) => {
          console.log(response);
          setCinema({
            cinemaId: response.cinemaId,
            name: response.name,
            location: response.location,
            amountOfHalls: response.amountOfHalls,
          });
        })
        .catch((error) => {
          console.error("Error fetching cinema details:", error);
        });
    } else {
      setCinema({
        cinemaId: "",
        name: "",
        location: "",
        amountOfHalls: "",
      });
    }
  };

  const handleGetCinemas = () => {
    CinemaApi.getCinemas()
      .then((response) => {
        setCinemas(response);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching cinemas:", error);
      });
  };

  useEffect(() => {
    handleGetCinemas();
  }, []);

  useEffect(() => {
    if (cinema.cinemaId && date) {
      ShowtimeApi.getShowtimeByCinemaAndDate(cinema.cinemaId, date)
        .then(response => {
          setShowtimes(response);
        })
        .catch(error => {
          console.error("Error fetching showtimes:", error);
        });
    }
  }, [cinema, date]);

  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
    setDate(date.toISOString().split('T')[0]);
    // Display shows based on the selected date
  };



  return (
    <div className="container-fluid">
      <h2></h2>
      <div className="container mt-3">
        <div className="row mt-5 vh-100">
          <div className="col-4 border-end border-dark">
            <h3>Cinema:</h3>
            <CinemaSelect
              cinemas={cinemas}
              onSelect={handleSelect}
              selectedCinema={cinema}
            />
          </div>
          <div className="col-8">
            <WeeklyCalendar onDateSelect={handleDateSelect} />
            <hr />
            <h2>Showtimes</h2>
            <div>
              <ShowTable showtimes={showtimes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
