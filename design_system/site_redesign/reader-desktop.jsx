/* global React */
/* ==========================================================================
   COMP 3 — READER (desktop)
   The article page. Where readers spend most of their time.
   Refinements vs current site:
     - Tighter toolbar; tools collapsed into a single utility rail
     - Sidebar reframed as folder-tab table of contents (not a list)
     - Wider measure with right-rail marginalia (mono notes, citations)
     - Real chapter opener — running head, drop cap, first figure
     - Pull quote, evidence card, footnotes block
   ========================================================================== */

function ReaderDesktop() {
  return (
    <div className="artboard" style={{ width: 1440, minHeight: 2800, fontFamily: "var(--font-serif)" }}>
      <HomeMasthead activePage="chapters" />
      <ReaderRunningHead />
      <ReaderProgressBar progress={32} />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "24px 32px 0", display: "grid", gridTemplateColumns: "240px 1fr", gap: 48, alignItems: "start" }}>
        <ReaderSidebar />
        <ReaderArticle />
      </div>

      <ReaderEnd />
      <SiteFooter />
    </div>
  );
}

/* ---------- Running head — chapter title + tools ---------- */

function ReaderRunningHead() {
  return (
    <div style={{ borderBottom: "1px solid var(--ink-1)", background: "var(--paper-0)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "16px 32px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <span style={{ color: "var(--classified)" }}>Chapter 02</span>
          <span style={{ color: "var(--ink-1)" }}>From the terraces to the trenches</span>
        </div>
        <div style={{ height: 1, background: "var(--paper-edge)" }} />
        <ReaderTools />
      </div>
    </div>
  );
}

function ReaderTools() {
  return (
    <div style={{ display: "flex", gap: 4, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>
      {/* type size cluster */}
      <div style={{ display: "flex", border: "1px solid var(--ink-1)" }}>
        <button style={btnTool}>A−</button>
        <span style={{ ...btnTool, borderLeft: "1px solid var(--ink-1)", borderRight: "1px solid var(--ink-1)", color: "var(--ink-3)" }}>106%</span>
        <button style={btnTool}>A+</button>
      </div>
      {/* mode toggle */}
      <div style={{ display: "flex", border: "1px solid var(--ink-1)", marginLeft: 8 }}>
        <button style={{ ...btnTool, background: "var(--ink-0)", color: "var(--paper-0)" }}>☼ Paper</button>
        <button style={{ ...btnTool, borderLeft: "1px solid var(--ink-1)" }}>☾ Dossier</button>
      </div>
      {/* listen / share */}
      <button style={{ ...btnTool, border: "1px solid var(--ink-1)", marginLeft: 8 }}>▷ Listen</button>
      <button style={{ ...btnTool, border: "1px solid var(--ink-1)" }}>↗ Share</button>
      <button style={{ ...btnTool, border: "1px solid var(--ink-1)" }}>⌘ Cite</button>
    </div>
  );
}

const btnTool = {
  height: 32,
  padding: "0 10px",
  border: "none",
  background: "transparent",
  color: "var(--ink-1)",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

function ReaderProgressBar({ progress }) {
  return (
    <div style={{ height: 3, background: "var(--paper-edge)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "var(--classified)" }} />
    </div>
  );
}

/* ---------- Sidebar — folder tabs ---------- */

function ReaderSidebar() {
  const groups = [
    {
      label: "Front Matter",
      items: [
        ["I", "Author Note", false, false],
        ["II", "Methodology", false, false],
        ["III", "AI Disclosure", false, false],
        ["IV", "Terminology", false, false],
      ],
    },
    {
      label: "Chapters",
      items: [
        ["01", "Prologue: Donbas, 2014", true, false],
        ["02", "From the terraces to the trenches", false, true],
        ["03", "Recruitment and the volunteer myth", false, false],
        ["04", "Branding a paramilitary", false, false],
        ["05", "Combat reputation: Kreminna", false, false],
        ["06", "Patronage and the state", false, false],
        ["07", "End-states", false, false],
      ],
      open: true,
    },
    {
      label: "Appendices",
      items: [
        ["A", "Source Notes", false, false],
        ["B", "Reference Links", false, false],
        ["C", "Image Credits", false, false],
      ],
    },
  ];
  return (
    <aside style={{ position: "sticky", top: 24, alignSelf: "start" }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Book Navigation</div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 700, color: "var(--ink-0)", lineHeight: 1.2, marginBottom: 4 }}>
        From Hooligans to War Machines
      </div>
      <div className="mono" style={{ color: "var(--ink-3)", fontSize: 10, marginBottom: 22 }}>
        Edition v4.1 · 14 units
      </div>

      <div style={{ borderTop: "1px solid var(--ink-1)" }}>
        {groups.map((g, gi) => (
          <div key={g.label} style={{ borderBottom: "1px solid var(--paper-edge)" }}>
            <div style={{
              padding: "12px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: g.open ? "var(--classified)" : "var(--ink-3)",
            }}>
              <span>{g.label}</span>
              <span>{g.open ? "▾" : "▸"}</span>
            </div>
            {g.open && (
              <div style={{ paddingBottom: 8 }}>
                {g.items.map(([num, title, read, current]) => (
                  <a key={title} style={{
                    display: "grid",
                    gridTemplateColumns: "28px 1fr",
                    gap: 10,
                    alignItems: "baseline",
                    padding: "8px 8px 8px 0",
                    textDecoration: "none",
                    color: current ? "var(--ink-0)" : (read ? "var(--ink-3)" : "var(--ink-2)"),
                    background: current ? "var(--paper-1)" : "transparent",
                    borderLeft: current ? "3px solid var(--classified)" : "3px solid transparent",
                    paddingLeft: current ? 12 : 8,
                  }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      color: current ? "var(--classified)" : "var(--ink-3)",
                    }}>
                      {read ? "✓" : num}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 14,
                      lineHeight: 1.35,
                      fontWeight: current ? 700 : 400,
                    }}>
                      {title}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* tools below */}
      <div style={{ marginTop: 24, padding: 16, border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
        <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9, marginBottom: 8 }}>This Chapter</div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--ink-1)", lineHeight: 1.5 }}>
          11 figures · 31 citations · 4 pull quotes
        </div>
        <div style={{ height: 1, background: "var(--paper-edge)", margin: "12px 0" }} />
        <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9, marginBottom: 8 }}>Reading time</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-0)", letterSpacing: "0.06em" }}>
          12m / 38m elapsed
        </div>
      </div>
    </aside>
  );
}

/* ---------- Article — chapter opener + body ---------- */

function ReaderArticle() {
  return (
    <article style={{ minWidth: 0 }}>
      <ChapterOpener />
      <ChapterFigure />
      <ArticleBody />
      <PullQuote />
      <ArticleBody2 />
      <EvidenceCard />
      <ArticleBody3 />
      <FootnotesBlock />
    </article>
  );
}

function ChapterOpener() {
  return (
    <div style={{ paddingTop: 24, paddingRight: 80, position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 18, marginBottom: 32 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.32em", fontWeight: 700, color: "var(--classified)", textTransform: "uppercase" }}>
          ✦ &nbsp; Chapter Two &nbsp; ✦
        </span>
        <span style={{ height: 1, background: "var(--ink-1)" }} />
        <span className="mono" style={{ color: "var(--ink-3)" }}>Long-form investigation</span>
      </div>

      <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 72, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 24px", textWrap: "balance", maxWidth: 880 }}>
        From the terraces to the trenches.
      </h1>
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 24, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 32px", maxWidth: 760 }}>
        How a Russian football firm became a paramilitary brand — born in the curva of Spartak Moscow, redeployed to a war.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1px auto 1px auto 1px auto", alignItems: "center", gap: 18, paddingTop: 18, borderTop: "1px solid var(--ink-1)", borderBottom: "1px solid var(--paper-edge)", paddingBottom: 18, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-2)" }}>
        <span>By the Investigations Desk</span>
        <span style={{ background: "var(--ink-1)", height: 12 }} />
        <span>Filed 14.02.2024</span>
        <span style={{ background: "var(--ink-1)", height: 12 }} />
        <span>Updated 12.04.2026</span>
        <span style={{ background: "var(--ink-1)", height: 12 }} />
        <span style={{ color: "var(--classified)" }}>~ 38 min read</span>
      </div>
    </div>
  );
}

function ChapterFigure() {
  return (
    <figure style={{ margin: "40px 0", paddingRight: 80 }}>
      <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--ink-1)" }}>
        <img src="./assets/cover-hero.png" alt="" style={{
          width: "100%", height: 520, objectFit: "cover", objectPosition: "center 30%",
          filter: "grayscale(1) contrast(1.15) sepia(0.18) brightness(0.95)",
        }} />
        <div className="stamp stamp--big stamp--rotated" style={{ position: "absolute", top: 24, right: 24, background: "rgba(245, 241, 234, 0.04)", color: "var(--paper-0)", borderColor: "var(--paper-0)" }}>
          Fig. I · Source: Press svc.
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, rgba(10,9,7,0.85))" }} />
      </div>
      <figcaption style={{ marginTop: 14, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "baseline", fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.6, color: "var(--ink-3)", letterSpacing: "0.04em" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: "0.24em", color: "var(--classified)", textTransform: "uppercase" }}>FIG. I</span>
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: "var(--ink-2)", letterSpacing: 0 }}>
          Cover composite for the published edition. Distressed half-tone over recovered footage; the figure foregrounded is unidentified by the unit's press service.
        </span>
        <span style={{ color: "var(--ink-3)" }}>Geo-V verified · 14:38 LCL</span>
      </figcaption>
    </figure>
  );
}

function ArticleBody() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 32, paddingRight: 0 }}>
      <div>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 24px", maxWidth: 720 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, float: "left", fontSize: "5.4em", lineHeight: 0.85, padding: "8px 12px 0 0", color: "var(--classified)" }}>
            T
          </span>
          he first patches arrived on a Tuesday — eleven of them, hand-stitched, sealed in a manila envelope marked only with a stadium ticket stub from the previous Sunday's derby. They were distributed at a back booth of a Lefortovo café whose owner, three months later, would deny the meeting had ever taken place. By the end of that week, six of the eleven men who took a patch were on a marshrutka heading east.
        </p>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 24px", maxWidth: 720 }}>
          This is, by most accounts, the founding gesture of the formation that would later call itself <em>Española</em> — a name the unit's first commander, identified in open-source reporting only by the call-sign <em>Spaniard</em>, claims to have chosen "for the football, not the country." The choice carries a weight the men who took the patches almost certainly intended: hooligan firms had used Spanish naming conventions for their leadership ranks since the late 2000s, and the unit's earliest recruits were drawn from a supporter network that ran across at least three Moscow clubs.
        </p>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 24px", maxWidth: 720 }}>
          What followed, between the spring of 2022 and the autumn of 2024, was not the conversion of a fan culture into a paramilitary so much as its reorganization. The personnel were already there. The hierarchies — <em>kapo</em>, <em>boss</em>, <em>old guard</em> — were already there. The graphic identity, when it arrived, was assembled from parts already in circulation in the curva: skulls, banners, orthodox crosses, the medieval pennants of the Spartak Fratria firm.
        </p>
      </div>

      {/* MARGINALIA right rail */}
      <aside style={{ paddingTop: 6 }}>
        <div style={{ borderTop: "1px solid var(--ink-1)", paddingTop: 12, marginBottom: 28 }}>
          <div className="mono" style={{ color: "var(--classified)", fontSize: 10, marginBottom: 8 }}>† Marginalia · § 02.1</div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
            <em>Marshrutka</em> — Russian shared minibus. Multiple recruits described moving east in unmarked civilian transport, organized through Telegram channels rather than formal military logistics.
          </p>
        </div>
        <div style={{ borderTop: "1px solid var(--ink-1)", paddingTop: 12 }}>
          <div className="mono" style={{ color: "var(--classified)", fontSize: 10, marginBottom: 8 }}>‡ Sourcing</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7, color: "var(--ink-2)" }}>
            <li>· Lefortovo café — interview, anon., 11.2023</li>
            <li>· Manila envelope — Telegram archive, @esp_unit</li>
            <li>· "Spaniard" callsign — Meduza, 14.02.2024</li>
            <li>· Fratria firm pennants — supporter publications, 2008–2014</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function PullQuote() {
  return (
    <aside style={{ margin: "56px auto", maxWidth: 880 }}>
      <blockquote style={{
        fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 36, lineHeight: 1.25,
        color: "var(--ink-0)", borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)",
        padding: "32px 0", margin: 0, textWrap: "balance",
      }}>
        <span style={{ color: "var(--classified)", fontFamily: "var(--font-display)", fontStyle: "normal", fontSize: 56, fontWeight: 700, marginRight: 8, verticalAlign: -10 }}>"</span>
        We didn't recruit. We rearranged what was already on the curva — same flags, same names, different work.
      </blockquote>
      <div className="mono" style={{ color: "var(--ink-3)", marginTop: 14 }}>
        — Subject identified as call-sign "Karat" · interview, October 2023
      </div>
    </aside>
  );
}

