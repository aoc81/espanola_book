/* global React, IOSDevice, IOSStatusBar */
/* ==========================================================================
   MOBILE COMPS — All four screens at iPhone width (402×874).
   Designed as standalone screens; wrapped in IOSDevice frame in the canvas.
   ========================================================================== */

/* ---------- Mobile masthead (compact) ---------- */

function MobileMasthead({ title = "Overview", showBack = false }) {
  return (
    <div style={{ background: "var(--paper-0)", borderBottom: "1px solid var(--ink-1)" }}>
      {/* nameplate strip */}
      <div style={{ padding: "12px 16px 8px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center" }}>
        <button style={{ width: 32, height: 32, border: "1px solid var(--ink-1)", background: "transparent", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink-0)", cursor: "pointer", padding: 0 }}>
          {showBack ? "‹" : "≡"}
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "0.06em", color: "var(--ink-0)" }}>
            ESPAÑOLA<span style={{ color: "var(--classified)" }}>.</span>
          </div>
        </div>
        <button style={{ width: 32, height: 32, border: "1px solid var(--ink-1)", background: "transparent", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-0)", cursor: "pointer", padding: 0 }}>
          ⌕
        </button>
      </div>
      {/* case strip */}
      <div style={{ padding: "8px 16px", borderTop: "1px solid var(--paper-edge)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        <span style={{ color: "var(--classified)" }}>● {title}</span>
        <span>v4.1 · 14 units</span>
      </div>
    </div>
  );
}

/* =====================================================================
   MOBILE 1 — HOMEPAGE
   ===================================================================== */
function HomeMobile() {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto", background: "var(--paper-0)", fontFamily: "var(--font-serif)" }}>
      <MobileMasthead title="Overview" />

      {/* Hero */}
      <section style={{ padding: "20px 16px 28px", borderBottom: "1px solid var(--paper-edge)" }}>
        <div className="eyebrow" style={{ marginBottom: 12, fontSize: 9 }}>
          ✦ &nbsp; Long-Form &nbsp; · &nbsp; Ch. 02
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 14px", textWrap: "balance" }}>
          From the terraces to the trenches.
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 18px" }}>
          Born in the curva of Spartak Moscow, the unit known as Española has built one of the war's most opaque chains of command.
        </p>

        {/* bound cover (small) */}
        <div style={{ position: "relative", marginBottom: 18 }}>
          <div style={{ position: "absolute", top: -16, right: 36, width: 18, height: 90, background: "var(--classified)", zIndex: 3 }} />
          <div style={{ position: "absolute", top: 60, right: 27, width: 36, height: 18, background: "var(--classified)", clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)", zIndex: 3 }} />
          <div style={{ border: "1px solid var(--ink-1)", boxShadow: "0 16px 28px -16px rgba(20,17,13,0.45)" }}>
            <img src="./assets/cover-hero.png" alt="" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "8px 12px", background: "var(--dossier-1)", borderTop: "1px solid var(--dossier-rule)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dossier-fg-1)" }}>
              <span>Cover · v4.1</span>
              <span style={{ color: "var(--classified)" }}>Дело №17.02</span>
            </div>
          </div>
        </div>

        {/* meta strip */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "12px 0", borderTop: "1px solid var(--ink-1)", borderBottom: "1px solid var(--ink-1)", marginBottom: 16, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          <span style={{ color: "var(--ink-3)" }}>Investigations Desk</span>
          <span style={{ color: "var(--classified)", textAlign: "right" }}>~ 38 min</span>
          <span style={{ color: "var(--ink-3)" }}>Filed 14.02.2024</span>
          <span style={{ color: "var(--ink-3)", textAlign: "right" }}>Updated 12.04.2026</span>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <a className="btn btn--solid" style={{ width: "100%" }}>▸ Begin Chapter One</a>
          <a className="btn" style={{ width: "100%" }}>Resume Ch. 2 · 12 min left</a>
        </div>
      </section>

      {/* Editor's Letter — compact */}
      <section style={{ padding: "32px 16px 28px", borderBottom: "1px solid var(--paper-edge)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "-0.02em", marginBottom: 14 }}>
          № 01
        </div>
        <div className="eyebrow" style={{ marginBottom: 8, fontSize: 9 }}>From the Editor</div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 22, lineHeight: 1.15, color: "var(--ink-0)", margin: "0 0 14px", textWrap: "balance" }}>
          A documented account of how a Russian football-ultra milieu became a branded wartime formation.
        </h2>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 16px" }}>
          Every claim has been traced to a primary source. We do not glorify; we document.
        </p>
        <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, color: "var(--ink-1)" }}>
          — A. Ortiz <span style={{ fontFamily: "var(--font-mono)", fontStyle: "normal", fontSize: 9, color: "var(--ink-3)", letterSpacing: "0.18em", textTransform: "uppercase", marginLeft: 6 }}>Editor</span>
        </div>
      </section>

      {/* Folders */}
      <section style={{ padding: "32px 16px 28px", borderBottom: "1px solid var(--paper-edge)" }}>
        <div className="eyebrow" style={{ marginBottom: 14, fontSize: 9 }}>Book Sections · 03 Folders</div>
        <div style={{ display: "grid", gap: 14 }}>
          {[
            ["I", "Front Matter", "How to read the book", "READ FIRST", 4],
            ["II", "Chapters", "The narrative investigation", "OPEN", 7],
            ["III", "Appendices", "Sources & reference links", "REFERENCE", 3],
          ].map(([num, label, title, stamp, count]) => (
            <article key={num} style={{ position: "relative", background: "var(--paper-2)", border: "1px solid var(--ink-1)", padding: "16px 16px 14px", boxShadow: "0 8px 14px -8px rgba(20,17,13,0.25)" }}>
              <div className="stamp" style={{ position: "absolute", top: 8, right: 8, fontSize: 8, padding: "2px 5px 1px" }}>{stamp}</div>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "-0.02em" }}>{num}</div>
                <div>
                  <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9 }}>{label}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 16, color: "var(--ink-0)", margin: "2px 0", lineHeight: 1.2 }}>{title}</div>
                  <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9 }}>{String(count).padStart(2, "0")} items inside &nbsp;·&nbsp; ▸</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mini ToC */}
      <section style={{ padding: "32px 16px 28px", borderBottom: "1px solid var(--paper-edge)" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div className="eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>✦ Reader Index ✦</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 28, lineHeight: 1.05, color: "var(--ink-0)", margin: 0 }}>Table of Contents</h2>
        </div>
        {[
          ["01", "Prologue: Donbas, 2014", 22, false, true],
          ["02", "From the terraces to the trenches", 38, true, false],
          ["03", "Recruitment and the volunteer myth", 41, false, false],
          ["04", "Branding a paramilitary", 27, false, false],
          ["05", "Combat reputation: Kreminna", 34, false, false],
        ].map(([num, title, mins, current, read]) => (
          <div key={num} style={{
            display: "grid",
            gridTemplateColumns: "32px 1fr auto",
            gap: 10,
            padding: "12px 0",
            borderBottom: "1px solid var(--paper-edge)",
            alignItems: "baseline",
            background: current ? "var(--paper-1)" : "transparent",
            paddingLeft: current ? 10 : 0,
            paddingRight: current ? 10 : 0,
            borderLeft: current ? "3px solid var(--classified)" : "3px solid transparent",
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: current ? "var(--classified)" : (read ? "var(--ink-3)" : "var(--ink-0)") }}>
              {read ? "✓" : num}
            </span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.3, fontWeight: current ? 700 : 400, color: read ? "var(--ink-3)" : "var(--ink-0)" }}>
              {title}
            </span>
            <span className="mono" style={{ color: "var(--ink-3)", fontSize: 9 }}>{mins}m</span>
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <a className="btn" style={{ fontSize: 9 }}>▾ Show all 14</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--ink-0)", color: "var(--paper-0)", padding: "28px 16px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "0.06em", marginBottom: 10 }}>
          ESPAÑOLA<span style={{ color: "var(--classified)" }}>.</span>
        </div>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.5, color: "var(--paper-2)", margin: "0 0 14px", opacity: 0.75 }}>
          Presented as a web reader built from the canonical manuscript edition v4.1.
        </p>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.4 }}>
          © MMXXVI · CC BY-NC-SA 4.0
        </div>
      </footer>
    </div>
  );
}

