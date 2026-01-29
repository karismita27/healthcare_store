import React, { useState } from "react";
import { CATEGORIES } from "../data/products.js";

function emptyItem() {
  return { name: "", category: CATEGORIES[0], qty: 10 };
}

export default function BulkOrders() {
  const [items, setItems] = useState([emptyItem(), emptyItem()]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    pincode: "",
    gstInvoice: "No",
    deliveryAddress: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function updateItem(index, patch) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }

  function addRow() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function removeRow(i) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">Bulk Orders</h1>
        <p className="muted">
          Order in higher quantity for clinics, pharmacies or offices. Submit your request — our team will contact you to confirm stock and wholesale pricing.
        </p>
      </div>

      <div className="bulkSteps">
        <div className="step card">
          <div className="step__num">1</div>
          <div>
            <div className="step__title">Fill details + items</div>
            <div className="muted">Add product requirements and quantity.</div>
          </div>
        </div>
        <div className="step card">
          <div className="step__num">2</div>
          <div>
            <div className="step__title">We contact you</div>
            <div className="muted">Confirm availability & price on call/WhatsApp.</div>
          </div>
        </div>
        <div className="step card">
          <div className="step__num">3</div>
          <div>
            <div className="step__title">Converted to order</div>
            <div className="muted">After confirmation, admin creates your order.</div>
          </div>
        </div>
      </div>

      <div className="bulkGrid">
        <form className="card form" onSubmit={submit}>
          <h2 className="section__title">Request Details</h2>

          <div className="grid grid--2">
            <div className="field">
              <label>Full Name *</label>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            </div>
            <div className="field">
              <label>Phone (WhatsApp) *</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <div className="field">
              <label>Email (optional)</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field">
              <label>City *</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div className="field">
              <label>Pincode *</label>
              <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required />
            </div>
            <div className="field">
              <label>GST Invoice?</label>
              <select value={form.gstInvoice} onChange={(e) => setForm({ ...form, gstInvoice: e.target.value })}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="field field--full">
              <label>Delivery Address (optional)</label>
              <input value={form.deliveryAddress} onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })} />
            </div>
            <div className="field field--full">
              <label>Notes (optional)</label>
              <textarea
                rows="3"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Brand preference, budget, urgent delivery, etc."
              />
            </div>
          </div>

          <h3 className="section__title section__title--sm">Items & Quantity</h3>

          <div className="bulkItems">
            <div className="bulkItems__head">
              <span className="muted">Item / Product name</span>
              <span className="muted">Category</span>
              <span className="muted">Qty</span>
              <span />
            </div>

            {items.map((it, idx) => (
              <div key={idx} className="bulkRow">
                <input
                  value={it.name}
                  onChange={(e) => updateItem(idx, { name: e.target.value })}
                  placeholder="e.g., BP Machine / Glucometer / ..."
                />
                <select value={it.category} onChange={(e) => updateItem(idx, { category: e.target.value })}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  value={it.qty}
                  onChange={(e) => updateItem(idx, { qty: e.target.value })}
                  inputMode="numeric"
                />
                <button className="iconBtn" type="button" aria-label="Remove row" onClick={() => removeRow(idx)}>
                  ✕
                </button>
              </div>
            ))}

            <button className="btn btn--ghost btn--small" type="button" onClick={addRow}>
              + Add more item
            </button>
          </div>

          {submitted && <div className="alert">Request submitted (demo). We will contact you within 24 hours.</div>}

          <div className="form__actions">
            <button className="btn btn--yellow" type="submit">Submit Request</button>
          </div>
        </form>

        <div className="bulkSide">
          <div className="card">
            <div className="sideTitle">Bulk benefits</div>
            <div className="sideChecks">
              <div className="sideCheck">✓ Wholesale pricing after confirmation</div>
              <div className="sideCheck">✓ Priority support on call/WhatsApp</div>
              <div className="sideCheck">✓ Suitable for clinics & offices</div>
              <div className="sideCheck">✓ Invoice support (GST optional)</div>
            </div>
          </div>

          <div className="card">
            <div className="sideTitle">Need help?</div>
            <div className="muted">
              Call: +91 90000 00000 <br />
              Email: support@healthcare.com <br />
              Response: within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