function ArticleBody2() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 32 }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-0)", margin: "16px 0 18px" }}>
          ✦ &nbsp; II · The Reorganization
        </h2>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 24px", maxWidth: 720 }}>
          By June 2022, the unit had a formal name, a wordmark — that distressed Oswald-style condensed face that would later appear on Telegram, on patches, on the doorframes of forward command posts — and a recruitment pipeline that ran almost entirely through three Telegram channels and a handful of supporter-culture WhatsApp groups. Of the first 220 men documented as joining the formation, 84 percent had previously been identified, in supporter publications or police reports, as members of one of four specific firms.
        </p>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 24px", maxWidth: 720 }}>
          The rate of attrition in those first six months — 38 confirmed killed, 19 wounded, 7 captured — was not announced. It was published, instead, as a series of memorial graphics on the unit's own channel.
        </p>
      </div>
      <aside />
    </div>
  );
}

function EvidenceCard() {
  return (
    <aside style={{ margin: "44px 0", display: "grid", gridTemplateColumns: "120px 1fr", gap: 32, paddingRight: 80 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 72, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "0.02em" }}>
        № 02
      </div>
      <div style={{ borderTop: "1px solid var(--ink-1)", paddingTop: 16 }}>
        <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 10 }}>Evidence Block · Recruitment Pipeline</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-0)", margin: "0 0 16px" }}>
          First 220 recruits, by source channel
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7, color: "var(--ink-2)" }}>
          {[
            ["@esp_unit (primary)", "144", "65.5%"],
            ["Spartak Fratria (firm WhatsApp)", "31", "14.1%"],
            ["CSKA supporter Telegram", "22", "10.0%"],
            ["Zenit firm WhatsApp", "11", "5.0%"],
            ["Walk-in / personal contact", "12", "5.5%"],
          ].map(([k, n, pct], i) => (
            <li key={k} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px", gap: 12, padding: "8px 0", borderBottom: i === 4 ? "none" : "1px solid var(--paper-edge)" }}>
              <span style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "var(--classified)" }}>†</span>
                {k}
              </span>
              <span style={{ textAlign: "right", color: "var(--ink-0)", fontWeight: 700 }}>{n}</span>
              <span style={{ textAlign: "right", color: "var(--ink-3)" }}>{pct}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function ArticleBody3() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 32 }}>
      <div>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 24px", maxWidth: 720 }}>
          The wordmark itself — eight letters, condensed, distressed — was not designed in the conventional sense. It first appeared, according to a person involved in its production who agreed to speak on background, as a stencil cut from a piece of corrugated cardboard at a forward base in the Luhansk Oblast in late August 2022. The stencil was used to spray-paint the side of a wrecked truck. A photograph of that truck, taken three days later by a war correspondent for an outlet that has since been declared a foreign agent, became, by January 2023, the unit's most-republished image.
        </p>
      </div>
      <aside style={{ paddingTop: 6 }}>
        <div style={{ borderTop: "1px solid var(--ink-1)", paddingTop: 12 }}>
          <div className="mono" style={{ color: "var(--classified)", fontSize: 10, marginBottom: 8 }}>§ 02.3 · Image provenance</div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
            The "wrecked truck" image is reproduced in Fig. I above. The photograph's metadata was scrubbed prior to first publication; geolocation was reconstructed from contour data on the horizon line.
          </p>
        </div>
      </aside>
    </div>
  );
}

