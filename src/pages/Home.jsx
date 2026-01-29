import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const promises = [
    { title: "Free Shipping", sub: "Fast & reliable delivery", icon: "🚚" },
    { title: "Quality Checked", sub: "Certified products", icon: "✅" },
    { title: "Easy Returns", sub: "Hassle-free replacement", icon: "🔄" },
    { title: "Support", sub: "We’re here to help", icon: "📞" },
  ];

  const stats = [
    { value: "4.8/5", label: "Average rating" },
    { value: "10k+", label: "Happy customers" },
    { value: "2–5 days", label: "Delivery (avg)" },
  ];

  const reviews = [
    {
      name: "Riya Sharma",
      initial: "R",
      stars: 5,
      text:
        "Fast delivery and the BP monitor quality is excellent. Readings feel accurate and the display is very clear.",
      tags: ["Quality"],
    },
    {
      name: "Aman Das",
      initial: "A",
      stars: 4,
      text:
        "Good packaging and genuine product. Customer support replied quickly and helped me choose the right model.",
      tags: ["Quality", "Fast Delivery"],
    },
    {
      name: "Sneha Patel",
      initial: "S",
      stars: 5,
      text:
        "Perfect for my parents. Easy to use and the instructions were simple. Definitely recommended for home use.",
      tags: ["Quality", "Fast Delivery", "Easy to Use"],
    },
  ];

  const brands = [
    "Omron",
    "Dr. Morepen",
    "Accu-Chek",
    "Philips Healthcare",
    "Beurer",
    "Rossmax",
    "BPL Medical",
    "Niscomed",
    "Health Sense",
    "CareTouch",
    "Medtech",
    "VivaChek",
  ];

  const Stars = ({ n }) => (
    <span className="stars" aria-label={`${n} stars`}>
      {"★".repeat(n)}{"☆".repeat(Math.max(0, 5 - n))}
    </span>
  );

  const mostPopular = useMemo(() => PRODUCTS.filter(p => p.popular).slice(0, 8), []);

  // Smooth scroll when navigating to /#most-popular
  useEffect(() => {
    if (location.hash === "#most-popular") {
      requestAnimationFrame(() => {
        document.getElementById("most-popular")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.hash]);

  return (
    <div className="page home">
      {/* HERO */}
      <section className="hero card">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content">
          <h1 className="hero__title">Trusted Healthcare Machines for Everyday Care</h1>
          <p className="hero__sub">Quality medical essentials delivered safely to your home and clinics.</p>
          <div className="hero__actions">
            <button className="btn btn--yellow" onClick={() => navigate("/products")}>
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* MOST POPULAR (must be BEFORE Our Promises) */}
      <section className="section" id="most-popular">
        <div className="section__head">
          <h2 className="section__title">Most Popular</h2>
          <button className="linkInline" type="button" onClick={() => navigate("/products")}>
            Browse products
          </button>
        </div>

        <div className="grid grid--4">
          {mostPopular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* PROMISES */}
      <section className="section">
        <h2 className="section__title homeCenterTitle">Our Promises</h2>
        <div className="promiseRow">
          {promises.map((p) => (
            <div key={p.title} className="promiseCard">
              <div className="promiseIcon" aria-hidden="true">
                {p.icon}
              </div>
              <div className="promiseTitle">{p.title}</div>
              <div className="promiseSub muted">{p.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="card reviewsBlock">
          <div className="reviewsTop">
            <div className="reviewsTop__left">
              <div className="badgePill">
                <span className="badgeDot" aria-hidden="true">
                  ★
                </span>{" "}
                Trusted Reviews
              </div>
              <h2 className="reviewsTitle">What our customers say</h2>
              <p className="muted">Real feedback from customers who bought healthcare products from our site.</p>
            </div>

            <div className="reviewsTop__right">
              <div className="statRow">
                {stats.map((s) => (
                  <div key={s.label} className="miniStat">
                    <div className="miniStat__value">{s.value}</div>
                    <div className="miniStat__label muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reviewGrid">
            {reviews.map((r) => (
              <div key={r.name} className="reviewCard">
                <div className="reviewCard__head">
                  <div className="reviewAvatar" aria-hidden="true">
                    {r.initial}
                  </div>
                  <div>
                    <div className="reviewName">{r.name}</div>
                    <div className="reviewVerified muted">Verified buyer</div>
                  </div>
                  <div className="reviewStars">
                    <Stars n={r.stars} />
                  </div>
                </div>

                <div className="reviewText muted">“{r.text}”</div>

                <div className="reviewTags">
                  {r.tags.map((t) => (
                    <span key={t} className="tagPill">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="reviewsBottom">
            <div className="muted">Want to share your experience? You can add reviews on product pages.</div>
            <button className="btn btn--yellow btn--small" onClick={() => navigate("/products")}>
              Explore Products
            </button>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="section">
        <div className="card brandsBlock">
          <h2 className="brandsTitle">Our Trusted Brands</h2>
          <p className="muted">Quality brands that people trust for daily healthcare needs.</p>

          <div className="brandsGrid">
            {brands.map((b) => (
              <div key={b} className="brandTile">
                {b}
              </div>
            ))}
          </div>

          <div className="brandsCta">
            <button className="btn btn--yellow btn--small" onClick={() => navigate("/products")}>
              View All Brands
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
