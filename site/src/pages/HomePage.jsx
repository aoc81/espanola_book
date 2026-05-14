import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import coverImg from "../../../assets/images/covers/Espanola Book Cover-New.png";
import siteData from "@generated-manuscript";
import { chapterTitle } from "../lib/siteUtils";
export function HomePage() {
  const lastReadSlug = typeof window !== "undefined" ? window.localStorage.getItem("last-read-slug") : "";
  const lastRead = siteData.documents.find((d) => d.slug === lastReadSlug);

  return (
    <main id="main-content">
      <HomeHero lastRead={lastRead} />
      <EditorsLetter />
      <SectionShelf />
      <FootnotesStrip />
    </main>
  );
}

function HomeHero({ lastRead }) {
  const feature = siteData.documents.find((d) => d.title.toLowerCase().includes("prologue")) ?? siteData.documents[0];
  const totalMinutes = siteData.documents.reduce((s, d) => s + d.readingMinutes, 0);

  return (
    <section className="page-section" style={{ position: "relative", paddingTop: 48, paddingBottom: 88, borderBottom: "1px solid var(--paper-edge)" }}>
      <div className="page-section__inner home-hero__grid">
        {/* LEFT: editorial copy */}
        <div style={{ paddingTop: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            ✦ &nbsp; Long-Form Investigation &nbsp; · &nbsp; Open-Source Edition
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "clamp(44px, 5.5vw, 84px)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            color: "var(--ink-0)",
            margin: "0 0 28px",
          }}>
            ESPAÑOLA:<br />
            <span style={{ color: "var(--ink-2)", fontWeight: 400 }}>From hooligans</span><br />
            <span style={{ color: "var(--ink-2)", fontWeight: 400 }}>to war machines</span>
          </h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 28px", maxWidth: 560 }}>
            An open-source investigative book on PMCs and the wartime conversion of subcultural violence.
          </p>

          {/* metadata strip */}
          <div className="home-hero__meta-strip" style={{
            alignItems: "center",
            gap: 18,
            padding: "16px 0",
            borderTop: "1px solid var(--ink-1)",
            borderBottom: "1px solid var(--ink-1)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ink-2)",
            marginBottom: 28,
          }}>
            <span>By Angel Ortiz</span>
            <span style={{ background: "var(--ink-1)", height: 14 }} />
            <span>Open-Source Edition · 2026</span>
            <span style={{ background: "var(--ink-1)", height: 14 }} />
            <span style={{ color: "var(--classified)" }}>~ {totalMinutes} min total</span>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {feature ? (
              <Link to={`/read/${feature.slug}`} className="button button--solid">▸ Begin Reading</Link>
            ) : null}
            {lastRead ? (
              <Link to={`/read/${lastRead.slug}`} className="button">Resume · {lastRead.readingMinutes}m left</Link>
            ) : null}
            <Link to="/sources" className="button">↡ View Sources</Link>
          </div>

          <div style={{ marginTop: 36, paddingTop: 18, borderTop: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", lineHeight: 1.7 }}>
            {siteData.stats.documentCount} reading units · {siteData.stats.imageCount} image references · sources and image credits preserved.
          </div>
        </div>

        {/* RIGHT: bound cover */}
        <BoundCover />
      </div>
    </section>
  );
}

function BoundCover() {
  return (
    <div style={{ position: "relative", paddingBottom: 52 }}>
      {/* cover image */}
      <div style={{
        position: "relative",
        boxShadow: "0 1px 0 rgba(0,0,0,0.06), 0 32px 60px -28px rgba(20,17,13,0.55), 0 12px 24px -16px rgba(20,17,13,0.4)",
        border: "1px solid var(--ink-1)",
        background: "var(--dossier-0)",
      }}>
        <img
          src={coverImg}
          alt="Española cover artwork"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* download slip */}
      <Link to="/download" className="home-hero__slip" style={{ textDecoration: "none",
        background: "var(--paper-2)", padding: "14px 16px", transform: "rotate(-2deg)",
        boxShadow: "0 8px 18px -10px rgba(20,17,13,0.4)",
        borderTop: "1px solid var(--paper-edge)", borderBottom: "1px solid var(--paper-edge)",
        display: "block",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 6 }}>
          Get a copy today
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.5, color: "var(--ink-1)" }}>
          Download it here
        </div>
        <div style={{ position: "absolute", top: -8, left: 24, width: 52, height: 16, background: "rgba(212,200,170,0.65)", border: "1px solid rgba(28,26,22,0.08)" }} />
        <div style={{ position: "absolute", top: -8, right: 24, width: 52, height: 16, background: "rgba(212,200,170,0.65)", border: "1px solid rgba(28,26,22,0.08)" }} />
      </Link>
    </div>
  );
}

