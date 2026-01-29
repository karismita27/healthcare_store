import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="card">
        <h1 className="pageTitle">Page not found</h1>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn--yellow btn--small">Go Home</Link>
      </div>
    </div>
  );
}
