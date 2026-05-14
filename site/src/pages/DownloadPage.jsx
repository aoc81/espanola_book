import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import coverImg from "../../../assets/images/covers/Espanola Book Cover-New.png";
import siteData from "@generated-manuscript";
import { TocInline } from "./HomePage";

const NOTEBOOKLM_VIDEO_URL = encodeURI("/downloads/Española_Case_Study.mp4");
const NOTEBOOKLM_AUDIO_URL = "/downloads/How_Russia_weaponized_its_football_hooligans.m4a";
const NOTEBOOKLM_POSTER_URL = "/downloads/espanola-notebooklm.png";
const NOTEBOOKLM_MINDMAP_URL = "/downloads/NotebookLM-Mind-Map.png";

export function DownloadPage() {
  const [isMindMapOpen, setIsMindMapOpen] = useState(false);
  const edition = siteData.edition?.version?.toUpperCase() ?? "V4.1";

  const PRICE_BADGE_STYLE = { transform: "none", fontSize: 10, minWidth: 58, textAlign: "center" };
  const ACTION_BUTTON_STYLE = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: 132, height: 40, padding: "0 16px", border: "1px solid var(--ink-1)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" };

  useEffect(() => {
    if (!isMindMapOpen) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMindMapOpen(false);
    };

    body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMindMapOpen]);

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div className="page-crumb" style={{ paddingTop: 12, paddingBottom: 12, background: "var(--paper-0)" }}>
        <div className="page-crumb__inner">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Overview</Link>
          <span>›</span>
          <span style={{ color: "var(--ink-0)" }}>Download</span>
        </div>
      </div>

      {/* hero */}
      <section className="page-section" style={{ position: "relative", paddingTop: 72, paddingBottom: 56, borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div className="page-section__inner">
          <div className="page-eyebrow-row">
            <div className="eyebrow">Edition · {edition}</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>Get the book</div>
          </div>
          <div className="page-intro__grid page-intro__grid--auto">
          <div>
            <div className="page-intro__title" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 180px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28 }}>
              DOWNLOAD.
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 680 }}>
              The full manuscript is free in PDF and Markdown, with companion video and audio files available below. A Kindle edition is on Amazon. If the work is useful to you, consider supporting it.
            </h2>
          </div>
          {/* hero stats */}
          <div style={{ paddingBottom: 8 }}>
            <div style={{ borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)" }}>
              {[
                ["Reading units", String(siteData.stats.documentCount)],
                ["Image references", String(siteData.stats.imageCount)],
                ["Sources", "44"],
                ["Formats", "03"],
                ["Video companions", "01"],
                ["Audio companions", "01"],
                ["Mind maps", "01"],
                ["License", "CC BY-NC 4.0"],
              ].map(([label, value], i, arr) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "11px 4px", borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  <span style={{ color: "var(--ink-3)" }}>{label}</span>
                  <span style={{ color: "var(--ink-0)", fontWeight: 700 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* format table */}
      <section className="page-section" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div className="page-section__inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Available Formats ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>3 formats</span>
          </div>

          {/* table */}
          <div className="download-format-table">

            {/* header */}
            <div className="download-format-head" style={{ padding: "12px 24px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)" }}>
              <span>№</span>
              <span>Format</span>
              <span>Description</span>
              <span style={{ textAlign: "center" }}>Price</span>
              <span style={{ textAlign: "right" }}>Action</span>
            </div>

            {/* PDF row */}
            <a href="/downloads/espanola-v4.1.pdf" download className="download-format-row" style={{ padding: "28px 24px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-0)", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--classified)" }}>01</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, lineHeight: 1, color: "var(--classified)", letterSpacing: "0.02em" }}>PDF</span>
              <div style={{ paddingRight: 32 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17, color: "var(--ink-0)", marginBottom: 5 }}>Portable Document Format</div>
                <div className="mono" style={{ color: "var(--ink-3)" }}>Full manuscript · Paginated export · {edition}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="stamp" style={PRICE_BADGE_STYLE}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ ...ACTION_BUTTON_STYLE, borderColor: "var(--classified)", color: "var(--classified)" }}>↓ Download</span>
              </div>
            </a>

            {/* ZIP row */}
            <a href="/downloads/espanola-v4.1-markdown.zip" download className="download-format-row" style={{ padding: "28px 24px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-2)" }}>02</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, lineHeight: 1, color: "var(--ink-0)", letterSpacing: "0.02em" }}>ZIP</span>
              <div style={{ paddingRight: 32 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17, color: "var(--ink-0)", marginBottom: 5 }}>Markdown Source Files</div>
                <div className="mono" style={{ color: "var(--ink-3)" }}>{siteData.stats.documentCount} .md documents · Plain text · {edition}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="stamp" style={PRICE_BADGE_STYLE}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ ...ACTION_BUTTON_STYLE, color: "var(--ink-1)" }}>↓ Download</span>
              </div>
            </a>

            {/* Kindle row — dark */}
            <a href="https://www.amazon.com/Espa%C3%B1ola-hooligans-machines-%C3%81ngel-Ortiz-ebook/dp/B0GYWV1BN4/" target="_blank" rel="noopener noreferrer" className="download-format-row" style={{ padding: "28px 24px", background: "var(--dossier-0)", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--dossier-fg-2)" }}>03</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, lineHeight: 1, color: "var(--dossier-fg-0)", letterSpacing: "0.02em" }}>KINDLE</span>
              <div style={{ paddingRight: 32 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17, color: "var(--dossier-fg-0)", marginBottom: 5 }}>Amazon Kindle Edition</div>
                <div className="mono" style={{ color: "var(--dossier-fg-2)" }}>E-reader · Linked footnotes · Chapter navigation</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="stamp stamp--bone" style={PRICE_BADGE_STYLE}>Paid</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ ...ACTION_BUTTON_STYLE, borderColor: "var(--dossier-fg-1)", color: "var(--dossier-fg-0)" }}>↗ Amazon</span>
              </div>
            </a>

          </div>

          {/* licence strip */}
          <div className="download-license-row" style={{ padding: "12px 24px", background: "var(--paper-2)", border: "1px solid var(--ink-1)", borderTop: "none", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>
            <span>PDF & ZIP: CC BY-NC 4.0 — Free to share and adapt for non-commercial use with attribution</span>
            <span>Kindle: © Ángel Ortiz · MMXXVI</span>
          </div>
        </div>
      </section>

      {/* cover + table of contents */}
      <section className="page-section" style={{ paddingTop: 72, paddingBottom: 80, borderTop: "1px solid var(--paper-edge)" }}>
        <div className="page-section__inner download-toc__grid">
          {/* cover thumbnail */}
          <div className="download-toc__cover">
            <div style={{ border: "1px solid var(--ink-1)", boxShadow: "4px 6px 0 rgba(20,17,13,0.18)", background: "var(--dossier-0)" }}>
              <img src={coverImg} alt="Española cover artwork" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9, marginTop: 10, textAlign: "center" }}>
              {siteData.edition?.version?.toUpperCase() ?? "V4.1"} · {siteData.stats.documentCount} reading units
            </div>
          </div>
          {/* table of contents inline */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 40 }}>
              <div className="eyebrow">✦ &nbsp; Reader Index &nbsp; ✦</div>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 40px" }}>
              Table of Contents
            </h2>
            <TocInline />
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="page-section__inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Companion Media ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>NotebookLM files</span>
          </div>
          <div className="responsive-panel" style={{ border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
            <div style={{ marginBottom: 30, maxWidth: 760 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 16px" }}>
                Video and podcast companions for readers
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 14px" }}>
                These NotebookLM-generated companion files offer alternate ways to review the case structure, themes, and narrative arc alongside the written investigation.
              </p>
              <p className="mono" style={{ color: "var(--ink-3)", margin: 0 }}>
                Reader-facing companion media · Not the canonical text
              </p>
            </div>
            <div className="download-companion__grid">
              <div style={{ border: "1px solid var(--paper-edge)", background: "var(--paper-0)", padding: 18 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18, color: "var(--ink-0)" }}>Case-study video</div>
                  <div className="mono" style={{ color: "var(--ink-3)" }}>MP4</div>
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 16px" }}>
                  A visual NotebookLM summary designed for readers who want a quicker walk through the book&apos;s main arguments, chronology, and organizational map.
                </p>
                <video controls preload="metadata" poster={NOTEBOOKLM_POSTER_URL} style={{ width: "100%", display: "block", background: "var(--dossier-0)" }}>
                  <source src={NOTEBOOKLM_VIDEO_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div style={{ border: "1px solid var(--paper-edge)", background: "var(--paper-0)", padding: 18 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18, color: "var(--ink-0)" }}>NotebookLM podcast</div>
                  <div className="mono" style={{ color: "var(--ink-3)" }}>M4A</div>
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 16px" }}>
                  An audio companion for readers who prefer a conversational recap of the investigation while commuting, taking notes, or reviewing the case away from the screen.
                </p>
                <audio controls preload="metadata" style={{ width: "100%" }}>
                  <source src={NOTEBOOKLM_AUDIO_URL} type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="page-section__inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Mind Map ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>NotebookLM visual output</span>
          </div>
          <div className="responsive-panel" style={{ border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
            <div className="download-mindmap__grid">
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 16px" }}>
                  Systems overview mind map
                </h2>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 14px", maxWidth: 620 }}>
                  A visual map of the book&apos;s actors, themes, timelines, and structural links for readers who want a faster systems-level view of the investigation.
                </p>
                <p className="mono" style={{ color: "var(--ink-3)", margin: "0 0 24px" }}>
                  Reader-facing visual companion · PNG
                </p>
                <a href={NOTEBOOKLM_MINDMAP_URL} download style={{ ...ACTION_BUTTON_STYLE, width: 180, borderColor: "var(--ink-1)", color: "var(--ink-0)", textDecoration: "none" }}>
                  ↓ Download PNG
                </a>
              </div>
              <button
                type="button"
                onClick={() => setIsMindMapOpen(true)}
                style={{ display: "block", width: "100%", padding: 0, border: "1px solid var(--paper-edge)", background: "var(--paper-0)", cursor: "zoom-in" }}
              >
                <div style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "var(--paper-0)" }}>
                  <img
                    src={NOTEBOOKLM_MINDMAP_URL}
                    alt="NotebookLM mind map preview"
                    style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* support strip */}
      <section className="page-section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="page-section__inner">
          <div className="page-support__grid responsive-panel--support" style={{ border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", background: "var(--paper-1)", position: "relative" }}>
            <span className="tick" style={{ bottom: 14, left: 14 }} aria-hidden="true" />
            <span className="tick" style={{ bottom: 14, right: 14 }} aria-hidden="true" />
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Support the work</div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(22px,2.5vw,32px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "0 0 14px" }}>
                Buy me a coffee
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, maxWidth: 640 }}>
                This investigation is free and independent. No institutional backing, no advertising. If the work is useful, accurate, or simply worth your time — a contribution keeps the desk running and the next investigation open.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <a
                href="https://buymeacoffee.com/angelortiz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 36px", background: "var(--classified)", color: "var(--paper-0)", textDecoration: "none" }}
              >
                <span style={{ fontSize: 28 }}>☕</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>Buy me a coffee</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {isMindMapOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="NotebookLM mind map preview"
          onClick={() => setIsMindMapOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(20,17,13,0.88)", padding: 32, display: "grid", placeItems: "center" }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{ width: "min(1280px, calc(100vw - 64px))", maxHeight: "calc(100vh - 64px)", background: "var(--paper-0)", border: "1px solid var(--paper-edge)", padding: 20, boxShadow: "0 24px 72px rgba(0,0,0,0.35)" }}
          >
            <div className="modal-toolbar" style={{ marginBottom: 16 }}>
              <div className="mono" style={{ color: "var(--ink-3)" }}>NotebookLM mind map · Full view</div>
              <div className="modal-toolbar__actions">
                <a
                  href={NOTEBOOKLM_MINDMAP_URL}
                  download
                  style={{ ...ACTION_BUTTON_STYLE, width: 164, height: 36, padding: "0 12px", background: "var(--paper-0)", color: "var(--ink-0)", textDecoration: "none" }}
                >
                  ↓ Full Size PNG
                </a>
                <button
                  type="button"
                  onClick={() => setIsMindMapOpen(false)}
                  style={{ ...ACTION_BUTTON_STYLE, width: 92, height: 36, padding: "0 12px", background: "var(--paper-0)", cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </div>
            <div style={{ overflow: "auto", maxHeight: "calc(100vh - 156px)" }}>
              <img src={NOTEBOOKLM_MINDMAP_URL} alt="NotebookLM mind map full image" style={{ width: "100%", height: "auto", display: "block", background: "var(--paper-0)" }} />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

