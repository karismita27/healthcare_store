import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";

const COUPONS = {
  SAVE10: { code: "SAVE10", percent: 10 },
  HEALTH20: { code: "HEALTH20", percent: 20 },
};

export default function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, discount, total, setQty, removeItem, applyCoupon, removeCoupon, coupon } = useCart();

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const empty = items.length === 0;

  const delivery = useMemo(() => {
    if (subtotal >= 999) return 0;
    return empty ? 0 : 60;
  }, [subtotal, empty]);

  const grandTotal = total + delivery;

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

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">Your Cart</h1>
        <p className="muted">Cart items persist even before login (stored in localStorage).</p>
      </div>

      {empty ? (
        <div className="card">
          <p className="muted">Your cart is empty.</p>
          <Link to="/products" className="btn btn--yellow btn--small">Browse Products</Link>
        </div>
      ) : (
        <div className="cartGrid">
          <div className="card cartList">
            <div className="cartList__head">
              <div className="muted">Items</div>
              <div className="muted">Price</div>
            </div>

            {items.map((it) => (
              <div key={it.id} className="cartItem">
                <div className="cartItem__left">
                  <img src={it.image} alt={it.name} className="cartItem__img" />
                  <div className="cartItem__meta">
                    <div className="cartItem__name">{it.name}</div>
                    <div className="muted small">{it.brand} • {it.category}</div>

                    <div className="cartItem__controls">
                      <QuantityStepper value={it.qty} onChange={(v) => setQty(it.id, v)} />
                      <button className="linkBtn danger" type="button" onClick={() => removeItem(it.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="cartItem__price">
                  <div className="price">
                    <span className="price__now">₹{it.price * it.qty}</span>
                    <span className="price__mrp">₹{it.mrp * it.qty}</span>
                  </div>
                  <div className="muted small">₹{it.price} each</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card summary">
            <div className="summary__title">Order Summary</div>

            <form className="coupon" onSubmit={onApply}>
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Apply coupon" />
              <button className="btn btn--ghost btn--small" type="submit">Apply</button>
            </form>

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
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
              <div className="muted small">Note: You will save ₹{discount}</div>
            </div>

            <div className="summary__actions">
              <button className="btn btn--yellow" type="button" onClick={() => navigate("/checkout")}>
                Continue
              </button>
              <Link className="btn btn--ghost" to="/products">Add more items</Link>
            </div>

            <div className="muted small">Safe & Secure</div>
          </div>
        </div>
      )}
    </div>
  );
}
