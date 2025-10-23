import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, loggedIn, ...props }) {
  return loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;