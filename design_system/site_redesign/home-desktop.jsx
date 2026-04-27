/* global React */
/* ==========================================================================
   COMP 1 — HOMEPAGE (desktop)
   Refined dossier: cover-hero is treated as a real book/case-file front cover,
   bound to the page by a ribbon. Editor's letter replaces flat promo grid.
   Section gateways become three numbered "folders" on a desk.
   Table of Contents in proper book grammar.
   ========================================================================== */

function HomeDesktop() {
  return (
    <div className="artboard" style={{ width: 1440, minHeight: 2400, fontFamily: "var(--font-serif)" }}>
      <HomeMasthead activePage="overview" />
      <HomeHero />
      <EditorsLetter />
      <SectionShelf />
      <TableOfContents />
      <FootnotesStrip />
      <SiteFooter />
    </div>
  );
}

/* ---------- Masthead ---------- */

function HomeMasthead({ activePage }) {
  const pages = ["Overview", "Chapters", "Sources", "Subjects", "Map"];
  return (
    <header className="masthead">
      <div className="masthead__top">
        <div className="masthead__meta-l">
          <span>Vol. I · No. 03</span>
          <span>Long-Form Edition</span>
          <span>April 26, 2026</span>
        </div>
        <div className="masthead__plate">ESPAÑOLA<span className="dot">.</span></div>
        <div className="masthead__meta-r">
          <span>The Investigations Desk</span>
          <span>Open-Source Release</span>
        </div>
      </div>
      <div className="masthead__strip">
        <div className="masthead__case">
          <span className="pulse" />
          Case File · UKR-ESP-17 · Active
        </div>
        <nav className="masthead__nav">
          {pages.map((p) => (
            <a key={p} href="#" className={p.toLowerCase() === activePage ? "is-active" : ""}>{p}</a>
          ))}
        </nav>
        <div>14 Reading Units · 38 Min Lead</div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function HomeHero() {
  return (
    <section style={{ position: "relative", padding: "48px 32px 64px", borderBottom: "1px solid var(--paper-edge)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 56, alignItems: "start" }}>
        {/* LEFT: editorial copy block */}
        <div style={{ paddingTop: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            ✦ &nbsp; Long-Form Investigation &nbsp; · &nbsp; Chapter 02
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: 84,
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            color: "var(--ink-0)",
            margin: "0 0 28px",
            textWrap: "balance",
          }}>
            From the terraces<br />to the trenches.
          </h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 24, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 28px", maxWidth: 560 }}>
            Born in the curva of Spartak Moscow, the unit known as <em>Española</em> has built one of the war's most recognizable visual identities — and one of its most opaque chains of command.
          </p>

          {/* dek metadata */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "auto 1px auto 1px auto",
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
            <span>By the Investigations Desk</span>
            <span style={{ background: "var(--ink-1)", height: 14 }} />
            <span>Filed 14 Feb 2024 · Updated 12 Apr 2026</span>
            <span style={{ background: "var(--ink-1)", height: 14 }} />
            <span style={{ color: "var(--classified)" }}>~ 38 min read</span>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="btn btn--solid">▸ Begin Chapter One</a>
            <a className="btn">Resume Chapter Two · 12 min left</a>
            <a className="btn">↡ Download Dossier (PDF)</a>
          </div>

          {/* Source provenance line */}
          <div style={{ marginTop: 36, paddingTop: 18, borderTop: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", lineHeight: 1.7 }}>
            Built from the canonical manuscript edition · v4.1 · 247 verified citations · 89 image references · 14 redactions.
          </div>
        </div>

        {/* RIGHT: bound cover artwork */}
        <BoundCover />
      </div>
    </section>
  );
}

function BoundCover() {
  return (
    <div style={{ position: "relative", paddingTop: 0 }}>
      {/* the ribbon binding it to the masthead */}
      <div style={{
        position: "absolute",
        top: -72,
        right: 64,
        width: 36,
        height: 220,
        background: "var(--classified)",
        zIndex: 3,
        boxShadow: "inset -2px 0 0 var(--classified-deep), 0 12px 24px -10px rgba(0,0,0,0.4)",
      }} />
      <div style={{
        position: "absolute",
        top: 132,
        right: 50,
        width: 64,
        height: 30,
        background: "var(--classified)",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
        zIndex: 3,
        boxShadow: "0 8px 18px -8px rgba(0,0,0,0.5)",
      }} />

      {/* cover with deep paper drop */}
      <div style={{
        position: "relative",
        boxShadow: "0 1px 0 rgba(0,0,0,0.06), 0 32px 60px -28px rgba(20,17,13,0.55), 0 12px 24px -16px rgba(20,17,13,0.4)",
        border: "1px solid var(--ink-1)",
        background: "var(--dossier-0)",
        transform: "rotate(0.6deg)",
      }}>
        <img src="./assets/cover-hero.png" alt="Española cover artwork"
          style={{ width: "100%", height: 720, objectFit: "cover", objectPosition: "center top", display: "block" }} />

        {/* small caption strip below */}
        <div style={{
          padding: "12px 16px",
          background: "var(--dossier-1)",
          borderTop: "1px solid var(--dossier-rule)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--dossier-fg-1)",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span>Cover · Edition 4.1</span>
          <span style={{ color: "var(--classified)" }}>Дело №17.02</span>
        </div>
      </div>

      {/* taped-on intercept slip */}
      <div style={{
        position: "absolute",
        bottom: -42,
        left: -36,
        width: 280,
        background: "var(--paper-2)",
        padding: "14px 16px",
        transform: "rotate(-3deg)",
        boxShadow: "0 8px 18px -10px rgba(20,17,13,0.4)",
        borderTop: "1px solid var(--paper-edge)",
        borderBottom: "1px solid var(--paper-edge)",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 6 }}>
          Intercept · 14:38 LCL
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.5, color: "var(--ink-1)" }}>
          "…seven on the inside, four on the road. <span style={{ background: "var(--ink-0)", color: "var(--ink-0)" }}>████████</span> moving north."
        </div>
        {/* tape */}
        <div style={{ position: "absolute", top: -8, left: 30, width: 60, height: 18, background: "rgba(212, 200, 170, 0.65)", border: "1px solid rgba(28, 26, 22, 0.08)" }} />
        <div style={{ position: "absolute", top: -8, right: 30, width: 60, height: 18, background: "rgba(212, 200, 170, 0.65)", border: "1px solid rgba(28, 26, 22, 0.08)" }} />
      </div>
    </div>
  );
}

/* ---------- Editor's Letter ---------- */

function EditorsLetter() {
  return (
    <section style={{ padding: "100px 32px 72px", borderBottom: "1px solid var(--paper-edge)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "180px 1fr 360px", gap: 56, alignItems: "start" }}>
        {/* big numeral */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: 156, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "-0.02em" }}>
          № 01
        </div>

        {/* the letter */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>From the Editor</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 44, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "0 0 24px", maxWidth: 720, textWrap: "balance" }}>
            A documented account of how a Russian football-ultra milieu became a branded wartime formation.
          </h2>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.65, color: "var(--ink-1)", margin: "0 0 16px", maxWidth: 720 }}>
            The book follows Española from supporter culture and the first Donbas war into recruitment, propaganda, battlefield reputation, patronage, state control, and the uncertainty around the formation's end. Every claim has been traced to a primary source, intercepted transmission, or open-source verification.
          </p>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 28px", maxWidth: 720 }}>
            This is the open-source web edition. The canonical manuscript, source notes, and image credits are preserved in full. We do not glorify; we document.
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
            <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "var(--ink-1)", letterSpacing: 0, textTransform: "none" }}>— A. Ortiz</em>
            <span>Editor, The Investigations Desk</span>
          </div>
        </div>

        {/* ledger */}
        <Ledger />
      </div>
    </section>
  );
}

function Ledger() {
  const rows = [
    ["Edition", "v4.1"],
    ["Reading Units", "14"],
    ["Image References", "89"],
    ["Verified Citations", "247"],
    ["Telegram Captures", "63"],
    ["Field Interviews", "11"],
    ["Subjects Documented", "27"],
    ["Last Updated", "12.04.2026"],
  ];
  return (
    <div style={{ border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--ink-1)", background: "var(--ink-0)", color: "var(--paper-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
        <span>Ledger</span>
        <span>This Edition</span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: 12 }}>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r[0]} style={{ borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--paper-edge)" }}>
              <td style={{ padding: "10px 16px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", width: "55%" }}>{r[0]}</td>
              <td style={{ padding: "10px 16px", textAlign: "right", color: "var(--ink-0)", letterSpacing: "0.06em", fontWeight: 700 }}>{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Section Shelf — three folders ---------- */

function SectionShelf() {
  const folders = [
    {
      num: "I",
      label: "Front Matter",
      title: "How to read the book",
      description: "Author note, methodology, AI-assistance disclosure, and terminology notes.",
      count: 4,
      stamp: "READ FIRST",
      tilt: -1.2,
    },
    {
      num: "II",
      label: "Chapters",
      title: "The narrative investigation",
      description: "From the stadium and Donbas to recruitment, branding, combat reputation, and state reabsorption.",
      count: 7,
      stamp: "OPEN",
      tilt: 0.8,
    },
    {
      num: "III",
      label: "Appendices",
      title: "Sources & reference links",
      description: "Reader-facing source notes, reference links, and source-handling context.",
      count: 3,
      stamp: "REFERENCE",
      tilt: -0.6,
    },
  ];
  return (
    <section style={{ padding: "88px 32px 96px", borderBottom: "1px solid var(--paper-edge)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "end", marginBottom: 44 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Book Sections · 03 Folders</div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 44, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: 0, maxWidth: 760, textWrap: "balance" }}>
              Enter by section, then move through the reader.
            </h2>
          </div>
          <div className="mono" style={{ color: "var(--ink-3)" }}>
            ↦ Or skip to the full Table of Contents
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {folders.map((f, i) => <Folder key={f.num} {...f} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function Folder({ num, label, title, description, count, stamp, tilt, index }) {
  return (
    <article style={{
      position: "relative",
      background: "var(--paper-2)",
      border: "1px solid var(--ink-1)",
      padding: "0 0 24px",
      transform: `rotate(${tilt}deg)`,
      boxShadow: "0 2px 0 rgba(28,26,22,0.05), 0 24px 40px -24px rgba(20,17,13,0.35)",
    }}>
      {/* tab */}
      <div style={{
        position: "absolute",
        top: -22,
        left: 32,
        height: 24,
        padding: "0 14px",
        background: "var(--paper-2)",
        border: "1px solid var(--ink-1)",
        borderBottom: "1px solid var(--paper-2)",
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--ink-1)",
      }}>
        {label}
      </div>

      {/* corner stamp */}
      <div className="stamp stamp--rotated" style={{ position: "absolute", top: 14, right: 14, transform: "rotate(4deg)" }}>
        {stamp}
      </div>

      {/* number */}
      <div style={{ padding: "32px 28px 12px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 96, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "-0.02em" }}>
          {num}
        </div>
      </div>

      {/* divider */}
      <div style={{ height: 1, background: "var(--ink-1)", margin: "0 28px 18px" }} />

      <div style={{ padding: "0 28px" }}>
        <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: "var(--ink-0)", margin: "0 0 10px" }}>
          {title}
        </h3>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 22px" }}>
          {description}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--paper-edge)" }}>
          <span className="mono" style={{ color: "var(--ink-3)" }}>{String(count).padStart(2, "0")} items inside</span>
          <a className="btn" style={{ height: 36, padding: "0 14px", fontSize: 10 }}>Open ▸</a>
        </div>
      </div>
    </article>
  );
}

/* ---------- Table of Contents ---------- */

function TableOfContents() {
  const sections = [
    {
      label: "Front Matter",
      items: [
        ["I", "Author Note", "Angel Ortiz", 8, "i"],
        ["II", "Methodology & Sourcing", "Investigations Desk", 12, "v"],
        ["III", "AI-Assistance Disclosure", "Editorial", 6, "ix"],
        ["IV", "Terminology & Translation Notes", "Editorial", 9, "xiii"],
      ],
    },
    {
      label: "Chapters",
      items: [
        ["01", "Prologue: Donbas, 2014", "Field reportage", 22, 1],
        ["02", "From the terraces to the trenches", "Long-form investigation", 38, 23],
        ["03", "Recruitment and the volunteer myth", "Investigation", 41, 61],
        ["04", "Branding a paramilitary", "Visual analysis", 27, 102],
        ["05", "Combat reputation: the Kreminna sector", "Reportage", 34, 129],
        ["06", "Patronage and the state", "Investigation", 31, 163],
        ["07", "End-states and the unmaking", "Reportage", 19, 194],
      ],
    },
    {
      label: "Appendices",
      items: [
        ["A", "Source Notes", "Editorial", 14, 213],
        ["B", "Reference Links Guide", "Editorial", 9, 227],
        ["C", "Image Credits & Rights", "Editorial", 11, 236],
      ],
    },
  ];

  return (
    <section style={{ padding: "88px 32px 96px", borderBottom: "1px solid var(--paper-edge)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>✦ &nbsp; Reader Index &nbsp; ✦</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 56, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: 0 }}>
            Table of Contents
          </h2>
          <div style={{ width: 80, height: 1, background: "var(--ink-1)", margin: "20px auto 0" }} />
        </div>

        {sections.map((s) => (
          <div key={s.label} style={{ marginBottom: 56 }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center", marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>
                {s.label}
              </span>
              <span style={{ height: 1, background: "var(--ink-1)" }} />
              <span className="mono" style={{ color: "var(--ink-3)" }}>{s.items.length} items</span>
            </div>

            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {s.items.map((it, idx) => <TocRow key={it[1]} num={it[0]} title={it[1]} byline={it[2]} mins={it[3]} page={it[4]} highlight={s.label === "Chapters" && idx === 1} />)}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

function TocRow({ num, title, byline, mins, page, highlight }) {
  return (
    <li style={{
      display: "grid",
      gridTemplateColumns: "70px 1fr auto 90px 80px",
      gap: 14,
      alignItems: "baseline",
      padding: "14px 0",
      borderBottom: "1px solid var(--paper-edge)",
      background: highlight ? "var(--paper-1)" : "transparent",
      paddingLeft: highlight ? 14 : 0,
      paddingRight: highlight ? 14 : 0,
      borderLeft: highlight ? "3px solid var(--classified)" : "3px solid transparent",
    }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "0.06em", color: highlight ? "var(--classified)" : "var(--ink-0)" }}>
        {num}
      </span>
      <span>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "var(--ink-0)", letterSpacing: "-0.005em" }}>
          {title}
        </span>
        {highlight && <span className="stamp" style={{ marginLeft: 12, fontSize: 9, padding: "3px 7px 2px" }}>You're here</span>}
        <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-3)", marginTop: 3 }}>
          {byline}
        </div>
      </span>
      {/* dot leaders */}
      <span style={{ borderBottom: "1px dotted var(--ink-3)", height: 14, alignSelf: "end", minWidth: 80 }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)", textAlign: "right" }}>
        {mins} min read
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--ink-1)", textAlign: "right", letterSpacing: "0.06em" }}>
        p. {page}
      </span>
    </li>
  );
}

/* ---------- Footnotes strip ---------- */

function FootnotesStrip() {
  return (
    <section style={{ padding: "48px 32px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: 40, alignItems: "start" }}>
        <div className="eyebrow" style={{ paddingTop: 4 }}>Editorial Notes</div>
        {[
          ["†", "All Russian terms appear in italics with translation; Cyrillic only when the source uses it."],
          ["‡", "Subjects are referred to by full name on first mention, surname after; redacted where required."],
          ["§", "Open-source claims are flagged with attribution; intercepted transmissions cite their channel and time."],
        ].map(([sym, text], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 10 }}>
            <span style={{ color: "var(--classified)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{sym}</span>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <div className="site-footer__brand">ESPAÑOLA<span className="dot">.</span></div>
          <p className="site-footer__lede">
            From Hooligans to War Machines is presented here as a web reader built from the canonical manuscript edition and its source notes.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <a className="btn btn--bone" style={{ height: 36, fontSize: 10 }}>↡ Manuscript v4.1</a>
            <a className="btn btn--bone" style={{ height: 36, fontSize: 10 }}>↡ Source Bundle</a>
          </div>
        </div>
        <div className="site-footer__col">
          <h4>Read</h4>
          <ul>
            <li><a>Start reading</a></li>
            <li><a>Author note</a></li>
            <li><a>Methodology</a></li>
            <li><a>Terminology</a></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h4>Sources</h4>
          <ul>
            <li><a>Source notes</a></li>
            <li><a>Reference links</a></li>
            <li><a>Image credits</a></li>
            <li><a>Open intelligence</a></li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h4>Desk</h4>
          <ul>
            <li><a>Editor's note</a></li>
            <li><a>Corrections</a></li>
            <li><a>Contact</a></li>
            <li><a>License</a></li>
          </ul>
        </div>
      </div>
      <div className="site-footer__rule">
        <span>© The Investigations Desk · MMXXVI</span>
        <span>File last updated 12.04.2026 · CC BY-NC-SA 4.0</span>
      </div>
    </footer>
  );
}

Object.assign(window, { HomeDesktop, HomeMasthead, SiteFooter });
