/* global React */
/* ==========================================================================
   COMP 2 — SECTION LANDING (desktop)
   "Chapters" section view: each chapter is treated like a chapter opener
   in a printed book — running head, opening figure, dek, tools.
   This is what you see after clicking a folder on the homepage.
   ========================================================================== */

function SectionDesktop() {
  return (
    <div className="artboard" style={{ width: 1440, minHeight: 2400, fontFamily: "var(--font-serif)" }}>
      <HomeMasthead activePage="chapters" />
      <SectionBreadcrumb />
      <SectionOpener />
      <SectionToolbar />
      <ChapterShelf />
      <SectionEnd />
      <SiteFooter />
    </div>
  );
}

/* ---------- Breadcrumb under masthead ---------- */

function SectionBreadcrumb() {
  return (
    <div style={{ borderBottom: "1px solid var(--paper-edge)", padding: "12px 32px", background: "var(--paper-0)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        <span>Overview</span>
        <span>›</span>
        <span>Section II</span>
        <span>›</span>
        <span style={{ color: "var(--ink-0)" }}>Chapters</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: "var(--classified)" }}>● 7 of 14 reading units</span>
      </div>
    </div>
  );
}

/* ---------- Section Opener — chapter-opener style ---------- */

function SectionOpener() {
  return (
    <section style={{ position: "relative", padding: "72px 32px 56px", borderBottom: "1px solid var(--paper-edge)", overflow: "hidden" }}>
      <div className="tick" style={{ top: 18, left: 18 }} />
      <div className="tick" style={{ top: 18, right: 18 }} />
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", marginBottom: 36, gap: 24 }}>
          <div className="eyebrow">Section · 02</div>
          <div style={{ height: 1, background: "var(--ink-1)" }} />
          <div className="mono" style={{ color: "var(--ink-3)" }}>The Narrative Investigation</div>
        </div>

        {/* Massive section title */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 240, lineHeight: 0.82, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 18 }}>
              CHAP-<br />TERS.
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 26, lineHeight: 1.4, color: "var(--ink-2)", margin: "0 0 0", maxWidth: 720, textWrap: "balance" }}>
              Seven reading units that follow the unit from the supporter culture of Spartak Moscow into recruitment, propaganda, battlefield reputation, patronage, state control, and the uncertainty around the formation's end.
            </h2>
          </div>
          <SectionStats />
        </div>
      </div>
    </section>
  );
}

