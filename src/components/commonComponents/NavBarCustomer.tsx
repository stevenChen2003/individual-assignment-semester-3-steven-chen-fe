import React from "react";
import { Link } from "react-router-dom";

const NavBarCustomer = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/cinema">
          Cinema
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/movie">
          Movie
        </Link>
      </li>
      {/* <>Booking</> */}
    </>
  );
};

export default NavBarCustomer;