/* =====================================================================
   MOBILE 2 — SECTION LANDING (Chapters)
   ===================================================================== */
function SectionMobile() {
  const chapters = [
    { num: "01", kind: "Field reportage", title: "Prologue: Donbas, 2014", mins: 22, citations: 18, progress: 100 },
    { num: "02", kind: "Long-form investigation", title: "From the terraces to the trenches", mins: 38, citations: 31, progress: 32, featured: true },
    { num: "03", kind: "Investigation", title: "Recruitment and the volunteer myth", mins: 41, citations: 28 },
    { num: "04", kind: "Visual analysis", title: "Branding a paramilitary", mins: 27, citations: 19 },
    { num: "05", kind: "Reportage", title: "Combat reputation: Kreminna", mins: 34, citations: 41 },
    { num: "06", kind: "Investigation", title: "Patronage and the state", mins: 31, citations: 33 },
    { num: "07", kind: "Reportage", title: "End-states and the unmaking", mins: 19, citations: 14 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto", background: "var(--paper-0)", fontFamily: "var(--font-serif)" }}>
      <MobileMasthead title="Section II · Chapters" showBack />

      {/* Crumb */}
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        Overview › Section II › <span style={{ color: "var(--ink-0)" }}>Chapters</span>
      </div>

      {/* Opener */}
      <section style={{ padding: "28px 16px 28px", borderBottom: "1px solid var(--paper-edge)" }}>
        <div className="eyebrow" style={{ marginBottom: 12, fontSize: 9 }}>Section · 02</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 88, lineHeight: 0.82, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 12 }}>
          CHAP-<br />TERS.
        </div>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 20px" }}>
          Seven reading units following the unit from supporter culture into the war.
        </p>

        {/* compact stats */}
        <div style={{ borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)", padding: "8px 0" }}>
          {[["Chapters", "07"], ["Total time", "3h 32m"], ["Image refs", "61"], ["Citations", "184"]].map(([k, v], i, arr) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "6px 0", borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <span style={{ color: "var(--ink-3)" }}>{k}</span>
              <span style={{ color: "var(--ink-0)", fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter row */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)", display: "flex", gap: 6, overflowX: "auto" }}>
        {[["All", 7, true], ["Long-form", 3], ["Reportage", 3], ["Visual", 1]].map(([l, n, a]) => (
          <button key={l} style={{
            border: "1px solid var(--ink-1)",
            background: a ? "var(--ink-0)" : "transparent",
            color: a ? "var(--paper-0)" : "var(--ink-1)",
            padding: "6px 10px", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
            whiteSpace: "nowrap", cursor: "pointer",
          }}>{l} · {String(n).padStart(2, "0")}</button>
        ))}
      </div>

      {/* Chapter cards (compact) */}
      <section style={{ padding: 0 }}>
        {chapters.map((c) => (
          <article key={c.num} style={{
            padding: "18px 16px",
            borderBottom: "1px solid var(--paper-edge)",
            background: c.featured ? "var(--paper-1)" : "transparent",
            position: "relative",
          }}>
            {c.featured && (
              <div className="stamp stamp--rotated" style={{ position: "absolute", top: 12, right: 12, fontSize: 8, padding: "3px 6px 2px", transform: "rotate(4deg)" }}>You're here</div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 0.85, color: c.featured ? "var(--classified)" : "var(--ink-0)", letterSpacing: "-0.02em" }}>
                {c.num}
              </div>
              <div>
                <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9, marginBottom: 4 }}>{c.kind}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18, lineHeight: 1.2, color: "var(--ink-0)", margin: "0 0 10px", textWrap: "balance" }}>{c.title}</h3>
                <div style={{ display: "flex", gap: 12, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}>
                  <span>{c.mins}m</span>
                  <span>{c.citations} cites</span>
                  {c.progress === 100 && <span style={{ color: "var(--field-green)" }}>✓ Read</span>}
                </div>
                {typeof c.progress === "number" && c.progress < 100 && (
                  <div style={{ height: 3, background: "var(--paper-edge)", marginBottom: 10 }}>
                    <div style={{ height: "100%", background: "var(--classified)", width: `${c.progress}%` }} />
                  </div>
                )}
                <a className={c.featured ? "btn btn--solid" : "btn"} style={{ width: "100%", height: 32, fontSize: 9 }}>
                  {c.progress === 100 ? "▸ Re-read" : c.featured ? "▸ Continue" : "▸ Read"}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

/* =====================================================================
   MOBILE 3 — READER
   ===================================================================== */
function ReaderMobile() {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto", background: "var(--paper-0)", fontFamily: "var(--font-serif)" }}>
      <MobileMasthead title="Ch. 02 · From the terraces…" showBack />

      {/* Tools strip */}
      <div style={{ padding: "8px 16px", borderBottom: "1px solid var(--paper-edge)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--paper-1)" }}>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={mobileTool}>A−</button>
          <button style={{ ...mobileTool, background: "var(--ink-0)", color: "var(--paper-0)" }}>A+</button>
          <button style={mobileTool}>☼</button>
          <button style={mobileTool}>▷</button>
        </div>
        <div className="mono" style={{ fontSize: 9, color: "var(--ink-3)" }}>32% · 26m left</div>
      </div>
      <div style={{ height: 2, background: "var(--paper-edge)" }}>
        <div style={{ width: "32%", height: "100%", background: "var(--classified)" }} />
      </div>

      {/* Opener */}
      <article style={{ padding: "28px 20px 20px" }}>
        <div className="eyebrow" style={{ marginBottom: 12, fontSize: 9, textAlign: "center" }}>
          ✦ &nbsp; Chapter Two &nbsp; ✦
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 32, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 14px", textWrap: "balance" }}>
          From the terraces to the trenches.
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 18px" }}>
          How a Russian football firm became a paramilitary brand.
        </p>
        <div style={{ display: "flex", gap: 14, paddingTop: 14, borderTop: "1px solid var(--ink-1)", borderBottom: "1px solid var(--paper-edge)", paddingBottom: 14, marginBottom: 24, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)", flexWrap: "wrap" }}>
          <span>Investigations Desk</span>
          <span style={{ color: "var(--classified)" }}>~ 38 min</span>
        </div>

        {/* figure */}
        <figure style={{ margin: "0 -20px 24px" }}>
          <div style={{ position: "relative", borderTop: "1px solid var(--ink-1)", borderBottom: "1px solid var(--ink-1)" }}>
            <img src="./assets/cover-hero.png" alt="" style={{ width: "100%", height: 220, objectFit: "cover", display: "block", filter: "grayscale(1) contrast(1.15) sepia(0.18)" }} />
            <div className="stamp stamp--rotated" style={{ position: "absolute", top: 12, right: 12, fontSize: 8, padding: "3px 6px 2px", background: "rgba(245,241,234,0.05)", color: "var(--paper-0)", borderColor: "var(--paper-0)" }}>FIG. I</div>
          </div>
          <figcaption style={{ padding: "10px 20px", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, lineHeight: 1.5, color: "var(--ink-2)" }}>
            Cover composite for the published edition. Distressed half-tone over recovered footage.
          </figcaption>
        </figure>

        {/* body */}
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 18px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, float: "left", fontSize: "4.6em", lineHeight: 0.85, padding: "6px 8px 0 0", color: "var(--classified)" }}>T</span>
          he first patches arrived on a Tuesday — eleven of them, hand-stitched, sealed in a manila envelope marked only with a stadium ticket stub from the previous Sunday's derby. By the end of that week, six of the eleven men who took a patch were on a marshrutka heading east.
        </p>

        {/* marginalia inline */}
        <aside style={{ background: "var(--paper-1)", border: "1px solid var(--paper-edge)", borderLeft: "3px solid var(--classified)", padding: "12px 14px", margin: "0 0 18px" }}>
          <div className="mono" style={{ color: "var(--classified)", fontSize: 9, marginBottom: 6 }}>† Marginalia · § 02.1</div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
            <em>Marshrutka</em> — Russian shared minibus. Multiple recruits described moving east in unmarked civilian transport, organized through Telegram channels.
          </p>
        </aside>

        <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 24px" }}>
          This is, by most accounts, the founding gesture of the formation that would later call itself <em>Española</em> — a name the unit's first commander, identified only by the call-sign <em>Spaniard</em>, claims to have chosen "for the football, not the country."
        </p>

        {/* pull quote */}
        <blockquote style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.25, color: "var(--ink-0)",
          borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)",
          padding: "18px 0", margin: "8px 0 24px",
        }}>
          <span style={{ color: "var(--classified)", fontFamily: "var(--font-display)", fontStyle: "normal", fontSize: 32, fontWeight: 700, marginRight: 6, verticalAlign: -6 }}>"</span>
          We didn't recruit. We rearranged what was already on the curva.
        </blockquote>
        <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9, marginBottom: 24 }}>— Subject "Karat" · Oct 2023</div>

        <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 18px" }}>
          What followed, between the spring of 2022 and the autumn of 2024, was not the conversion of a fan culture into a paramilitary so much as its reorganization. The personnel were already there. The hierarchies were already there.
        </p>
      </article>

      {/* End nav */}
      <section style={{ background: "var(--paper-1)", padding: "20px 16px", borderTop: "1px solid var(--ink-1)" }}>
        <div style={{ textAlign: "center", marginBottom: 14, fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.32em", color: "var(--ink-1)" }}>
          ✦ &nbsp; ✦ &nbsp; ✦
        </div>
        <a style={{ display: "block", padding: "14px 16px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textDecoration: "none", color: "inherit", marginBottom: 8 }}>
          <div className="eyebrow" style={{ fontSize: 8, color: "var(--ink-3)", marginBottom: 4 }}>‹ Previous · Ch. 01</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: "var(--ink-0)" }}>Prologue: Donbas, 2014</div>
        </a>
        <a style={{ display: "block", padding: "14px 16px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textDecoration: "none", color: "inherit", textAlign: "right" }}>
          <div className="eyebrow" style={{ fontSize: 8, marginBottom: 4 }}>Next · Ch. 03 ›</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 700, color: "var(--ink-0)" }}>Recruitment and the volunteer myth</div>
        </a>
      </section>
    </div>
  );
}

const mobileTool = {
  height: 30, padding: "0 10px", border: "1px solid var(--ink-1)",
  background: "transparent", color: "var(--ink-1)",
  fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
  textTransform: "uppercase", cursor: "pointer",
};

/* =====================================================================
   MOBILE 4 — GALLERY / SOURCES
   ===================================================================== */
function GalleryMobile() {
  const figs = [
    { id: "I.01", chapter: "Ch. 02", source: "Press svc.", date: "14.02.2024", type: "Press service" },
    { id: "II.04", chapter: "Ch. 02", source: "Field photo", date: "26.08.2022", type: "Field" },
    { id: "III.11", chapter: "Ch. 04", source: "Field photo", date: "18.06.2022", type: "Field" },
    { id: "IV.07", chapter: "Ch. 03", source: "Telegram", date: "03.10.2022", type: "Telegram", flagged: true },
    { id: "V.02", chapter: "Ch. 05", source: "Open-source", date: "11.11.2023", type: "Open-source" },
    { id: "VI.09", chapter: "Ch. 04", source: "Field", date: "29.08.2022", type: "Field" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto", background: "var(--paper-0)", fontFamily: "var(--font-serif)" }}>
      <MobileMasthead title="Section III · Sources" showBack />

      {/* Crumb */}
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        Overview › Section III › <span style={{ color: "var(--ink-0)" }}>Sources</span>
      </div>

      {/* Opener */}
      <section style={{ padding: "28px 16px 24px", borderBottom: "1px solid var(--paper-edge)" }}>
        <div className="eyebrow" style={{ marginBottom: 12, fontSize: 9 }}>Section · 03 · Appendices</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 76, lineHeight: 0.82, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 12 }}>
          SOUR-<br />CES.
        </div>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 20px" }}>
          Every claim traced to a primary source, intercepted transmission, or open-source verification.
        </p>
        <div style={{ borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)", padding: "8px 0" }}>
          {[["Image refs", "89"], ["Citations", "247"], ["Telegram", "63"], ["Interviews", "11"], ["Redactions", "14"]].map(([k, v], i, arr) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "6px 0", borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <span style={{ color: "var(--ink-3)" }}>{k}</span>
              <span style={{ color: "var(--ink-0)", fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter row */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)", display: "flex", gap: 6, overflowX: "auto" }}>
        {[["All", 89, true], ["Field", 28], ["Telegram", 24], ["Open-src", 19], ["Memorial", 11]].map(([l, n, a]) => (
          <button key={l} style={{
            border: "1px solid var(--ink-1)",
            background: a ? "var(--ink-0)" : "transparent",
            color: a ? "var(--paper-0)" : "var(--ink-1)",
            padding: "6px 10px", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
            whiteSpace: "nowrap", cursor: "pointer",
          }}>{l} · {String(n).padStart(2, "0")}</button>
        ))}
      </div>

      {/* Index card grid (2 cols) */}
      <section style={{ padding: "20px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {figs.map((f, i) => (
            <article key={f.id} style={{ position: "relative", transform: `rotate(${i % 2 === 0 ? -0.4 : 0.6}deg)` }}>
              <div style={{ position: "absolute", top: -8, left: 16, width: 36, height: 12, background: "rgba(212,200,170,0.7)", border: "1px solid rgba(28,26,22,0.08)", zIndex: 2 }} />
              <div style={{ background: "var(--paper-2)", border: "1px solid var(--ink-1)", boxShadow: "0 8px 14px -8px rgba(20,17,13,0.3)" }}>
                <div style={{ position: "relative", height: 100, overflow: "hidden", borderBottom: "1px solid var(--ink-1)" }}>
                  <img src="./assets/cover-hero.png" alt="" style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: `${20 + (i * 17) % 80}% ${10 + (i * 23) % 70}%`,
                    filter: "grayscale(1) contrast(1.1) sepia(0.15)",
                  }} />
                  {f.flagged && (
                    <div style={{ position: "absolute", top: 4, left: 4, background: "var(--classified)", color: "var(--paper-0)", padding: "2px 5px", fontFamily: "var(--font-mono)", fontSize: 7, letterSpacing: "0.16em", textTransform: "uppercase" }}>! Flag</div>
                  )}
                  <div style={{ position: "absolute", bottom: 4, right: 6, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--paper-0)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>FIG. {f.id}</div>
                </div>
                <div style={{ padding: "8px 10px", background: "var(--paper-1)", fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--paper-edge)" }}>
                  <span>{f.chapter}</span>
                  <span style={{ color: "var(--classified)" }}>{f.type}</span>
                </div>
                <div style={{ padding: "8px 10px", fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--ink-2)", letterSpacing: "0.04em" }}>
                  <div>{f.source}</div>
                  <div style={{ color: "var(--ink-3)" }}>{f.date}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a className="btn" style={{ width: "100%", fontSize: 9 }}>▾ Load 83 more</a>
        </div>
      </section>

      {/* Sources protocol — single card */}
      <section style={{ padding: "28px 16px", background: "var(--paper-1)", borderTop: "1px solid var(--paper-edge)" }}>
        <div className="eyebrow" style={{ marginBottom: 12, fontSize: 9, textAlign: "center" }}>✦ Editorial Protocol ✦</div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 22, lineHeight: 1.15, color: "var(--ink-0)", margin: "0 0 18px", textWrap: "balance", textAlign: "center" }}>
          How the desk handles sources.
        </h2>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            ["01", "How we verify", "Geo-V, Cross-ref, Archive-V on every figure."],
            ["02", "How we redact", "Call-signs and anonymization where required."],
            ["03", "How we cite Telegram", "Channel, message ID, timestamp on every capture."],
          ].map(([n, t, b]) => (
            <div key={n} style={{ background: "var(--paper-0)", border: "1px solid var(--ink-1)", padding: "14px 14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, lineHeight: 0.85, color: "var(--classified)" }}>№ {n}</div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 16, color: "var(--ink-0)", margin: "0 0 4px" }}>{t}</h3>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)", margin: 0 }}>{b}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomeMobile, SectionMobile, ReaderMobile, GalleryMobile });
