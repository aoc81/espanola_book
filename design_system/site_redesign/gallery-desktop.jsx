/* global React */
/* ==========================================================================
   COMP 4 — IMAGE GALLERY / SOURCES (desktop)
   The Appendices view: instead of a flat link list, treat sources as
   evidence — index-card grid for image references, ledger for citations,
   and a callout strip for the methodology disclosures.
   ========================================================================== */

function GalleryDesktop() {
  return (
    <div className="artboard" style={{ width: 1440, minHeight: 2400, fontFamily: "var(--font-serif)" }}>
      <HomeMasthead activePage="sources" />
      <GalleryBreadcrumb />
      <GalleryHero />
      <GalleryFilters />
      <ImageGrid />
      <CitationsLedger />
      <SourceHandling />
      <SiteFooter />
    </div>
  );
}

function GalleryBreadcrumb() {
  return (
    <div style={{ borderBottom: "1px solid var(--paper-edge)", padding: "12px 32px", background: "var(--paper-0)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        <span>Overview</span>
        <span>›</span>
        <span>Section III</span>
        <span>›</span>
        <span style={{ color: "var(--ink-0)" }}>Sources & Image References</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: "var(--classified)" }}>● 247 citations · 89 image references</span>
      </div>
    </div>
  );
}

function GalleryHero() {
  return (
    <section style={{ position: "relative", padding: "72px 32px 48px", borderBottom: "1px solid var(--paper-edge)" }}>
      <div className="tick" style={{ top: 18, left: 18 }} />
      <div className="tick" style={{ top: 18, right: 18 }} />
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", marginBottom: 36, gap: 24 }}>
          <div className="eyebrow">Section · 03 · Appendices</div>
          <div style={{ height: 1, background: "var(--ink-1)" }} />
          <div className="mono" style={{ color: "var(--ink-3)" }}>The Evidence Room</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "end" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 200, lineHeight: 0.82, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 18 }}>
              SOUR-<br />CES.
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 26, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 800, textWrap: "balance" }}>
              Every claim in this book is traced to a primary source, intercepted transmission, or open-source verification. Below: image references in full, citations by chapter, and the desk's source-handling protocol.
            </h2>
          </div>
          <SourceStats />
        </div>
      </div>
    </section>
  );
}

