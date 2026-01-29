import React from "react";
import { Link } from "react-router-dom";

export default function Returns() {
  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">Returns & Refunds</h1>
        <p className="muted">Simple placeholder page (demo).</p>
      </div>

      <div className="card">
        <p className="muted">
          In this demo build, returns and refunds are not connected to a backend yet.
          In a production system, you would request a return from your order details and track refund status here.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          <Link to="/orders" className="btn btn--yellow btn--small">Go to Orders</Link>
          <Link to="/support" className="btn btn--small">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
