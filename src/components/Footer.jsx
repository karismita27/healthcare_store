import React from "react";
import { Link } from "react-router-dom";

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 3.5 9 3c.6-.1 1.2.2 1.4.8l1 2.6c.2.6 0 1.2-.5 1.5l-1.6 1c.9 2 2.6 3.8 4.6 4.6l1-1.6c.3-.5.9-.7 1.5-.5l2.6 1c.6.2.9.8.8 1.4l-.5 2.5c-.1.6-.7 1.1-1.3 1.1C10 21.4 2.6 14 2.9 6.3c0-.6.5-1.2 1.1-1.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer footerDark">
      <div className="container footer__inner footerDark__inner">
        <div className="footerCol footerBrand">
          <div className="footerBrand__title">HealthCare Store</div>
          <div className="footerBrand__text">
            Trusted healthcare machines and essentials for daily care. Quality products, easy ordering, and fast delivery.
          </div>

          <div className="footerBadge" aria-label="Quality checked">
            <span className="footerBadge__icon" aria-hidden="true">✓</span>
            <span>100% Quality Checked</span>
          </div>
        </div>

        <div className="footerCol">
          <div className="footerHeading">Quick Links</div>
          <div className="footerLinks">
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/products">Categories</Link>
            <Link to="/bulk-orders">Bulk Orders</Link>
            <Link to="/become-supplier">Become a Supplier</Link>
          </div>
        </div>

        <div className="footerCol">
          <div className="footerHeading">Support</div>
          <div className="footerLinks">
            <Link to="/support">Help Center</Link>
            <Link to="/support">Shipping & Delivery</Link>
            <Link to="/support">Return Policy</Link>
            <Link to="/support">Terms & Conditions</Link>
            <Link to="/support">Privacy Policy</Link>
          </div>
        </div>

        <div className="footerCol">
          <div className="footerHeading">Contact</div>
          <div className="footerContact">
            <div className="footerContact__row">
              <span className="footerContact__icon" aria-hidden="true"><IconPhone /></span>
              <span>+91 90000 00000</span>
            </div>
            <div className="footerContact__row">
              <span className="footerContact__icon" aria-hidden="true"><IconMail /></span>
              <span>support@healthcare.com</span>
            </div>
            <div className="footerContact__row">
              <span className="footerContact__icon" aria-hidden="true"><IconPin /></span>
              <span>India</span>
            </div>

            <div className="socialRow" aria-label="Social links">
              <a className="socialBtn" href="#" onClick={(e) => e.preventDefault()}>
                Instagram
              </a>
              <a className="socialBtn" href="#" onClick={(e) => e.preventDefault()}>
                Facebook
              </a>
              <a className="socialBtn" href="#" onClick={(e) => e.preventDefault()}>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="container footerBottom__inner">
          <span>© {new Date().getFullYear()} HealthCare Store</span>
          <span className="footerBottom__muted">Demo UI • Frontend-only</span>
        </div>
      </div>
    </footer>
  );
}