function EditorsLetter() {
  const ledgerRows = [
    ["Edition", siteData.edition?.version?.toUpperCase() ?? "V1"],
    ["Reading Units", String(siteData.stats.documentCount)],
    ["Image References", String(siteData.stats.imageCount)],
    ["Sources", "44"],
    ["Reference Links", "75"],
    ["Generated Outputs", "5"],
    ["Last Updated", "04.05.2026"],
  ];

  return (
    <section className="editors-letter">
      <div className="editors-letter__inner">
        <div className="editors-letter__numeral" aria-hidden="true">✦</div>
        <div className="editors-letter__body">
          <span className="esp-eyebrow">From the Editor</span>
          <p>
            This book is based on human-led OSINT research, multilingual source review, and AI-assisted organisation,
            translation support, drafting, and editorial revision. Final judgments, source selection, interpretation,
            and responsibility for the text remain human.
          </p>
          <p>
            This is the open-source web version of the book and the repository for its canonical manuscript, source
            notes, image credits, references, and generated outputs.
          </p>
        </div>
        <div className="ledger" role="table" aria-label="Edition details">
          <div className="ledger__header">
            <span>Ledger</span>
            <span>This Edition</span>
          </div>
          <table className="ledger__table">
            <tbody>
              {ledgerRows.map(([label, value]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function SectionShelf() {
  const folders = [
    { key: "front-matter", roman: "I", label: "Front Matter", title: "How to read the book", description: "Author note, methodology, AI-assistance disclosure, and terminology notes.", stamp: "READ FIRST", link: "/section/front-matter" },
    { key: "chapters", roman: "II", label: "Chapters", title: "The narrative investigation", description: "From the stadium and Donbas to recruitment, branding, combat reputation, and state reabsorption.", stamp: "OPEN", link: "/chapters" },
    { key: "appendices", roman: "III", label: "Appendices", title: "Sources & reference links", description: "Reader-facing source notes, reference links, and source-handling context.", stamp: "REFERENCE", link: "/sources" },
    { key: "codex", roman: "IV", label: "Codex", title: "Editorial protocols", description: "The standing protocols governing voice, evidence, source integration, writing behavior, and editor-in-chief review.", stamp: "INTERNAL", link: "/codex", count: 4 },
  ];

  return (
    <section className="section-shelf" id="book-sections">
      <div className="section-shelf__inner">
        <div className="section-shelf__header">
          <div>
            <span className="esp-eyebrow">Book Sections · 04 Folders</span>
            <h2>Enter by section, then move through the reader.</h2>
          </div>
          <span className="esp-meta">↦ Or skip to the full Table of Contents</span>
        </div>
        <div className="section-shelf__grid">
          {folders.map((folder) => {
            const group = siteData.groups.find((item) => item.key === folder.key);
            const count = folder.count ?? group?.documents.length ?? 0;
            return (
              <article key={folder.key} className="folder-card">
                <div className="folder-card__tab">{folder.label}</div>
                <span className="stamp stamp--rotated folder-card__stamp">{folder.stamp}</span>
                <div className="folder-card__numeral" aria-hidden="true">{folder.roman}</div>
                <div className="folder-card__rule" aria-hidden="true" />
                <div className="folder-card__body">
                  <h3>{folder.title}</h3>
                  <p>{folder.description}</p>
                  <div className="folder-card__actions">
                    <span className="esp-meta">{String(count).padStart(2, "0")} items inside</span>
                    <Link to={folder.link} className="button">
                      Open<ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function buildTocSections() {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const appendixLetters = ["A", "B", "C", "D", "E", "F"];
  return siteData.groups.map((group) => {
    const items = group.documents.map((doc, idx) => {
      let num;
      if (group.key === "front-matter") num = romanNumerals[idx] ?? String(idx + 1);
      else if (group.key === "appendices") num = appendixLetters[idx] ?? String(idx + 1);
      else num = String(idx + 1).padStart(2, "0");
      return { num, doc };
    });
    return { group, items };
  });
}

export function TocInline() {
  const sections = buildTocSections();
  return (
    <div>
      {sections.map(({ group, items }) => (
        <div key={group.key} style={{ marginBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center", marginBottom: 18 }}>
            <Link to={group.key === "chapters" ? "/chapters" : `/section/${group.key}`} style={{ textDecoration: "none", fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>
              {group.title === "Narrative" ? "Chapters" : group.title} ›
            </Link>
            <span style={{ height: 1, background: "var(--ink-1)" }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>{items.length} items</span>
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map(({ num, doc }) => (
              <li key={doc.slug} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 12, alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid var(--paper-edge)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", color: "var(--ink-0)" }}>
                  {num}
                </span>
                <span>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 700, color: "var(--ink-0)", letterSpacing: "-0.005em" }}>
                    {chapterTitle(doc.title)}
                  </span>
                  <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
                    {doc.excerpt?.slice(0, 80)}{doc.excerpt?.length > 80 ? "…" : ""}
                  </div>
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function FootnotesStrip() {
  const notes = [
    ["†", "All Russian terms appear in italics with translation; Cyrillic only when the source uses it."],
    ["‡", "Subjects are referred to by full name on first mention, surname after; redacted where required."],
    ["§", "Open-source claims are flagged with attribution; intercepted transmissions cite their channel and time."],
  ];
  return (
    <section className="footnotes-strip" aria-label="Editorial notes">
      <div className="footnotes-strip__inner">
        <span className="esp-eyebrow">Editorial Notes</span>
        {notes.map(([sym, text]) => (
          <div key={sym} className="footnotes-strip__note">
            <span className="footnotes-strip__sym" aria-hidden="true">{sym}</span>
            <p className="footnotes-strip__text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

