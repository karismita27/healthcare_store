import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} rating`}>
      {"★".repeat(Math.min(5, full))}{"☆".repeat(Math.max(0, 5 - full))}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="card productCard">
      <Link to={`/products/${product.id}`} className="productCard__imgWrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className="productCard__body">
        <div className="productCard__name" title={product.name}>{product.name}</div>
        <div className="productCard__meta">
          <Stars value={product.rating} />
          <span className="muted">{product.reviews} reviews</span>
        </div>

        <div className="productCard__priceRow">
          <div className="price">
            <span className="price__now">₹{product.price}</span>
            <span className="price__mrp">₹{product.mrp}</span>
          </div>
          <button
            className="btn btn--yellow btn--small"
            type="button"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                mrp: product.mrp,
                image: product.image,
                category: product.category,
                brand: product.brand,
              })
            }
          >
           ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
