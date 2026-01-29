import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { readJSON, writeJSON } from "../utils/storage.js";
import { useAuth } from "../context/AuthContext.jsx";

const COUPONS = {
  SAVE10: { code: "SAVE10", percent: 10 },
  HEALTH20: { code: "HEALTH20", percent: 20 },
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, discount, total, coupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const { auth } = useAuth();

  const userId = auth.user?.id;
  const [savedAddresses, setSavedAddresses] = useState(() => {
    if (auth.status === "user" && userId) return readJSON(`hc_addresses_${userId}`, []);
    return [];
  });
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (auth.status === "user" && userId) {
      setSavedAddresses(readJSON(`hc_addresses_${userId}`, []));
    } else {
      setSavedAddresses([]);
      setShowSaved(false);
    }
  }, [auth.status, userId]);

  const defaultSaved = useMemo(() => {
    if (!savedAddresses || savedAddresses.length === 0) return null;
    return savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
  }, [savedAddresses]);

  function useSavedAddress(a) {
    if (!a) return;
    setAddress((prev) => ({
      ...prev,
      fullName: a.fullName || prev.fullName,
      phone: a.phone || prev.phone,
      line1: a.line1 || "",
      city: a.city || "",
      state: a.state || "",
      pincode: a.pincode || "",
    }));
    setMsg(`Using saved address${a.label ? ` (${a.label})` : ""}.`);
  }

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const delivery = useMemo(() => (subtotal >= 999 ? 0 : 60), [subtotal]);
  const grandTotal = total + delivery;

  const [address, setAddress] = useState(() => {
    if (auth.status === "guest" && auth.guest) {
      return {
        fullName: auth.guest.fullName || "",
        phone: auth.guest.phone || "",
        line1: auth.guest.address || "",
        city: auth.guest.city || "",
        state: auth.guest.state || "",
        pincode: auth.guest.pincode || "",
        email: auth.guest.email || "",
      };
    }
    if (auth.status === "user" && auth.user) {
      return {
        fullName: auth.user.name || "",
        phone: auth.user.phone || "",
        line1: "",
        city: "",
        state: "",
        pincode: "",
        email: auth.user.email || "",
      };
    }
    return { fullName: "", phone: "", line1: "", city: "", state: "", pincode: "", email: "" };
  });

  const [payment, setPayment] = useState("cod");

  const empty = items.length === 0;

  function onApply(e) {
    e.preventDefault();
    setMsg("");
    const k = code.trim().toUpperCase();
    if (!k) return setMsg("Enter a coupon code.");
    const c = COUPONS[k];
    if (!c) return setMsg("Invalid coupon.");
    applyCoupon(c);
    setMsg(`Coupon ${c.code} applied (${c.percent}% off).`);
  }

  function validate() {
    const required = ["fullName", "phone", "line1", "city", "state", "pincode"];
    for (const k of required) {
      if (!String(address[k] || "").trim()) return false;
    }
    return true;
  }

  function placeOrder() {
    if (empty) return;
    if (!validate()) {
      setMsg("Please fill all required address fields.");
      return;
    }
    const orderId = `ORD-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;

    // Save order locally for logged-in users (demo)
    if (auth.status === "user" && auth.user?.id) {
      const key = `hc_orders_${auth.user.id}`;
      const existing = readJSON(key, []);
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        total: grandTotal,
        status: "Placed",
        items: (items || []).map((it) => ({ id: it.id, name: it.name, price: it.price, qty: it.qty })),
      };
      writeJSON(key, [order, ...existing]);
    }

    clearCart();
    navigate(`/order-success?orderId=${encodeURIComponent(orderId)}`, { replace: true });
  }

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">Checkout</h1>
        <p className="muted">Confirm address and payment to place order (frontend-only).</p>
      </div>

      {empty ? (
        <div className="card">
          <p className="muted">No items in cart.</p>
          <Link to="/products" className="btn btn--yellow btn--small">Browse Products</Link>
        </div>
      ) : (
        <div className="checkoutGrid">
          <div className="card">
            <div className="checkoutBlock">
              <h2 className="checkoutTitle">Address</h2>

              {auth.status === "user" && auth.user?.id && (
                <>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: -10, marginBottom: 12 }}>
                    <button
                      className="btn btn--small"
                      type="button"
                      onClick={() => useSavedAddress(defaultSaved)}
                      disabled={!defaultSaved}
                    >
                      Use Default Address
                    </button>
                    <button
                      className="btn btn--small btn--ghost"
                      type="button"
                      onClick={() => setShowSaved((s) => !s)}
                      disabled={savedAddresses.length === 0}
                    >
                      {showSaved ? "Hide Saved Addresses" : "Saved Addresses"}
                    </button>
                  </div>

                  {savedAddresses.length === 0 && (
                    <div className="muted small" style={{ marginTop: -6, marginBottom: 12 }}>
                      No saved addresses yet. Add one in <Link to="/addresses" className="linkInline">My Addresses</Link>.
                    </div>
                  )}

                  {showSaved && savedAddresses.length > 0 && (
                    <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
                      {savedAddresses.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          className="miniCard"
                          style={{ textAlign: "left", width: "100%" }}
                          onClick={() => useSavedAddress(a)}
                        >
                          <div>{a.label}{a.isDefault ? " • Default" : ""}</div>
                          <div className="muted" style={{ marginTop: 4 }}>
                            {a.fullName} • {a.phone}
                          </div>
                          <div className="muted" style={{ marginTop: 4 }}>
                            {a.line1}, {a.city}, {a.state} - {a.pincode}{a.landmark ? ` • ${a.landmark}` : ""}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="grid grid--2">
                <div className="field">
                  <label>Full Name *</label>
                  <input value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                </div>
                <div className="field">
                  <label>Phone *</label>
                  <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                </div>
                <div className="field field--full">
                  <label>Address *</label>
                  <input value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="House / Street / Area" />
                </div>
                <div className="field">
                  <label>City *</label>
                  <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div className="field">
                  <label>State *</label>
                  <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                </div>
                <div className="field">
                  <label>Pincode *</label>
                  <input value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email (optional)</label>
                  <input value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="checkoutBlock">
              <h2 className="checkoutTitle">Delivery Option</h2>
              <div className="muted">Standard delivery (2–5 days) • {delivery === 0 ? "Free above ₹999" : "₹60"}</div>
            </div>

            <div className="checkoutBlock">
              <h2 className="checkoutTitle">Payment Method</h2>
              <div className="radioRow">
                <label className="radio">
                  <input type="radio" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                  <span>Cash on Delivery</span>
                </label>
                <label className="radio">
                  <input type="radio" checked={payment === "online"} onChange={() => setPayment("online")} />
                  <span>Online Payment (demo)</span>
                </label>
              </div>
              <div className="muted small">This is demo UI (no real payment gateway).</div>
            </div>
          </div>

          <div className="card summary">
            <div className="summary__title">Order Summary</div>

            <form className="coupon" onSubmit={onApply}>
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Apply coupon" />
              <button className="btn btn--ghost btn--small" type="submit">Apply</button>
            </form>

            <div className="muted small" style={{ marginTop: 10 }}>Available coupons</div>
            <div className="chips" style={{ marginTop: 8 }}>
              {Object.values(COUPONS).map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className="btn btn--small btn--ghost"
                  onClick={() => {
                    setCode(c.code);
                    applyCoupon(c);
                    setMsg(`Coupon ${c.code} applied (${c.percent}% off).`);
                  }}
                >
                  {c.code} ({c.percent}% off)
                </button>
              ))}
            </div>

            {coupon && (
              <div className="couponApplied">
                <span>Applied: <strong>{coupon.code}</strong> ({coupon.percent}% off)</span>
                <button className="linkBtn" type="button" onClick={removeCoupon}>Remove</button>
              </div>
            )}

            {msg && <div className={msg.startsWith("Invalid") ? "alert alert--error" : "alert"}>{msg}</div>}

            <div className="summary__rows">
              <div className="row">
                <span className="muted">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="row">
                <span className="muted">Discount</span>
                <span>− ₹{discount}</span>
              </div>
              <div className="row">
                <span className="muted">Delivery</span>
                <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
              </div>
              <div className="divider" />
              <div className="row row--total">
                <span>Total Amount</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button className="btn btn--yellow btn--wide" type="button" onClick={placeOrder}>
              Place Order
            </button>

            <div className="muted small">By placing order, you agree to basic demo terms.</div>
          </div>
        </div>
      )}
    </div>
  );
}
