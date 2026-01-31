import React from "react";
import Accordion from "../components/Accordion.jsx";

export default function Support() {
  const faq = [
    {
      title: "How do I track my order?",
      body: "For demo UI: order tracking is not connected. In a real system, your order page would show shipment updates and tracking number.",
    },
    {
      title: "What is the return policy?",
      body: "Returns are typically allowed within 7–10 days for eligible products. Non-returnable items may include opened/sealed devices depending on category.",
    },
    {
      title: "How do I request bulk pricing?",
      body: "Use the Bulk Orders page and submit your requirement. We contact you on call/WhatsApp to confirm stock and wholesale pricing.",
    },
  ];

  return (
    <div className="page">
      <div className="pageHead">
        <h1 className="pageTitle">Support</h1>
        <p className="muted">Contact us anytime. We usually reply within 24 hours.</p>
      </div>

      <div className="card supportIntro">
        <p className="muted">
          
For any assistance related to orders, shipping, payments, invoices, or product information, please reach out to our Support team. We aim to respond within 24 hours on working days. To help us resolve your request quickly, please share your order ID, product name, and relevant screenshots (if any).


        </p>
      </div>

      <div className="supportImage card">
        <img
          src="images/s10.png"
          alt="Support"
        />
      </div>

      <section className="section">
        <div className="grid grid--3">
          <div className="card supportCard">
            <div className="supportCard__head">
              <span className="supportIcon">☎</span>
              <h3 style= {{fontWeight:600, fontSize:15}}>Contact Us</h3>
            </div>
            <div className="muted">
              Phone: +91 90000 00000 <br />
              Timing: 10 AM – 6 PM (Mon–Sat) <br />
              For urgent queries, call during working hours.
            </div>
          </div>

          <div className="card supportCard">
            <div className="supportCard__head">
              <span className="supportIcon">✉</span>
              <h3 style= {{fontWeight:600, fontSize:15}}>Email</h3>
            </div>
            <div className="muted">
              support@healthcare.com <br />
              Reply: within 24 hours <br />
              Mention your Order ID (if available).
            </div>
          </div>

          <div className="card supportCard">
            <div className="supportCard__head">
              <span className="supportIcon">📍</span>
              <h3 style= {{fontWeight:600, fontSize:15}}>Visit Us</h3>
            </div>
            <div className="muted">
              Clinic Road, City Center <br />
              Assam, India (Demo) <br />
              Please visit during working hours
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">FAQ</h2>
        <p className="muted">Quick answers to common questions.</p>
        <Accordion items={faq} />
      </section>
    </div>
  );
}
