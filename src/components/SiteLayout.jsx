import React from "react";
import TopNoticeBar from "./TopNoticeBar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function SiteLayout({ children }) {
  return (
    <div className="site">
      <TopNoticeBar />
      <Navbar />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
