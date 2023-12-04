import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import TokenManager from "../../api/TokenManager";

export default function NavBar() {
  const navigate = useNavigate();
  const claims = TokenManager.getClaims();
  const isLoggedIn = TokenManager.getAccessToken() !== null;

  //Button
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    TokenManager.clear();
    navigate("/");
  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width={170} height={55} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse${isExpanded ? " show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={`/user/${claims.userId}`}>
                    Personal
                  </Link>
                </li>
                {claims?.roles?.includes("Admin") && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/cinema">
                        Cinema
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/moviePage">
                        Movie
                      </Link>
                    </li>
                  </>
                )}

                {/* {claims?.roles?.includes('Customer') && (
                )} */}

                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
