import React from "react";
import { Navigate } from "react-router-dom";
import TokenManager from "../api/TokenManager";

const PrivateRoute = ({ roles, children }) => {
  console.log(children);
  const claims = TokenManager.getClaims();

  // Check if the user has the required roles
  if (claims?.roles?.some((role) => roles.includes(role))) {
    return children;
  } else if (claims != null) {
    if (claims.roles == "Admin") {
      return <Navigate to="/admin/movie"/>;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    // Redirect to the login page if the user doesn't have the required roles
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
