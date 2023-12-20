import React from "react";
import { Link } from "react-router-dom";

const NavBarNonLoggedIn = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Movie
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cinema">
          Cinema
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </>
  );
};

export default NavBarNonLoggedIn;