function FootnotesBlock() {
  return (
    <section style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--ink-1)", paddingRight: 80 }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>Notes · Chapter 02</div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, columns: "2 280px", columnGap: 32 }}>
        {[
          "Lefortovo café — author interview, anonymized, November 2023. Café no longer in operation.",
          "Eleven patches — figure cited by call-sign \"Karat\" in October 2023 interview; consistent with manifest released by @esp_unit on 14.06.2022.",
          "Marshrutka movement — corroborated by border crossing data published by an open-source intelligence collective, July 2022.",
          "\"Spaniard\" callsign attribution — Meduza investigation, 14.02.2024; confirmed in subsequent intercepts published by GUR-MO.",
          "Fratria firm pennant comparison — supporter culture archives, Spartak Moscow, 2008–2014; visual analysis available in Fig. III, Chapter 04.",
          "Recruitment figures — drawn from the unit's own channels, deduplicated against memorial posts and casualty notices; figures considered minimum.",
        ].map((n, i) => (
          <li key={i} style={{ breakInside: "avoid", marginBottom: 12, paddingLeft: 24, position: "relative", fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)" }}>
            <span style={{ position: "absolute", left: 0, top: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "var(--classified)", letterSpacing: "0.06em" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {n}
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Reader End — chapter nav ---------- */

function ReaderEnd() {
  return (
    <section style={{ padding: "64px 32px", borderTop: "1px solid var(--ink-1)", background: "var(--paper-1)", marginTop: 80 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="eyebrow">End of Chapter 02</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "0.32em", color: "var(--ink-1)", marginTop: 10 }}>
            ✦ &nbsp; ✦ &nbsp; ✦
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <a style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--ink-0)", fontWeight: 700 }}>‹</div>
            <div>
              <div className="eyebrow" style={{ color: "var(--ink-3)" }}>Previous · Chapter 01</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "var(--ink-0)", marginTop: 4, lineHeight: 1.2 }}>Prologue: Donbas, 2014</div>
            </div>
          </a>
          <a style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textAlign: "right" }}>
            <div>
              <div className="eyebrow">Next · Chapter 03</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "var(--ink-0)", marginTop: 4, lineHeight: 1.2 }}>Recruitment and the volunteer myth</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--classified)", fontWeight: 700 }}>›</div>
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ReaderDesktop });
