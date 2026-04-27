import { Link } from "react-router-dom";
import siteData from "@generated-manuscript";
export function SiteFooter() {
  const prologue = siteData.documents.find((d) => d.title.includes("Prologue"));
  const authorNote = siteData.documents.find((d) => d.title.includes("Author"));
  const sourceNotes = siteData.documents.find((d) => d.title.includes("Source Notes"));
  const referenceLinks = siteData.documents.find((d) => d.title.includes("Reference Links"));

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <div className="site-footer__brand">ESPAÑOLA<span className="dot">.</span></div>
          <p className="site-footer__lede">
            {siteData.titlePage.title} — an open-source investigative web edition built from the canonical manuscript, its source notes, and editorial protocols.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <Link to="/#toc" className="button" style={{ height: 36, fontSize: 10, padding: "0 12px" }}>Table of Contents ↓</Link>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Navigate</h4>
          <ul>
            {prologue ? <li><Link to={`/read/${prologue.slug}`}>Start reading</Link></li> : null}
            {authorNote ? <li><Link to={`/read/${authorNote.slug}`}>Author note</Link></li> : null}
            <li><Link to="/#toc">Full contents</Link></li>
            <li><Link to="/#book-sections">Sections</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Sources & Codex</h4>
          <ul>
            <li><Link to="/sources">Image references</Link></li>
            {sourceNotes ? <li><Link to={`/read/${sourceNotes.slug}`}>Source notes</Link></li> : null}
            {referenceLinks ? <li><Link to={`/read/${referenceLinks.slug}`}>Reference links</Link></li> : null}
            <li><Link to="/codex">Editorial codex</Link></li>
            <li><Link to="/download">Download</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Edition</h4>
          <ul>
            <li>{siteData.edition?.version?.toUpperCase() ?? "V1"}</li>
            <li>{siteData.stats.documentCount} reading units</li>
            <li>{siteData.stats.imageCount} image references</li>
            <li>44 sources · 75 links</li>
            <li>Updated 27.04.2026</li>
          </ul>
        </div>
      </div>
      <div className="site-footer__rule">
        <span>© The Investigations Desk · MMXXVI</span>
        <span>CC BY-NC 4.0 · Española</span>
      </div>
    </footer>
  );
}
