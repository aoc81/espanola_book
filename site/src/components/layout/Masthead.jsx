import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  return (
    <header className="masthead">
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

