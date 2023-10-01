import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = UserAuth();

  // If we're still determining the auth status, render nothing or a loading spinner.
  if (loading) {
    return null; // or return <LoadingSpinner />;
  }

  // If user is not logged in after determining auth status, navigate to login.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, display the passed children (in this case, Home component)
  return children;
}

export default ProtectedRoute;
