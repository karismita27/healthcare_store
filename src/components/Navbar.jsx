import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function IconCart({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-1.5 9h-12L6 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 6 5.2 3.5H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconUser({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { count } = useCart();
  const { auth, logout } = useAuth();

  const [q, setQ] = useState("");
  const [catOpen, setCatOpen] = useState(false);

  const isUser = auth.status === "user";

  const displayName = useMemo(() => {
    if (isUser) return auth.user?.name || "User";
    return null;
  }, [auth, isUser]);

  function onSearchSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    navigate(`/products${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  }

  function openCart() {
    // cart is protected by route guard, but we keep UX consistent
    navigate("/cart");
  }

  // User dropdown (only when logged in / registered)
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!userRef.current) return;
      if (!userRef.current.contains(e.target)) setUserOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function onUserIconClick() {
    if (!isUser) {
      navigate("/auth");
      return;
    }
    setUserOpen((v) => !v);
  }

  function go(path) {
    setUserOpen(false);
    navigate(path);
  }

  function onLogout() {
    setUserOpen(false);
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="nav">
      <div className="nav__inner container">
        <div className="nav__row">
          <Link to="/home" className="nav__logo" aria-label="Home">
            <span className="logoMark" aria-hidden="true">V</span>
          </Link>

          <form className="nav__search" onSubmit={onSearchSubmit}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for healthcare products"
              aria-label="Search products"
            />
            <button type="submit" className="nav__searchBtn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16.4 16.4 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          <div className="nav__actions">
            <button
              className="btn btn--pill btn--yellow"
              type="button"
              onClick={() => navigate("/become-supplier")}
            >
              Become a Supplier
            </button>

            <button className="iconBtn" type="button" onClick={openCart} aria-label="Cart">
              <IconCart />
              {count > 0 && <span className="badge">{count}</span>}
            </button>

            <div className="nav__user" ref={userRef}>
              <button
                className="iconBtn"
                type="button"
                onClick={onUserIconClick}
                aria-label="Account"
                aria-expanded={isUser ? userOpen : undefined}
              >
                <IconUser />
              </button>

              <div className="nav__userMeta">
                {isUser &&(
                <div className="nav__userName">{displayName}</div>)}
              </div>

              {isUser && userOpen && (
                <div className="userDrop" role="menu" aria-label="Account menu">
                  <button className="userDrop__item" type="button" onClick={() => go("/account")}>My Account</button>
                  <button className="userDrop__item" type="button" onClick={() => go("/addresses")}>Addresses</button>
                  <button className="userDrop__item" type="button" onClick={() => go("/orders")}>Orders</button>
                  <button className="userDrop__item" type="button" onClick={() => go("/returns")}>Returns</button>
                  <button className="userDrop__item" type="button" onClick={() => go("/support")}>Support</button>
                  <div className="userDrop__divider" aria-hidden="true" />
                  <button className="userDrop__item userDrop__item--danger" type="button" onClick={onLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="nav__links" aria-label="Primary">
          <Link to="/#most-popular" className="navLink">Popular</Link>

          <div
            className="navDrop"
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              type="button"
              className="navLink navDrop__btn"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
            >
              Categories <span className="caret" aria-hidden="true">▼</span>
            </button>

            {catOpen && (
              <div className="navDrop__menu">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className="navDrop__item"
                    type="button"
                    onClick={() => {
                      setCatOpen(false);
                      navigate(`/products?category=${encodeURIComponent(c)}`);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/bulk-orders" className="navLink">Bulk Orders</NavLink>
          <NavLink to="/quality" className="navLink">Quality</NavLink>
          <NavLink to="/support" className="navLink">Support</NavLink>
          <NavLink to="/about" className="navLink">About Us</NavLink>
        </nav>
      </div>
    </header>
  );
}
