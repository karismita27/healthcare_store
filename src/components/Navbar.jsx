
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const params = new
  URLSearchParams(location.search);
  const selectedCategory = params.get("category");
  const navigate = useNavigate();
  const { count } = useCart();
  const { auth, logout } = useAuth();

  const isUser = auth.status === "user";

  const displayName = useMemo(() => {
    if (isUser) return auth.user?.name || "User";
    return null;
  }, [auth, isUser]);

  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  // user dropdown
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);

  // category dropdown
  const catRef = useRef(null);

  function onSearchSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    navigate(`/products${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    setMobileOpen(false);
  }

  function openCart() {
    navigate("/cart");
    setMobileOpen(false);
  }

  function onUserIconClick() {
    if (!isUser) {
      navigate("/auth");
      setMobileOpen(false);
      return;
    }
    setUserOpen((v) => !v);
  }

  function go(path) {
    setUserOpen(false);
    setMobileOpen(false);
    navigate(path);
  }

  function onLogout() {
    setUserOpen(false);
    setMobileOpen(false);
    logout();
    navigate("/", { replace: true });
  }

  // Close dropdowns on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close mobile drawer if resizing to desktop (optional but clean)
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 820) {
        setMobileOpen(false);
        setCatOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function onCategoryPick(cat) {
    // Adjust route if your app uses different category routing
    navigate(`/products?cat=${encodeURIComponent(cat)}`);
    setCatOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="nav">
      <div className="nav__inner container">
        <div className="nav__row">
          <Link to="/home" className="nav__logo" aria-label="Home" onClick={() => setMobileOpen(false)}>
            <span className="logoMark" aria-hidden="true">V</span>
          </Link>

          {/* Hamburger (mobile only via CSS) */}
          <button
            className="nav__hamburger"
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {"\u2630"}
          </button>

          {/* Search (visible on both desktop + mobile now) */}
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
            {/* Desktop-only supplier button */}
            <button
              className="btn btn--pill btn--yellow nav__supplierDesktop"
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
                {isUser && <div className="nav__userName">{displayName}</div>}
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

        {/* Drawer / Links */}
        <div
          id="nav-mobile-menu"
          className={`nav__links ${mobileOpen ? "nav__links--open" : ""}`}
        >
          {/* Mobile-only supplier button inside hamburger */}
          {mobileOpen &&(
          <button
            className="btn btn--pill btn--yellow nav__supplierMobile"
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate("/become-supplier");
            }}
          >
            Become a Supplier
          </button>
          )}

          <Link to="/#most-popular" className="navLink" onClick={() => setMobileOpen(false)}>
            Popular
          </Link>

          <div className="navDrop" ref={catRef}>
            <button
              type="button"
              className="navLink navDrop__btn"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
            >
              Categories <span className="caret">▼</span>
            </button>

            {catOpen && (
              <div className="navDrop__menu" role="menu" aria-label="Categories menu">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className="navDrop__item"
                    type="button"
                    onClick={() => onCategoryPick(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/bulk-orders" className="navLink" onClick={() => setMobileOpen(false)}>
            Bulk Orders
          </NavLink>

          <NavLink to="/quality" className="navLink" onClick={() => setMobileOpen(false)}>
            Quality
          </NavLink>

          <NavLink to="/support" className="navLink" onClick={() => setMobileOpen(false)}>
            Support
          </NavLink>

          <NavLink to="/about" className="navLink" onClick={() => setMobileOpen(false)}>
            About Us
          </NavLink>
        </div>
      </div>
    </header>
  );
}
