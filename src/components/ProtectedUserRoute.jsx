import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * User-only route guard (excludes guest sessions).
 * Redirects to /auth and preserves the current path for post-login redirect.
 */
export default function ProtectedUserRoute({ children }) {
  const { auth } = useAuth();
  const loc = useLocation();

  const isUser = auth.status === "user";

  if (!isUser) {
    const redirect = encodeURIComponent(loc.pathname + (loc.search || ""));
    return <Navigate to={`/auth?redirect=${redirect}`} replace />;
  }

  return children;
}
