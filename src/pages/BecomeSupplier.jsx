import React, { useState } from "react";

export default function BecomeSupplier() {
  const [form, setForm] = useState({
    company: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    products: "",
    notes: "",
  });
  const [ok, setOk] = useState(false);

  function submit(e) {
    e.preventDefault();
    setOk(true);
    setTimeout(() => setOk(false), 3000);
  }

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">Become a Supplier</h1>
        <p className="muted">Submit details — our team will contact you (frontend-only).</p>
      </div>

      <div className="card">
        {ok && <div className="alert">Thanks. We received your supplier request (demo).</div>}

        <form className="form" onSubmit={submit}>
          <div className="grid grid--2">
            <div className="field">
              <label>Company Name *</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
            </div>
            <div className="field">
              <label>Contact Person *</label>
              <input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} required />
            </div>
            <div className="field">
              <label>Phone *</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <div className="field">
              <label>Email *</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="field">
              <label>City *</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div className="field">
              <label>Products you supply</label>
              <input value={form.products} onChange={(e) => setForm({ ...form, products: e.target.value })} placeholder="e.g., BP monitors, oximeters..." />
            </div>
            <div className="field field--full">
              <label>Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="4" />
            </div>
          </div>

          <div className="form__actions">
            <button className="btn btn--yellow" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
