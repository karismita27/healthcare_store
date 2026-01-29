import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function OrderSuccess() {
  const q = useQuery();
  const orderId = q.get("orderId") || "ORD-DEMO123";

  return (
    <div className="page">
      <div className="card success">
        <div className="success__icon">✓</div>
        <h1 className="pageTitle">Order Confirmed</h1>
        <p className="muted">Thank you. Your order has been placed successfully.</p>

        <div className="success__box">
          <div className="muted small">Order ID</div>
          <div className="success__id">{orderId}</div>
        </div>

        <div className="success__actions">
          <Link to="/products" className="btn btn--yellow">Continue Shopping</Link>
          <Link to="/support" className="btn btn--ghost">Need Help?</Link>
        </div>
      </div>
    </div>
  );
}
