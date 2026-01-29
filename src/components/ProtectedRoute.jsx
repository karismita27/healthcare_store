import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isAllowed } = useAuth();
  const loc = useLocation();

  if (!isAllowed) {
    const redirect = encodeURIComponent(loc.pathname + (loc.search || ""));
    return <Navigate to={`/auth?redirect=${redirect}`} replace />;
  }
  return children;
}
