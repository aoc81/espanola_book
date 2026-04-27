import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import siteData from "@generated-manuscript";
export function SkipLink() {
  return <a className="skip-link" href="#main-content">Skip to content</a>;
}

export function ScrollToTop() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) { element.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [hash, pathname]);
  return null;
}

export function Masthead() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <header className="masthead">
      <div className="masthead__top">
        <div className="masthead__meta-l">
          <span>Vol. I · No. 03</span>
          <span>Long-Form Edition</span>
          <span>{dateStr}</span>
        </div>
        <Link to="/" className="masthead__plate">
          ESPAÑOLA<span className="dot">.</span>
        </Link>
        <div className="masthead__meta-r">
          <span>The Investigations Desk</span>
          <span>Open-Source Release</span>
        </div>
      </div>
      <div className="masthead__strip">
        <div className="masthead__strip-inner">
          <span className="masthead__case">
            <span className="pulse" aria-hidden="true" />
            Case File · UKR-ESP-17 · Active
          </span>
          <nav className="masthead__nav" aria-label="Primary">
            <NavLink to="/" end>Overview</NavLink>
            <NavLink to="/section/front-matter">Front Matter</NavLink>
            <NavLink to="/chapters">Chapters</NavLink>
            <NavLink to="/sources">Sources</NavLink>
            <NavLink to="/codex">Codex</NavLink>
            <NavLink to="/download">Download</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <span>{siteData.stats.documentCount} Reading Units</span>
        </div>
      </div>
    </header>
  );
}

