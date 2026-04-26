/* global React */
const { useState } = React;

function Masthead() {
  return (
    <header style={{
      borderBottom: "1px solid var(--ink-1)",
      background: "var(--paper-0)",
      padding: "14px 0",
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 16
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          VOL. I · NO. 3 · LONG-FORM
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center", color: "var(--ink-0)" }}>
          ESPAÑOLA<span style={{ color: "var(--classified)" }}>.</span>
        </div>
        <nav style={{ display: "flex", justifyContent: "flex-end", gap: 22, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-1)" }}>
          <a style={{ color: "inherit", textDecoration: "none", borderBottom: "2px solid var(--classified)", paddingBottom: 2 }}>Chapters</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>Sources</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>Map</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>Subjects</a>
        </nav>
      </div>
    </header>
  );
}

function CoverHero() {
  return (
    <section style={{ position: "relative", height: "82vh", minHeight: 560, background: "var(--dossier-0)", overflow: "hidden" }}>
      <img src="../../assets/cover-hero.png" alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 22%", filter: "grayscale(0.7) contrast(1.05) sepia(0.1)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,7,0.4) 0%, rgba(10,9,7,0.1) 35%, rgba(10,9,7,0.85) 100%)" }} />
      {/* dossier metadata top-left */}
      <div style={{ position: "absolute", top: 28, left: 28, fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.7, letterSpacing: "0.1em", color: "var(--dossier-fg-0)", textTransform: "uppercase" }}>
        <div>FILE: E-1127/23</div>
        <div>CASE ID: UKR-ESP-17</div>
        <div>SUBJECT: VOLUNTEERS / UNIDADES DE ASALTO</div>
        <div>STATUS: <span style={{ color: "var(--classified)" }}>ACTIVE</span></div>
      </div>
      {/* coordinates top-right */}
      <div style={{ position: "absolute", top: 28, right: 28, fontFamily: "var(--font-data)", fontSize: 11, lineHeight: 1.7, letterSpacing: "0.06em", color: "var(--dossier-fg-0)", textAlign: "right" }}>
        <div>48.3794° N</div>
        <div>31.1656° E</div>
        <div>GRID 36T WN 448 763</div>
      </div>
      {/* stamp */}
      <div style={{ position: "absolute", top: 32, right: 220, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "0.22em", padding: "6px 12px 5px", color: "var(--classified)", border: "2px solid var(--classified)", transform: "rotate(-4deg)", textTransform: "uppercase" }}>
        Дело № 17.02
      </div>
      {/* bottom byline */}
      <div style={{ position: "absolute", bottom: 32, left: 28, right: 28, color: "var(--dossier-fg-0)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 10 }}>
          AN INVESTIGATION · CHAPTER 02
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "0.02em", textTransform: "uppercase" }}>
          From the terraces<br />to the trenches.
        </div>
      </div>
    </section>
  );
}

function Dek() {
  return (
    <section style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 24px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 20 }}>
        CASE FILE · UKR-ESP-17 · UPDATED 14.02.2024
      </div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "0 0 22px" }}>
        How a Russian football firm became a paramilitary brand.
      </h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 28px" }}>
        Born in the terraces of Spartak Moscow, the unit known as <em>Española</em> has built one of the war's most recognizable visual identities — and one of its most opaque chains of command.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        <span>By the Investigations Desk</span>
        <span>~ 38 min read · 14.02.2024</span>
      </div>
    </section>
  );
}

function DropCapParagraph({ children }) {
  return (
    <p style={{
      fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.65, color: "var(--ink-1)",
      margin: "0 auto 22px", maxWidth: 680, padding: "0 24px"
    }}>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, float: "left", fontSize: "5em", lineHeight: 0.85, padding: "6px 10px 0 0", color: "var(--ink-0)" }}>
        {String(children).trim()[0]}
      </span>
      {String(children).trim().slice(1)}
    </p>
  );
}

function BodyParagraph({ children }) {
  return (
    <p style={{
      fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.65, color: "var(--ink-1)",
      margin: "0 auto 22px", maxWidth: 680, padding: "0 24px"
    }}>{children}</p>
  );
}

