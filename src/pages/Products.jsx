import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("popular");

  const q = (params.get("q") || "").trim().toLowerCase();
  const category = params.get("category") || "All";

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    if (q) {
      list = list.filter((p) =>
        `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q),
      );
    }

    if (sort === "priceLow") list.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [q, category, sort]);

  function setCategory(next) {
    const n = new URLSearchParams(params);
    if (next === "All") n.delete("category");
    else n.set("category", next);
    setParams(n);
  }

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">Products</h1>
        <p className="muted">Browse healthcare machines and essentials.</p>
      </div>

      <div className="toolbar card">
        <div className="toolbar__row">
          <div className="field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="popular">Popular</option>
              <option value="rating">Highest Rating</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>

          <div className="toolbar__meta muted">
            Showing <strong>{filtered.length}</strong> items
          </div>
        </div>
      </div>

      <div className="grid grid--4 section">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
