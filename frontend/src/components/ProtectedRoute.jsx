import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, loggedIn, ...props }) {
  const isLoggedIn = localStorage.getItem("jwt");
  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRoute;