function PullQuote({ children, attribution }) {
  return (
    <aside style={{ maxWidth: 760, margin: "44px auto", padding: "0 24px" }}>
      <blockquote style={{
        fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 32, lineHeight: 1.3,
        color: "var(--ink-0)", borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)",
        padding: "28px 0", margin: 0
      }}>
        <span style={{ color: "var(--classified)", fontFamily: "var(--font-display)", fontStyle: "normal", fontSize: 44, fontWeight: 700, marginRight: 6, verticalAlign: -8 }}>“</span>
        {children}
      </blockquote>
      {attribution && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 14 }}>
          — {attribution}
        </div>
      )}
    </aside>
  );
}

function Figure({ src, caption, evidence }) {
  return (
    <figure style={{ margin: "44px auto", maxWidth: 1080, padding: "0 24px" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "var(--dossier-0)" }}>
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1) sepia(0.18)" }} />
        {evidence && (
          <div style={{ position: "absolute", top: 14, right: 18, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: "0.22em", padding: "4px 9px 3px", color: "var(--classified)", border: "2px solid var(--classified)", transform: "rotate(3deg)" }}>
            {evidence}
          </div>
        )}
      </div>
      <figcaption style={{ display: "flex", gap: 14, marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.5, color: "var(--ink-3)", letterSpacing: "0.04em" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: "0.22em", color: "var(--classified)", textTransform: "uppercase", flexShrink: 0 }}>FIG. 1</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function EvidenceCard({ num, title, lines }) {
  return (
    <aside style={{
      maxWidth: 760, margin: "32px auto", padding: "0 24px",
      display: "grid", gridTemplateColumns: "120px 1fr", gap: 32, alignItems: "start"
    }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 64, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "0.02em" }}>
        № {num}
      </div>
      <div style={{ borderTop: "1px solid var(--ink-1)", paddingTop: 16 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>EVIDENCE BLOCK</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-0)", margin: "0 0 14px" }}>{title}</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7, color: "var(--ink-2)" }}>
          {lines.map((l, i) => (
            <li key={i} style={{ display: "flex", gap: 12, paddingBottom: 6, borderBottom: i === lines.length - 1 ? "none" : "1px solid var(--paper-edge)", marginBottom: 6 }}>
              <span style={{ color: "var(--classified)", flexShrink: 0 }}>†</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function ChapterMark({ num, title }) {
  return (
    <div style={{ maxWidth: 760, margin: "72px auto 36px", padding: "0 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "0.36em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 12 }}>
        ✦ &nbsp; CHAPTER {num} &nbsp; ✦
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "var(--ink-2)" }}>{title}</div>
      <div style={{ width: 60, height: 1, background: "var(--ink-1)", margin: "20px auto 0" }} />
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--dossier-0)", color: "var(--dossier-fg-1)", padding: "60px 24px", marginTop: 80 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, letterSpacing: "0.18em", color: "var(--dossier-fg-0)", textTransform: "uppercase", marginBottom: 14 }}>
            ESPAÑOLA<span style={{ color: "var(--classified)" }}>.</span>
          </div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            A long-form investigation into the Russian volunteer formation, its football-firm origins, and its battlefield record.
          </p>
        </div>
        {[
          ["Chapters", ["I — The terraces", "II — The trenches", "III — The brand", "IV — The chain of command"]],
          ["Sources", ["Open-source intelligence", "Intercepted radio", "Telegram archive", "Field interviews"]],
          ["Desk", ["Editor's note", "Methodology", "Corrections", "Contact"]]
        ].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 14 }}>{h}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 2 }}>
              {items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--dossier-rule)", marginTop: 48, paddingTop: 20, maxWidth: 1180, margin: "48px auto 0", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dossier-fg-2)", display: "flex", justifyContent: "space-between" }}>
        <span>© THE INVESTIGATIONS DESK · MMXXVI</span>
        <span>FILE LAST UPDATED 14.02.2024</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Masthead, CoverHero, Dek, DropCapParagraph, BodyParagraph,
  PullQuote, Figure, EvidenceCard, ChapterMark, Footer
});