function SourceStats() {
  const items = [
    ["Image references", "89"],
    ["Verified citations", "247"],
    ["Telegram captures", "63"],
    ["Field interviews", "11"],
    ["Open-source verifications", "184"],
    ["Redactions", "14"],
  ];
  return (
    <div style={{ paddingBottom: 12 }}>
      <div style={{ borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)" }}>
        {items.map((it, i) => (
          <div key={it[0]} style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 12,
            padding: "12px 4px",
            borderBottom: i === items.length - 1 ? "none" : "1px solid var(--paper-edge)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}>
            <span style={{ color: "var(--ink-3)" }}>{it[0]}</span>
            <span style={{ color: "var(--ink-0)", fontWeight: 700 }}>{it[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Filter strip ---------- */

function GalleryFilters() {
  const filters = [
    { label: "All", count: 89, active: true },
    { label: "Field", count: 28 },
    { label: "Telegram", count: 24 },
    { label: "Open-source", count: 19 },
    { label: "Memorial", count: 11 },
    { label: "Press service", count: 7 },
  ];
  return (
    <div style={{ padding: "20px 32px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center" }}>
        <span className="mono" style={{ color: "var(--ink-3)" }}>Image references · Filter</span>
        <div style={{ display: "flex", gap: 4 }}>
          {filters.map((f) => (
            <button key={f.label} style={{
              border: "1px solid var(--ink-1)",
              background: f.active ? "var(--ink-0)" : "transparent",
              color: f.active ? "var(--paper-0)" : "var(--ink-1)",
              padding: "8px 14px",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              {f.label}
              <span style={{ opacity: 0.6 }}>{String(f.count).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button style={{ border: "1px solid var(--ink-1)", background: "var(--ink-0)", color: "var(--paper-0)", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>▦ Grid</button>
          <button style={{ border: "1px solid var(--ink-1)", background: "transparent", color: "var(--ink-1)", padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>≡ List</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Image grid — index cards ---------- */

function ImageGrid() {
  const figs = [
    { id: "I.01", chapter: "Ch. 02", caption: "Cover composite. Distressed half-tone over recovered footage; figure unidentified by press service.", source: "Composite", verified: "Geo-V", date: "14.02.2024", tilt: 0.6, type: "Press service", flagged: false },
    { id: "II.04", chapter: "Ch. 02", caption: "Wrecked truck near Kreminna. Stencil reproduction of the unit wordmark visible on cargo door.", source: "Field photo", verified: "Geo-V", date: "26.08.2022", tilt: -0.4, type: "Field" },
    { id: "III.11", chapter: "Ch. 04", caption: "Patch reverse — eleven-pointed star with stitched serial number 003 / unidentified bench studio.", source: "Field photo", verified: "Cross-ref", date: "18.06.2022", tilt: 0.8, type: "Field" },
    { id: "IV.07", chapter: "Ch. 03", caption: "Recruitment graphic distributed via @esp_unit. Casualty memorial format used through autumn 2022.", source: "Telegram", verified: "Archive-V", date: "03.10.2022", tilt: -0.7, type: "Telegram", flagged: true },
    { id: "V.02", chapter: "Ch. 05", caption: "Geolocation reconstruction — Kreminna sector, treeline horizon contour matched to satellite passes.", source: "Open-source", verified: "Geo-V", date: "11.11.2023", tilt: 0.3, type: "Open-source" },
    { id: "VI.09", chapter: "Ch. 04", caption: "Stencil tooling. Cardboard original photographed at forward base; later reproductions are vector.", source: "Field photo", verified: "Cross-ref", date: "29.08.2022", tilt: -0.5, type: "Field" },
    { id: "VII.13", chapter: "Ch. 06", caption: "Memorial graphic, single name redacted at family request. Original unredacted version on file.", source: "Telegram", verified: "Archive-V", date: "12.04.2024", tilt: 0.4, type: "Memorial", redacted: true },
    { id: "VIII.05", chapter: "Ch. 02", caption: "Spartak Fratria firm pennant, 2011. Visual ancestor of the unit's later vexillological identity.", source: "Supporter pubs.", verified: "Cross-ref", date: "ca. 2011", tilt: -0.6, type: "Open-source" },
  ];

  return (
    <section style={{ padding: "56px 32px 72px", borderBottom: "1px solid var(--paper-edge)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, rowGap: 56 }}>
          {figs.map((f) => <IndexCard key={f.id} {...f} />)}
        </div>
        <div style={{ marginTop: 56, textAlign: "center" }}>
          <a className="btn">▾ Load 81 more references</a>
        </div>
      </div>
    </section>
  );
}

function IndexCard({ id, chapter, caption, source, verified, date, tilt, type, flagged, redacted }) {
  return (
    <article style={{ position: "relative", transform: `rotate(${tilt}deg)` }}>
      {/* tape */}
      <div style={{ position: "absolute", top: -10, left: 24, width: 56, height: 16, background: "rgba(212, 200, 170, 0.7)", border: "1px solid rgba(28, 26, 22, 0.08)", zIndex: 2 }} />

      <div style={{
        background: "var(--paper-2)",
        border: "1px solid var(--ink-1)",
        boxShadow: "0 16px 28px -18px rgba(20,17,13,0.4)",
      }}>
        {/* image */}
        <div style={{ position: "relative", height: 200, overflow: "hidden", borderBottom: "1px solid var(--ink-1)" }}>
          <img src="./assets/cover-hero.png" alt="" style={{
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: `${20 + (id.charCodeAt(0) % 5) * 15}% ${10 + (id.charCodeAt(2) % 5) * 18}%`,
            filter: "grayscale(1) contrast(1.1) sepia(0.15) brightness(0.92)",
          }} />
          {redacted && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,7,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="stamp stamp--big" style={{ background: "var(--paper-0)", color: "var(--classified)" }}>
                ████ Redacted ████
              </div>
            </div>
          )}
          {flagged && (
            <div style={{ position: "absolute", top: 8, left: 8, background: "var(--classified)", color: "var(--paper-0)", padding: "3px 8px", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              ! Foreign agent src.
            </div>
          )}
          <div style={{ position: "absolute", bottom: 8, right: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--paper-0)", letterSpacing: "0.06em", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
            FIG. {id}
          </div>
        </div>

        {/* meta header */}
        <div style={{ padding: "10px 14px", background: "var(--paper-1)", borderBottom: "1px solid var(--paper-edge)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <span>{chapter}</span>
          <span style={{ color: "var(--classified)" }}>{type}</span>
        </div>

        {/* caption */}
        <div style={{ padding: "14px 14px 16px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.5, color: "var(--ink-1)", margin: "0 0 12px", minHeight: 60 }}>
            {caption}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, paddingTop: 10, borderTop: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            <div>
              <div style={{ color: "var(--ink-3)", fontSize: 8, letterSpacing: "0.2em", marginBottom: 2 }}>SOURCE</div>
              <div style={{ color: "var(--ink-1)" }}>{source}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--ink-3)", fontSize: 8, letterSpacing: "0.2em", marginBottom: 2 }}>{verified}</div>
              <div style={{ color: "var(--ink-1)" }}>{date}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Citations Ledger ---------- */

function CitationsLedger() {
  const rows = [
    ["01", "Prologue: Donbas, 2014", 18, "Field reportage", "Lo"],
    ["02", "From the terraces to the trenches", 31, "Long-form investigation", "Hi"],
    ["03", "Recruitment and the volunteer myth", 28, "Investigation", "Hi"],
    ["04", "Branding a paramilitary", 19, "Visual analysis", "Med"],
    ["05", "Combat reputation: Kreminna", 41, "Reportage", "Hi"],
    ["06", "Patronage and the state", 33, "Investigation", "Hi"],
    ["07", "End-states and the unmaking", 14, "Reportage", "Lo"],
    ["A", "Source Notes", 24, "Editorial", "—"],
    ["B", "Reference Links Guide", 9, "Editorial", "—"],
    ["C", "Image Credits & Rights", 30, "Editorial", "—"],
  ];
  const sensitivityColor = { Hi: "var(--classified)", Med: "var(--ink-1)", Lo: "var(--ink-3)", "—": "var(--ink-3)" };

  return (
    <section style={{ padding: "72px 32px 88px", borderBottom: "1px solid var(--paper-edge)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "baseline", marginBottom: 28 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>
            ✦ Citations Ledger ✦
          </span>
          <span style={{ height: 1, background: "var(--ink-1)" }} />
          <span className="mono" style={{ color: "var(--ink-3)" }}>By chapter · 247 total</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "0 0 28px", maxWidth: 720 }}>
          Every chapter, every count, every sensitivity classification.
        </h3>

        <div style={{ border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 200px 120px 90px", padding: "12px 18px", background: "var(--ink-0)", color: "var(--paper-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            <span>№</span>
            <span>Chapter</span>
            <span>Genre</span>
            <span style={{ textAlign: "right" }}>Citations</span>
            <span style={{ textAlign: "right" }}>Sens.</span>
          </div>
          {rows.map((r, i) => (
            <div key={r[1]} style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 200px 120px 90px",
              padding: "16px 18px",
              borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--paper-edge)",
              alignItems: "center",
              background: i >= 7 ? "var(--paper-2)" : "transparent",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: i >= 7 ? "var(--classified)" : "var(--ink-0)" }}>
                {r[0]}
              </span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 17, color: "var(--ink-0)", fontWeight: 700 }}>
                {r[1]}
              </span>
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-2)" }}>
                {r[3]}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--ink-1)", textAlign: "right", letterSpacing: "0.06em" }}>
                {r[2]}
              </span>
              <span style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: sensitivityColor[r[4]], fontWeight: 700 }}>
                  ● {r[4]}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 18, display: "flex", gap: 24, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
          <span><span style={{ color: "var(--classified)" }}>● Hi</span> — sensitive sourcing, multiple anonymized subjects</span>
          <span><span style={{ color: "var(--ink-1)" }}>● Med</span> — partly sensitive, some redactions in place</span>
          <span><span style={{ color: "var(--ink-3)" }}>● Lo</span> — public-domain or open-source primary material</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Source Handling — three editorial cards ---------- */

function SourceHandling() {
  const cards = [
    {
      n: "01",
      title: "How we verify",
      body: "Geo-V (geolocation by satellite contour matching), Cross-ref (claim corroborated by ≥2 independent sources), and Archive-V (timestamped against deduplicated Telegram archive) classifications appear on every figure and citation. Unverified material is excluded from the manuscript edition.",
    },
    {
      n: "02",
      title: "How we redact",
      body: "Subjects are referred to by full name on first mention, surname after, except where a family or interview agreement requires the use of a call-sign or full anonymization. Redacted images are kept on file in unredacted form for editorial reference; original metadata is preserved separately.",
    },
    {
      n: "03",
      title: "How we cite Telegram",
      body: "Every Telegram capture preserves the channel handle, message ID, and capture timestamp. Where the channel has been deleted, the Wayback Machine snapshot reference is published instead. We do not cite a Telegram message we cannot independently re-fetch.",
    },
  ];
  return (
    <section style={{ padding: "72px 32px 96px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>✦ &nbsp; Editorial Protocol &nbsp; ✦</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 44, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: 0, maxWidth: 760, marginInline: "auto", textWrap: "balance" }}>
            How the desk handles sources, redactions, and Telegram captures.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {cards.map((c) => (
            <div key={c.n} style={{
              background: "var(--paper-0)",
              border: "1px solid var(--ink-1)",
              padding: "28px 28px 32px",
              position: "relative",
            }}>
              <div className="tick" style={{ top: 10, left: 10 }} />
              <div className="tick" style={{ top: 10, right: 10 }} />
              <div className="tick" style={{ bottom: 10, left: 10 }} />
              <div className="tick" style={{ bottom: 10, right: 10 }} />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 56, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "-0.02em", marginBottom: 18 }}>
                № {c.n}
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 22, lineHeight: 1.2, color: "var(--ink-0)", margin: "0 0 14px" }}>
                {c.title}
              </h3>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { GalleryDesktop });
