import React, { useState, useEffect } from "react";
import HallLayout from "../components/adminComponents/HallLayout";
import HallForm from "../components/adminComponents/HallForm";
import HallApi from "../api/HallApi";
import { useLocation, useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";

const HallPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cinemaId = state?.cinemaId;

  const [hallNumber, setHallNumber] = useState(1);
  const [seatPerRow, setSeatPerRow] = useState(5);
  const [totalRows, setNumRows] = useState(5);
  const [hallLayout, setHallLayout] = useState([]);

  useEffect(() => {
    updateHallLayout();
  }, [seatPerRow, totalRows]);

  const updateHallLayout = () => {
    const layout = [];

    for (let row = 1; row <= totalRows; row++) {
      const seats = [];
      for (let seat = 1; seat <= seatPerRow; seat++) {
        seats.push(`${row}-${seat}`);
      }
      layout.push(seats);
    }
    setHallLayout(layout);
  };

  const handleAddHall = async () => {
    try {
      const capacity = seatPerRow * totalRows;
      console.log(cinemaId)
      const newHall = {
        hallNumber,
        totalRows: totalRows,
        seatPerRows: seatPerRow,
        seatingCapacity: capacity,
        cinemaId: cinemaId,
      };
      console.log("Test",newHall)
      await HallApi.addHall(newHall);
      navigate(-1);
      console.log("Hall added successfully!");
    } catch (error) {
      console.error("Error adding hall:", error);
    }
  };

  return (
    <div className="container mt-2">
      <h2>Create Hall</h2>
      <HallForm
        hallNumber={hallNumber}
        setHallNumber={setHallNumber} 
        seatPerRow={seatPerRow}
        setSeatPerRow={setSeatPerRow}
        numRows={totalRows}
        setNumRows={setNumRows}/>
      <HallLayout hallLayout={hallLayout} />

      <Button variant="primary" onClick={handleAddHall}>
        Add Hall
      </Button>
    </div>
  );
};

export default HallPage;
