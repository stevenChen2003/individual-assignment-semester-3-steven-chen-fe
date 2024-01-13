import React from "react";
import { Link } from "react-router-dom";

const NavBarAdmin = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/movie">
          Movie
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/showtime">
          Showtime
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/booking">
          Booking
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/cinema">
          Cinema
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/chat">
          Chat
        </Link>
      </li>
    </>
  );
};

export default NavBarAdmin;
