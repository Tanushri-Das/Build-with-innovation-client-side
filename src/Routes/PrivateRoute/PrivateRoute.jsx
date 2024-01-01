import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  const location = useLocation();

  if (authToken) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace>
      PrivateRoutes
    </Navigate>
  );
};

export default PrivateRoutes;
