import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Account() {
  const { auth } = useAuth();
  const user = auth.user;

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">My Account</h1>
        <p className="muted">Basic profile details (frontend-only demo).</p>
      </div>

      <div className="card">
        <div className="grid grid--2">
          <div className="field">
            <label>Full Name</label>
            <input value={user?.name || ""} readOnly />
          </div>
          <div className="field">
            <label>Phone</label>
            <input value={user?.phone || ""} readOnly />
          </div>
          <div className="field field--full">
            <label>Email</label>
            <input value={user?.email || ""} readOnly />
          </div>
        </div>

        <p className="muted" style={{ marginTop: 12 }}>
          Note: You can extend this page later to support editing profile, password change, and business billing details.
        </p>
      </div>
    </div>
  );
}
