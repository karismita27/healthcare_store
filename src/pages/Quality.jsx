import React from "react";
import Accordion from "../components/Accordion.jsx";

export default function Quality() {
  const faqs = [
    {
      title: "Are all products certified?",
      body: "We list products with verified documentation wherever applicable. Certification availability depends on the product type and category.",
    },
    {
      title: "How do you check suppliers?",
      body: "We perform basic supplier verification checks, documentation review, and periodic audits for high-sensitivity categories (demo UI).",
    },
    {
      title: "What if a product fails quality checks?",
      body: "We pause listings, investigate documentation and batch details, and support replacements/returns as per policy (demo UI).",
    },
  ];

  const certs = [
    {
      title: "ISO 13485",
      sub: "Quality management system for medical devices.",
      img:
        "/images/cer1.jpg",
    },
    {
      title: "CE Marking",
      sub: "Conformity with health, safety & environmental standards.",
      img:
        "/images/cer2.jpg",
    },
    {
      title: "BIS / ISI",
      sub: "Compliance with Indian standard regulations (where applicable).",
      img:
        "/images/cer3.jpg",
    },
    {
      title: "Authorized Sellers",
      sub: "Verified suppliers & proper documentation checks.",
      img:
        "/images/cer4.jpg",
    },
    {
      title: "Batch Tracking",
      sub: "Lot/batch checks for traceability & safety audits.",
      img:
        "/images/cer5.jpg",
    },
    {
      title: "Warranty Verified",
      sub: "Manufacturer warranty validation before listing.",
      img:
        "/images/cer6.jpg",
    },
  ];

  return (
    <div className="page quality">
      <section className="card qualityTop">
        <div className="qualityTop__left">
          <h1 className="section__title">Quality & Certifications</h1>
          <p className="muted">
            Trusted healthcare products with verified documentation, quality checks, and seller validation.
          </p>

          <div className="qualityBadges">
            {["Certified Products", "Verified Sellers", "Warranty Support", "Secure Packaging"].map((t) => (
              <span key={t} className="qaTag qaTag--solid">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        <div className="qualityTop__right">
          <div className="qualitySide cardSoft">
            <div className="qualitySide__title">Trusted Products with…</div>
            <ul className="qualitySide__list">
              <li>Certification & compliance checks</li>
              <li>Supplier verification & audits</li>
              <li>Batch tracking & safe packaging</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Our Quality Promise</h2>
        <div className="grid grid--4">
          {[
            {
              title: "Verified Documentation",
              text: "We verify certifications, invoices, and supplier documents before listing products.",
              icon: "📄",
            },
            {
              title: "Seller Screening",
              text: "Suppliers are checked for authenticity, compliance, and service reliability.",
              icon: "🔎",
            },
            {
              title: "Safe Packaging",
              text: "Careful packaging standards reduce damage and maintain product integrity.",
              icon: "📦",
            },
            {
              title: "Support & Warranty",
              text: "Clear return policy and warranty support for eligible healthcare products.",
              icon: "🛡️",
            },
          ].map((c) => (
            <div key={c.title} className="card promiseTile">
              <div className="promiseTile__icon" aria-hidden="true">
                {c.icon}
              </div>
              <div className="promiseTile__title">{c.title}</div>
              <div className="promiseTile__text muted">{c.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Our Certifications</h2>
        <div className="grid grid--3">
          {certs.map((c) => (
            <div key={c.title} className="card certCard2">
              <div className="certCard2__img">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <div className="certCard2__body">
                <div className="certCard2__title">{c.title}</div>
                <div className="certCard2__sub muted">{c.sub}</div>
                <button className="btn btn--ghost btn--small certBtn" type="button">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">How we ensure quality</h2>
        <div className="card stepsCard">
          <div className="stepsGrid">
            {[
              {
                n: "1",
                title: "Supplier Verification",
                text: "Business details, documents, and legitimacy checks.",
              },
              {
                n: "2",
                title: "Compliance Review",
                text: "Certificates and product eligibility review.",
              },
              {
                n: "3",
                title: "Listing Approval",
                text: "Only verified products get published to the store.",
              },
              {
                n: "4",
                title: "Post-Sale Support",
                text: "Returns, warranty support, and quality monitoring.",
              },
            ].map((s) => (
              <div key={s.n} className="stepBox">
                <div className="stepBox__num" aria-hidden="true">
                  {s.n}
                </div>
                <div className="stepBox__title">{s.title}</div>
                <div className="stepBox__text muted">{s.text}</div>
              </div>
            ))}
          </div>

          <div className="stepsTags">
            {["Audit-ready logs", "Traceable batches", "Customer feedback", "Continuous improvement"].map((t) => (
              <span key={t} className="tagPill">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">FAQ Section</h2>
        <Accordion items={faqs} />
      </section>
    </div>
  );
}
