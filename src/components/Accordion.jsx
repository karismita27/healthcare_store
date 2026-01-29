import React, { useState } from "react";

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="accordion">
      {items.map((it, idx) => {
        const open = openIndex === idx;
        return (
          <div key={it.title} className={open ? "accordion__item isOpen" : "accordion__item"}>
            <button
              type="button"
              className="accordion__header"
              onClick={() => setOpenIndex(open ? null : idx)}
              aria-expanded={open}
            >
              <span className="accordion__caret" aria-hidden="true">▶</span>
              <span>{it.title}</span>
            </button>
            {open && <div className="accordion__body">{it.body}</div>}
          </div>
        );
      })}
    </div>
  );
}
