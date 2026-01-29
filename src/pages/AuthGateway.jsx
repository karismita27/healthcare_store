import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function AuthGateway() {
  const { login, register, startGuestSession } = useAuth();
  const navigate = useNavigate();
  const query = useQuery();
  const redirectRaw = query.get("redirect") || "/cart";
  const redirect = decodeURIComponent(redirectRaw);

  const [mode, setMode] = useState("login"); // login | register | guest
  const [error, setError] = useState("");

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // register
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // guest
  const [g, setG] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
  });

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = login({ email, password });
    if (!res.ok) return setError(res.message);
    navigate(redirect, { replace: true });
  }

  function handleRegister(e) {
    e.preventDefault();
    setError("");
    const res = register({ fullName, email, phone, password });
    if (!res.ok) return setError(res.message);
    navigate(redirect, { replace: true });
  }

  function handleGuest(e) {
    e.preventDefault();
    setError("");
    const required = ["fullName", "phone", "address", "city", "state", "pincode"];
    for (const k of required) {
      if (!String(g[k] || "").trim()) {
        setError("Please fill all required fields for guest checkout.");
        return;
      }
    }
    startGuestSession({
      fullName: g.fullName.trim(),
      phone: g.phone.trim(),
      address: g.address.trim(),
      city: g.city.trim(),
      state: g.state.trim(),
      pincode: g.pincode.trim(),
      email: g.email.trim(),
    });
    navigate(redirect, { replace: true });
  }

  return (
    <div className="page authPage">
      <div className="pageHead">
        <h1 className="pageTitle">Login / Register</h1>
        <p className="muted">
          Cart access is protected. Continue by logging in, registering, or buying as guest.
        </p>
      </div>

      <div className="auth card">
        <div className="auth__tabs" role="tablist">
          <button
            className={mode === "login" ? "authTab isActive" : "authTab"}
            onClick={() => {
              setMode("login");
              setError("");
            }}
            type="button"
          >
            Login
          </button>
          <button
            className={mode === "register" ? "authTab isActive" : "authTab"}
            onClick={() => {
              setMode("register");
              setError("");
            }}
            type="button"
          >
            Register
          </button>
          <button
            className={mode === "guest" ? "authTab isActive" : "authTab"}
            onClick={() => {
              setMode("guest");
              setError("");
            }}
            type="button"
          >
            Buy as Guest
          </button>
        </div>

        {error && <div className="alert alert--error">{error}</div>}

        {mode === "login" && (
          <form className="form" onSubmit={handleLogin}>
            <div className="grid grid--2">
              <div className="field">
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
            </div>

            <div className="form__actions">
              <button className="btn btn--yellow" type="submit">Login</button>
              <Link className="btn btn--ghost" to="/products">Continue shopping</Link>
            </div>

            <div className="muted small">
              Demo credentials are stored locally after Register.
            </div>
          </form>
        )}

        {mode === "register" && (
          <form className="form" onSubmit={handleRegister}>
            <div className="grid grid--2">
              <div className="field">
                <label>Full Name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
              </div>
              <div className="field">
                <label>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." />
              </div>
              <div className="field">
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" />
              </div>
            </div>

            <div className="form__actions">
              <button className="btn btn--yellow" type="submit">Create account</button>
              <button className="btn btn--ghost" type="button" onClick={() => setMode("login")}>
                I already have an account
              </button>
            </div>
          </form>
        )}

        {mode === "guest" && (
          <form className="form" onSubmit={handleGuest}>
            <div className="grid grid--2">
              <div className="field">
                <label>Full Name *</label>
                <input value={g.fullName} onChange={(e) => setG({ ...g, fullName: e.target.value })} />
              </div>
              <div className="field">
                <label>Phone *</label>
                <input value={g.phone} onChange={(e) => setG({ ...g, phone: e.target.value })} />
              </div>
              <div className="field field--full">
                <label>Address *</label>
                <input value={g.address} onChange={(e) => setG({ ...g, address: e.target.value })} />
              </div>
              <div className="field">
                <label>City *</label>
                <input value={g.city} onChange={(e) => setG({ ...g, city: e.target.value })} />
              </div>
              <div className="field">
                <label>State *</label>
                <input value={g.state} onChange={(e) => setG({ ...g, state: e.target.value })} />
              </div>
              <div className="field">
                <label>Pincode *</label>
                <input value={g.pincode} onChange={(e) => setG({ ...g, pincode: e.target.value })} />
              </div>
              <div className="field">
                <label>Email (optional)</label>
                <input value={g.email} onChange={(e) => setG({ ...g, email: e.target.value })} />
              </div>
            </div>

            <div className="form__actions">
              <button className="btn btn--yellow" type="submit">Continue as Guest</button>
              <Link className="btn btn--ghost" to="/products">Continue shopping</Link>
            </div>

            <div className="muted small">
              Guest session is frontend-only and stored locally.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
