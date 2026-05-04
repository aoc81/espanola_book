import { Link } from "react-router-dom";
import coverImg from "../../../assets/images/covers/Espanola Book Cover-New.png";
import siteData from "@generated-manuscript";
import { TocInline } from "./HomePage";
export function DownloadPage() {
  const edition = siteData.edition?.version?.toUpperCase() ?? "V4.1";

  const ROW_COLS = "56px 96px 1fr 100px 180px";
  const PRICE_BADGE_STYLE = { transform: "none", fontSize: 10, minWidth: 58, textAlign: "center" };
  const ACTION_BUTTON_STYLE = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: 132, height: 40, padding: "0 16px", border: "1px solid var(--ink-1)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" };

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div style={{ padding: "12px 32px", background: "var(--paper-0)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Overview</Link>
          <span>›</span>
          <span style={{ color: "var(--ink-0)" }}>Download</span>
        </div>
      </div>

      {/* hero */}
      <section style={{ position: "relative", padding: "72px 32px 56px", borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", marginBottom: 36, gap: 24 }}>
            <div className="eyebrow">Edition · {edition}</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>Get the book</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "end" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 180px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28, whiteSpace: "nowrap" }}>
              DOWNLOAD.
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 680 }}>
              The full manuscript is free in PDF and Markdown. A Kindle edition is on Amazon. If the work is useful to you, consider supporting it.
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
      <section style={{ padding: "56px 32px 48px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Available Formats ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>3 formats</span>
          </div>

          {/* table */}
          <div style={{ border: "1px solid var(--ink-1)" }}>

            {/* header */}
            <div style={{ display: "grid", gridTemplateColumns: ROW_COLS, gap: 0, padding: "12px 24px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)", alignItems: "center" }}>
              <span>№</span>
              <span>Format</span>
              <span>Description</span>
              <span style={{ textAlign: "center" }}>Price</span>
              <span style={{ textAlign: "right" }}>Action</span>
            </div>

            {/* PDF row */}
            <a href="/downloads/espanola-v4.1.pdf" download style={{ display: "grid", gridTemplateColumns: ROW_COLS, gap: 0, padding: "28px 24px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-0)", textDecoration: "none", color: "inherit", alignItems: "center" }}>
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
            <a href="/downloads/espanola-v4.1-markdown.zip" download style={{ display: "grid", gridTemplateColumns: ROW_COLS, gap: 0, padding: "28px 24px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)", textDecoration: "none", color: "inherit", alignItems: "center" }}>
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
            <a href="https://www.amazon.com/Espa%C3%B1ola-hooligans-machines-%C3%81ngel-Ortiz-ebook/dp/B0GYWV1BN4/" target="_blank" rel="noopener noreferrer" style={{ display: "grid", gridTemplateColumns: ROW_COLS, gap: 0, padding: "28px 24px", background: "var(--dossier-0)", textDecoration: "none", color: "inherit", alignItems: "center" }}>
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
          <div style={{ padding: "12px 24px", background: "var(--paper-2)", border: "1px solid var(--ink-1)", borderTop: "none", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", display: "flex", justifyContent: "space-between" }}>
            <span>PDF & ZIP: CC BY-NC 4.0 — Free to share and adapt for non-commercial use with attribution</span>
            <span>Kindle: © The Investigations Desk · MMXXVI</span>
          </div>
        </div>
      </section>

      {/* cover + table of contents */}
      <section style={{ padding: "72px 32px 80px", borderTop: "1px solid var(--paper-edge)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "260px 1fr", gap: 64, alignItems: "start" }}>
          {/* cover thumbnail */}
          <div style={{ position: "sticky", top: 80 }}>
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

      {/* support strip */}
      <section style={{ padding: "0 32px 80px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center", padding: "40px 48px", border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", background: "var(--paper-1)", position: "relative" }}>
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
    </main>
  );
}