function SectionStats() {
  const items = [
    ["Chapters", "07"],
    ["Total reading time", "3h 32m"],
    ["Image references", "61"],
    ["Citations", "184"],
    ["Last revised", "12.04.2026"],
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

/* ---------- Toolbar: filter / sort / search ---------- */

function SectionToolbar() {
  const filters = [
    { label: "All", count: 7, active: true },
    { label: "Long-form", count: 3 },
    { label: "Reportage", count: 3 },
    { label: "Visual", count: 1 },
  ];
  return (
    <div style={{ padding: "20px 32px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 24, alignItems: "center" }}>
        <span className="mono" style={{ color: "var(--ink-3)" }}>Filter</span>
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
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}>
              {f.label}
              <span style={{ opacity: 0.6, fontSize: 9 }}>{String(f.count).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--ink-1)", padding: "0 12px", height: 36, background: "var(--paper-0)" }}>
          <span className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>⌕</span>
          <input type="search" placeholder="search chapter, callsign, place…" style={{
            border: "none", background: "transparent", outline: "none", height: 34, width: 280,
            fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink-1)",
          }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <span>Sort</span>
          <span style={{ color: "var(--ink-0)", borderBottom: "1px solid var(--ink-0)", paddingBottom: 1 }}>Manuscript order ▾</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Chapter Shelf — list of chapter cards ---------- */

function ChapterShelf() {
  const chapters = [
    {
      num: "01",
      kind: "Field reportage",
      title: "Prologue: Donbas, 2014",
      dek: "Before Española had a name, hooligan firms ran 'tactical excursions' across an unmarked border. The first volunteers, the first patches, the first dead.",
      mins: 22,
      images: 6,
      citations: 18,
      tag: "Read first",
      progress: 100,
    },
    {
      num: "02",
      kind: "Long-form investigation",
      title: "From the terraces to the trenches",
      dek: "How a supporter network of Spartak Moscow, CSKA, and Zenit ultras was reorganized into a paramilitary formation under a single Spaniard-named brand.",
      mins: 38,
      images: 11,
      citations: 31,
      tag: "Continue",
      progress: 32,
      featured: true,
    },
    {
      num: "03",
      kind: "Investigation",
      title: "Recruitment and the volunteer myth",
      dek: "The 'volunteer' label, the Telegram-channel pipeline, and the casualty rate inside the unit's first year of recruiting.",
      mins: 41,
      images: 9,
      citations: 28,
    },
    {
      num: "04",
      kind: "Visual analysis",
      title: "Branding a paramilitary",
      dek: "Skulls, banners, hooligan firm aesthetics, and orthodox imagery — how a wartime visual identity was assembled from supporter-culture parts.",
      mins: 27,
      images: 14,
      citations: 19,
    },
    {
      num: "05",
      kind: "Reportage",
      title: "Combat reputation: the Kreminna sector",
      dek: "Verified geolocation, intercepted radio traffic, and the formation's contribution to assault operations between November 2023 and April 2024.",
      mins: 34,
      images: 12,
      citations: 41,
    },
    {
      num: "06",
      kind: "Investigation",
      title: "Patronage and the state",
      dek: "Who paid, who armed, who promoted. The chain of command from supporter culture through commercial sponsors to the Russian state.",
      mins: 31,
      images: 5,
      citations: 33,
    },
    {
      num: "07",
      kind: "Reportage",
      title: "End-states and the unmaking",
      dek: "The slow reabsorption of independent volunteer formations under formal state command — and the open question of what becomes of the brand.",
      mins: 19,
      images: 4,
      citations: 14,
    },
  ];

  return (
    <section style={{ padding: "56px 32px 72px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gap: 0 }}>
        {chapters.map((c) => <ChapterCard key={c.num} {...c} />)}
      </div>
    </section>
  );
}

function ChapterCard({ num, kind, title, dek, mins, images, citations, tag, progress, featured }) {
  return (
    <article style={{
      display: "grid",
      gridTemplateColumns: "120px 1fr 320px",
      gap: 40,
      padding: "32px 0",
      borderBottom: "1px solid var(--paper-edge)",
      borderTop: featured ? "1px solid var(--ink-1)" : "none",
      background: featured ? "var(--paper-1)" : "transparent",
      paddingLeft: featured ? 24 : 0,
      paddingRight: featured ? 24 : 0,
      position: "relative",
    }}>
      {featured && (
        <div className="stamp stamp--rotated" style={{ position: "absolute", top: 18, right: 18, transform: "rotate(4deg)" }}>
          You're reading
        </div>
      )}

      {/* Big roman / number */}
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 88, lineHeight: 0.85, color: featured ? "var(--classified)" : "var(--ink-0)", letterSpacing: "-0.02em" }}>
          {num}
        </div>
        <div className="mono" style={{ color: "var(--ink-3)", marginTop: 10 }}>
          {kind}
        </div>
      </div>

      {/* Body */}
      <div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 32, lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "4px 0 12px", textWrap: "balance" }}>
          {title}
        </h3>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 18px", maxWidth: 640 }}>
          {dek}
        </p>
        <div style={{ display: "flex", gap: 22, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <span>{mins} min read</span>
          <span>{images} images</span>
          <span>{citations} citations</span>
        </div>
      </div>

      {/* Right rail */}
      <div style={{ display: "grid", gap: 14, alignContent: "start", paddingTop: 4 }}>
        {/* progress bar */}
        {typeof progress === "number" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 6 }}>
              <span>Progress</span>
              <span style={{ color: progress === 100 ? "var(--field-green)" : "var(--classified)" }}>
                {progress === 100 ? "Read" : `${progress}%`}
              </span>
            </div>
            <div style={{ height: 4, background: "var(--paper-edge)" }}>
              <div style={{ height: "100%", background: progress === 100 ? "var(--field-green)" : "var(--classified)", width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* CTA */}
        <a className={tag === "Continue" ? "btn btn--solid" : "btn"} style={{ width: "100%" }}>
          {tag === "Read first" ? "▸ Begin" : tag === "Continue" ? "▸ Continue · 26m left" : "▸ Read"}
        </a>

        {/* file ref */}
        <div className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>
          File ref: ESP-CH-{num}
        </div>
      </div>
    </article>
  );
}

/* ---------- Section End — what comes next ---------- */

function SectionEnd() {
  return (
    <section style={{ padding: "64px 32px", borderTop: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <a style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--ink-0)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            ‹
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Previous Section</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "var(--ink-0)" }}>I — Front Matter</div>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-2)", marginTop: 4 }}>
              Author note · methodology · disclosure
            </div>
          </div>
        </a>
        <a style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textAlign: "right" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Next Section</div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "var(--ink-0)" }}>III — Appendices</div>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-2)", marginTop: 4 }}>
              Source notes · reference links · image credits
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--classified)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            ›
          </div>
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { SectionDesktop });
