import { useSite } from "../../lib/siteContext";
import { LocalizedLink } from "./LocalizedLink";
export function SiteFooter() {
  const { siteData, copy } = useSite();
  const prologue = siteData.documents.find((d) => d.id === "Prologue.md");
  const authorNote = siteData.documents.find((d) => d.id === "Front Matter 01 Author Note.md");
  const sourceNotes = siteData.documents.find((d) => d.id === "Appendix Source Notes.md");
  const referenceLinks = siteData.documents.find((d) => d.id === "Appendix Reference Links Guide.md");

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <div className="site-footer__brand">ESPAÑOLA<span className="dot">.</span></div>
          <p className="site-footer__lede">
            {siteData.titlePage.title} — {copy.footer.lede}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <LocalizedLink to="/#top" className="button" style={{ height: 36, fontSize: 10, padding: "0 12px" }}>{copy.footer.backToTop} ↑</LocalizedLink>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>{copy.footer.navigate}</h4>
          <ul>
            {prologue ? <li><LocalizedLink to={`/read/${prologue.slug}`}>{copy.footer.startReading}</LocalizedLink></li> : null}
            {authorNote ? <li><LocalizedLink to={`/read/${authorNote.slug}`}>{copy.footer.authorNote}</LocalizedLink></li> : null}
            <li><LocalizedLink to="/#book-sections">{copy.footer.sections}</LocalizedLink></li>
            <li><LocalizedLink to="/chapters">{copy.nav.chapters}</LocalizedLink></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>{copy.footer.sourcesCodex}</h4>
          <ul>
            <li><LocalizedLink to="/sources">{copy.footer.imageReferences}</LocalizedLink></li>
            {sourceNotes ? <li><LocalizedLink to={`/read/${sourceNotes.slug}`}>{copy.footer.sourceNotes}</LocalizedLink></li> : null}
            {referenceLinks ? <li><LocalizedLink to={`/read/${referenceLinks.slug}`}>{copy.footer.referenceLinks}</LocalizedLink></li> : null}
            <li><LocalizedLink to="/codex">{copy.footer.editorialCodex}</LocalizedLink></li>
            <li><LocalizedLink to="/download">{copy.nav.download}</LocalizedLink></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>{copy.footer.author}</h4>
          <ul>
            <li><a href="https://www.linkedin.com/in/1231239i340/" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://x.com/angoritz" target="_blank" rel="noreferrer">X (Twitter)</a></li>
            <li><a href="https://github.com/aoc81" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>{copy.footer.edition}</h4>
          <ul>
            <li>{copy.footer.manuscriptEdition}</li>
            <li>{copy.footer.publishedEdition}</li>
            <li>CC BY-NC 4.0</li>
            <li>{copy.footer.updated}</li>
          </ul>
        </div>
      </div>
      <div className="site-footer__rule">
        <span>{copy.footer.creditA}</span>
        <span>Ángel Ortiz · {siteData.titlePage.title}</span>
      </div>
    </footer>
  );
}
