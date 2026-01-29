import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";

function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} rating`}>
      {"★".repeat(Math.min(5, full))}{"☆".repeat(Math.max(0, 5 - full))}
    </span>
  );
}

function StarsFixed({ n }) {
  return (
    <span className="stars" aria-label={`${n} stars`}>
      {"★".repeat(n)}{"☆".repeat(Math.max(0, 5 - n))}
    </span>
  );
}

function lsKey(productId) {
  return `hc_reviews_${productId}`;
}

function readReviews(productId) {
  try {
    const raw = localStorage.getItem(lsKey(productId));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeReviews(productId, reviews) {
  localStorage.setItem(lsKey(productId), JSON.stringify(reviews));
}

export default function ProductDetails() {
  const { id } = useParams();
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);
  const { addToCart } = useCart();

  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [savedReviews, setSavedReviews] = useState(() =>
    typeof window !== "undefined" ? readReviews(id) : [],
  );

  const similar = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="pageTitle">Product not found</h1>
          <Link to="/products" className="btn btn--ghost btn--small">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.gallery?.length ? product.gallery : [product.image];

  const demoReviews = [
    {
      id: "demo_1",
      name: "Customer",
      verified: true,
      stars: 5,
      text: "Good build quality and accurate results.",
    },
    {
      id: "demo_2",
      name: "Clinic",
      verified: true,
      stars: 4,
      text: "Delivery was quick. Works as expected.",
    },
  ];

  const allReviews = [...savedReviews, ...demoReviews];

  const openReview = () => {
    // Reviews are shown as a separate section BELOW all product detail sections
    requestAnimationFrame(() => {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    setIsReviewOpen(true);
  };

  const submitReview = (e) => {
    e.preventDefault();

    const name = reviewName.trim();
    const text = reviewText.trim();
    const stars = Number(reviewRating);

    if (!name || !text || !Number.isFinite(stars) || stars < 1 || stars > 5) return;

    const next = [
      {
        id: `r_${Date.now()}`,
        name,
        verified: false,
        stars,
        text,
        createdAt: new Date().toISOString(),
      },
      ...savedReviews,
    ];

    writeReviews(product.id, next);
    setSavedReviews(next);

    setIsReviewOpen(false);
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
  };

  return (
    <div className="page">
      <div className="breadcrumbs muted">
        <Link to="/products" className="linkInline">
          Products
        </Link>{" "}
        / <span>{product.category}</span> / <span>{product.name}</span>
      </div>

      <div className="productView card">
        <div className="productView__left">
          <div className="productView__img">
            <img src={images[imgIndex]} alt={product.name} />
          </div>
          <div className="productView__thumbs">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={i === imgIndex ? "thumb isActive" : "thumb"}
                onClick={() => setImgIndex(i)}
                aria-label={`Image ${i + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="productView__right">
          <h1 className="productTitle">{product.name}</h1>

          <div className="productMeta">
            <div className="pill" title="Rating">
              <Stars value={product.rating} />
              <span className="muted">&nbsp;{product.reviews} reviews</span>
            </div>

            <span className="pill">{product.brand}</span>
            <span className="pill">{product.category}</span>
          </div>

          <div className="priceBlock">
            <div className="price">
              <span className="price__now">₹{product.price}</span>
              <span className="price__mrp">₹{product.mrp}</span>
            </div>
            <div className="muted small">Stock: {product.stock}</div>
          </div>

          <div className="productPoints">
            {product.shortPoints.map((p) => (
              <div key={p} className="point">
                <span className="check">✓</span>
                <span>{p}</span>
              </div>
            ))}
          </div>

          <div className="buyRow">
            <QuantityStepper value={qty} onChange={setQty} />
            <button
              className="btn btn--yellow"
              type="button"
              onClick={() =>
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    mrp: product.mrp,
                    image: product.image,
                    category: product.category,
                    brand: product.brand,
                  },
                  Number(qty || 1),
                )
              }
            >
              ADD TO CART
            </button>
          </div>

          <div className="qaMini">
            {(product.qualityBadges || ["Quality Checked", "Trusted Suppliers", "Easy Returns"]).map((t) => (
              <span key={t} className="qaTag">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILS TABS (NO REVIEWS HERE) */}
      <section className="section">
        <div className="tabs card">
          <div className="tabs__bar">
            <button className={tab === "desc" ? "tab isActive" : "tab"} onClick={() => setTab("desc")}>
              Description
            </button>
            <button className={tab === "specs" ? "tab isActive" : "tab"} onClick={() => setTab("specs")}>
              Specifications
            </button>
            <button className={tab === "box" ? "tab isActive" : "tab"} onClick={() => setTab("box")}>
              What&apos;s in the box
            </button>
            <button className={tab === "use" ? "tab isActive" : "tab"} onClick={() => setTab("use")}>
              How to use
            </button>
          </div>

          <div className="tabs__content">
            {tab === "desc" && <p className="muted">{product.description}</p>}

            {tab === "specs" && (
              <div className="specTable">
                {Object.entries(product.specs || {}).map(([k, v]) => (
                  <div key={k} className="specRow">
                    <div className="specKey">{k}</div>
                    <div className="specVal">{v}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === "box" && (
              <ul className="list">
                {(product.inBox || []).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}

            {tab === "use" && <p className="muted">{product.howToUse}</p>}
          </div>
        </div>
      </section>

      {/* REVIEWS (SEPARATE SECTION BELOW ALL DETAILS) */}
      <section className="section" id="reviews">
        <div className="card">
          <div className="section__head">
            <h2 className="section__title">Customer Reviews</h2>
            <button className="btn btn--yellow btn--small" type="button" onClick={openReview}>
              Write a review
            </button>
          </div>

          <div className="reviews">
            <div className="reviewHead">
              <div>
                <div className="reviewTitle">Rating</div>
                <div className="stars">★★★★★</div>
                <div className="muted small">Based on customer feedback</div>
              </div>
            </div>

            {allReviews.map((r) => (
              <div key={r.id || r.name + r.text} className="reviewItem">
                <div className="muted">
                  <strong>{r.name}</strong> {r.verified ? "• Verified" : ""}
                </div>
                <StarsFixed n={r.stars} />
                <div className="muted">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2 className="section__title">Similar Products</h2>
            <Link to="/products" className="linkInline">
              View all
            </Link>
          </div>

          <div className="grid grid--4">
            {similar.map((p) => (
              <div key={p.id} className="card productCard">
                <Link to={`/products/${p.id}`} className="productCard__imgWrap">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </Link>
                <div className="productCard__body">
                  <div className="productCard__name">{p.name}</div>
                  <div className="productCard__priceRow">
                    <div className="price">
                      <span className="price__now">₹{p.price}</span>
                      <span className="price__mrp">₹{p.mrp}</span>
                    </div>
                    <Link className="btn btn--ghost btn--small" to={`/products/${p.id}`}>
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {isReviewOpen && (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Write a review">
          <div className="modalCard">
            <div className="modalHead">
              <div className="modalTitle">Write a review</div>
              <button className="iconBtn" type="button" onClick={() => setIsReviewOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>

            <form className="modalForm" onSubmit={submitReview}>
              <label className="field">
                <div className="label">Your name</div>
                <input
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </label>

              <label className="field">
                <div className="label">Rating</div>
                <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Bad</option>
                </select>
              </label>

              <label className="field">
                <div className="label">Review</div>
                <textarea
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  required
                />
              </label>

              <div className="modalActions">
                <button className="btn btn--ghost" type="button" onClick={() => setIsReviewOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn--yellow" type="submit">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
