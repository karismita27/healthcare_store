import React, { useEffect, useMemo, useState } from "react";
import "../styles/topbar.css";

export default function TopNoticeBar() {
const messages = [
  "Free Delivery above ₹999 • Cash on Delivery Available",
  "Quality Checked Products • Easy Returns",
  "Support: Reply within 24 hours • Email & Phone",
];

const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar__inner">
        <div className="topbar__slider">
          <div
            className="topbar__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {messages.map((m, i) => (
              <div className="topbar__slide" key={i}>
                {m}
              </div>
            ))}
          </div>
        </div>

        <div className="topbar__dots">
          {messages.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "dot--active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to message ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}