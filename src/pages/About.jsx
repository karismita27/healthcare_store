import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="page about">
      <section className="card aboutHero">
        <div className="aboutHero__left">
          <h1 className="pageTitle">About Us</h1>
          <p className="muted">
           
We are a healthcare-focused e-commerce platform dedicated to providing high-quality, trusted healthcare products that support everyday health and well-being. Our goal is to make essential healthcare items easily accessible by offering a carefully curated selection from reliable and verified sources. We prioritize quality, authenticity, and affordability so our customers can shop with confidence and peace of mind.
Customer satisfaction is at the heart of everything we do. From simple navigation and secure payments to timely delivery and responsive support, we strive to create a smooth and dependable shopping experience. By focusing on transparency, reliability, and care, we aim to become a trusted destination for healthcare needs and a partner in maintaining a healthier lifestyle.
          </p>
        </div>

        <div className="aboutHero__right">
          <button className="btn btn--yellow btn--small" onClick={() => navigate("/products")}>
            Shop Products
          </button>
          <button className="btn btn--ghost btn--small" onClick={() => navigate("/support")}>
            Contact Support
          </button>
        </div>
      </section>

      <section className="section">
        <div className="card aboutIntro">
          <div className="aboutIntro__left">
            <h2 className="aboutIntro__title">Trusted healthcare shopping — simple, safe and fast.</h2>
            <p className="muted">
              Our goal is to make healthcare products accessible for everyone — from families to clinics — with a
              marketplace that focuses on quality and customer support.
            </p>

            <div className="aboutBadges">
              {["Quality Checked", "Secure Payments", "Easy Returns", "Fast Delivery"].map((t) => (
                <span key={t} className="tagPill">
                  ★ {t}
                </span>
              ))}
            </div>
          </div>

          <div className="aboutIntro__right">
            <div className="aboutSide">
              <div className="aboutSide__title">Why people choose us</div>
              <div className="aboutSide__list">
                {["Verified sellers & products", "Transparent pricing", "Customer-first support"].map((t) => (
                  <div key={t} className="aboutSide__item">
                    <span className="checkMini" aria-hidden="true">
                      ✓
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid grid--3 aboutTri">
          <div className="card aboutMini">
            <div className="aboutMini__tag">Mission</div>
            <div className="aboutMini__text muted">
              To make healthcare shopping easier and more reliable by offering quality products, fast delivery, and
              helpful support for every customer.
            </div>
          </div>

          <div className="card aboutMini">
            <div className="aboutMini__tag aboutMini__tag--center">Our Promise</div>
            <div className="aboutMini__text muted">
              Verified products, clear policies, and customer-first service — built for everyday healthcare needs.
            </div>
          </div>

          <div className="card aboutMini">
            <div className="aboutMini__tag aboutMini__tag--right">Vision</div>
            <div className="aboutMini__text muted">
              Build a trusted healthcare marketplace where families and clinics can buy confidently — with strong
              quality standards and transparent service.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Impact (Demo stats)</h2>
        <div className="grid grid--4">
          {[
            { value: "5000+", label: "Customers" },
            { value: "100+", label: "Products" },
            { value: "50+", label: "Brands" },
            { value: "4.8★", label: "Rating" },
          ].map((s) => (
            <div key={s.label} className="card impactCard">
              <div className="impactCard__value">{s.value}</div>
              <div className="muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card aboutStory">
          <h2 className="section__title">Our Story</h2>
          <p className="muted">
            We started as a simple idea: healthcare products should be easy to find, affordable, and trustworthy.
            Today, we focus on building a smooth shopping experience — from product discovery to delivery — with clean
            UI, consistent product information, and customer-friendly policies.
          </p>
        </div>
      </section>
    </div>
  );
}
