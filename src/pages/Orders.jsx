import React, { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { readJSON } from "../utils/storage.js";

export default function Orders() {
  const { auth } = useAuth();
  const userId = auth.user?.id;

  const STORAGE_KEY = useMemo(() => `hc_orders_${userId}`, [userId]);
  const [orders] = useState(() => readJSON(STORAGE_KEY, []));

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">My Orders</h1>
        <p className="muted">Order history stored locally (demo).</p>
      </div>

      <div className="card">
        {orders.length === 0 ? (
          <p className="muted">No orders yet.</p>
        ) : (
          <div className="tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 800 }}>{o.id}</td>
                    <td>{new Date(o.date).toLocaleString()}</td>
                    <td>{o.items?.length || 0}</td>
                    <td>₹{Number(o.total || 0).toFixed(0)}</td>
                    <td>{o.status || "Placed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="muted" style={{ marginTop: 12 }}>
          Note: This is a frontend-only demo. When you connect a backend, replace local storage with API calls.
        </p>
      </div>
    </div>
  );
}
