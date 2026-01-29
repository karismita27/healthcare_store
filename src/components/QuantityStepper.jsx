import React from "react";

export default function QuantityStepper({ value, onChange, min = 1, max = 999 }) {
  const v = Number(value || 1);

  function dec() {
    onChange(Math.max(min, v - 1));
  }
  function inc() {
    onChange(Math.min(max, v + 1));
  }

  return (
    <div className="qty">
      <button type="button" className="qty__btn" onClick={dec} aria-label="Decrease">
        −
      </button>
      <input
        className="qty__input"
        value={v}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
        aria-label="Quantity"
      />
      <button type="button" className="qty__btn" onClick={inc} aria-label="Increase">
        +
      </button>
    </div>
  );
}
