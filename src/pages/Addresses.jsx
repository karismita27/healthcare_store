import React, { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { readJSON, writeJSON } from "../utils/storage.js";

function safeId(prefix = "addr") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export default function Addresses() {
  const { auth } = useAuth();
  const userId = auth.user?.id;

  const STORAGE_KEY = useMemo(() => `hc_addresses_${userId}`, [userId]);

  const [list, setList] = useState(() => readJSON(STORAGE_KEY, []));
  const [form, setForm] = useState({
    label: "Home",
    fullName: auth.user?.name || "",
    phone: auth.user?.phone || "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [msg, setMsg] = useState("");

  function persist(next) {
    setList(next);
    writeJSON(STORAGE_KEY, next);
  }

  function setDefault(id) {
    const next = list.map((a) => ({ ...a, isDefault: a.id === id }));
    persist(next);
  }

  function remove(id) {
    const next = list.filter((a) => a.id !== id);
    // ensure at least one default if list still has items
    if (next.length > 0 && !next.some((x) => x.isDefault)) next[0].isDefault = true;
    persist(next);
  }

  function validate() {
    const required = ["fullName", "phone", "line1", "city", "state", "pincode"];
    for (const k of required) {
      if (!String(form[k] || "").trim()) return false;
    }
    return true;
  }

  function addAddress(e) {
    e.preventDefault();
    setMsg("");
    if (!validate()) {
      setMsg("Please fill all required fields (*)");
      return;
    }
    const addr = {
      id: safeId(),
      ...form,
      isDefault: list.length === 0, // first address becomes default
    };
    persist([addr, ...list]);
    setForm((f) => ({ ...f, line1: "", city: "", state: "", pincode: "", landmark: "" }));
    setMsg("Address saved.");
  }

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">My Addresses</h1>
        <p className="muted">Save delivery addresses for faster checkout.</p>
      </div>

      <div className="grid grid--2">
        <div className="card">
          <h2 className="sectionTitle">Add Address</h2>

          <form onSubmit={addAddress}>
            <div className="grid grid--2">
              <div className="field">
                <label>Label</label>
                <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}>
                  <option>Home</option>
                  <option>Clinic</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field">
                <label>Full Name *</label>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>

              <div className="field">
                <label>Phone *</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>

              <div className="field field--full">
                <label>Address *</label>
                <input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} placeholder="House / Street / Area" />
              </div>

              <div className="field">
                <label>City *</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>

              <div className="field">
                <label>State *</label>
                <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
              </div>

              <div className="field">
                <label>PIN Code *</label>
                <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
              </div>

              <div className="field">
                <label>Landmark (optional)</label>
                <input value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} />
              </div>
            </div>

            {msg && <p className="muted" style={{ marginTop: 10 }}>{msg}</p>}

            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
              <button className="btn btn--yellow" type="submit">Save Address</button>
            </div>
          </form>
        </div>

        <div className="card">
          <h2 className="sectionTitle">Saved Addresses</h2>

          {list.length === 0 ? (
            <p className="muted">No saved addresses yet.</p>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {list.map((a) => (
                <div key={a.id} className="miniCard">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{a.label}{a.isDefault ? " • Default" : ""}</div>
                      <div className="muted" style={{ marginTop: 4 }}>
                        {a.fullName} • {a.phone}
                      </div>
                      <div className="muted" style={{ marginTop: 4 }}>
                        {a.line1}, {a.city}, {a.state} - {a.pincode}{a.landmark ? ` • ${a.landmark}` : ""}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      {!a.isDefault && (
                        <button className="btn btn--small" type="button" onClick={() => setDefault(a.id)}>
                          Set Default
                        </button>
                      )}
                      <button className="btn btn--small btn--ghost" type="button" onClick={() => remove(a.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="muted" style={{ marginTop: 12 }}>
            Tip: Later you can auto-fill checkout from your default address.
          </p>
        </div>
      </div>
    </div>
  );
}
