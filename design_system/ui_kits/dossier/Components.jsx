/* global React */
const { useState } = React;

function DossierShell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--dossier-0)", color: "var(--dossier-fg-0)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('../../assets/paper-noise.svg')", backgroundSize: "320px 320px", opacity: 0.08, mixBlendMode: "screen", pointerEvents: "none" }} />
      {/* corner registration marks */}
      {[
        { top: 14, left: 14 }, { top: 14, right: 14 }, { bottom: 14, left: 14 }, { bottom: 14, right: 14 }
      ].map((pos, i) => (
        <div key={i} style={{ position: "absolute", ...pos, width: 14, height: 14, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "var(--dossier-fg-2)" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "var(--dossier-fg-2)" }} />
        </div>
      ))}
      {children}
    </div>
  );
}

function DossierHeader({ caseId = "UKR-ESP-17", status = "ACTIVE", updated = "14.02.2024" }) {
  return (
    <header style={{ borderBottom: "1px solid var(--dossier-rule)", padding: "16px 28px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 24, alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "var(--dossier-1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "0.18em", color: "var(--dossier-fg-0)", fontWeight: 700 }}>
          ESPAÑOLA<span style={{ color: "var(--classified)" }}>.</span>
        </div>
        <span style={{ color: "var(--dossier-fg-2)" }}>/ DOSSIER</span>
      </div>
      <div style={{ color: "var(--dossier-fg-1)" }}>FILE № {caseId}</div>
      <div style={{ color: "var(--dossier-fg-1)" }}>UPDATED {updated}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--classified)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--classified)", boxShadow: "0 0 8px var(--classified)" }} />
        {status}
      </div>
    </header>
  );
}

function Sidebar({ chapter, setChapter }) {
  const chapters = [
    "I — The terraces",
    "II — The trenches",
    "III — The brand",
    "IV — Chain of command",
    "V — The casualties"
  ];
  return (
    <aside style={{ width: 240, borderRight: "1px solid var(--dossier-rule)", padding: "24px 0", background: "var(--dossier-1)" }}>
      <div style={{ padding: "0 22px 14px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)" }}>CHAPTERS</div>
      <nav>
        {chapters.map((c, i) => (
          <button key={c} onClick={() => setChapter(i)}
            style={{
              display: "block", width: "100%", textAlign: "left", border: "none", background: "transparent",
              padding: "10px 22px", fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.3,
              color: i === chapter ? "var(--dossier-fg-0)" : "var(--dossier-fg-1)",
              borderLeft: i === chapter ? "3px solid var(--classified)" : "3px solid transparent",
              cursor: "pointer", transition: "all 200ms cubic-bezier(0.2,0.7,0.1,1)"
            }}>
            {c}
          </button>
        ))}
      </nav>
      <div style={{ padding: "28px 22px 14px", marginTop: 22, borderTop: "1px solid var(--dossier-rule)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)" }}>FILTERS</div>
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--dossier-fg-1)" }}>
        {["Verified subjects", "Open-source", "Telegram archive", "Field interviews"].map((f, i) => (
          <label key={f} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <span style={{ width: 14, height: 14, border: "1.5px solid var(--dossier-fg-1)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--classified)", fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700 }}>{i < 2 ? "✕" : ""}</span>
            {f}
          </label>
        ))}
      </div>
    </aside>
  );
}

function SubjectCard({ num, callsign, role, verified, redacted, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      textAlign: "left", padding: 0, background: selected ? "var(--dossier-3)" : "var(--dossier-1)",
      border: `1px solid ${selected ? "var(--classified)" : "var(--dossier-rule)"}`,
      color: "inherit", cursor: "pointer", transition: "all 200ms cubic-bezier(0.2,0.7,0.1,1)",
      boxShadow: "0 2px 0 rgba(0,0,0,0.4), 0 24px 48px -20px rgba(0,0,0,0.7)"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid var(--dossier-rule)", background: "var(--dossier-2)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        <span style={{ color: "var(--dossier-fg-1)" }}>SUBJECT № {num}</span>
        <span style={{ color: verified ? "var(--field-green)" : "var(--classified)" }}>● {verified ? "VERIFIED" : "UNCONFIRMED"}</span>
      </div>
      <div style={{ aspectRatio: "1/1", background: "var(--dossier-0)", position: "relative", overflow: "hidden", borderBottom: "1px solid var(--dossier-rule)" }}>
        <img src="../../assets/cover-hero.png" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.3) brightness(0.7)", objectPosition: `${20 + num * 7}% ${30 + num * 5}%` }} />
        {redacted && (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(10,9,7,0.6) 100%)" }} />
        )}
        {redacted && (
          <div style={{ position: "absolute", bottom: "38%", left: "16%", width: "68%", height: 14, background: "var(--ink-0)" }} />
        )}
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--dossier-fg-0)", marginBottom: 4 }}>"{callsign}"</div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--dossier-fg-1)", fontStyle: "italic" }}>{role}</div>
      </div>
    </button>
  );
}

function SubjectGrid({ selected, setSelected }) {
  const subjects = [
    { num: "01", callsign: "Spaniard", role: "Founder · ex-fan group lead", verified: true, redacted: false },
    { num: "02", callsign: "Wolf", role: "Assault detachment · 2nd Co.", verified: true, redacted: true },
    { num: "03", callsign: "Pilot", role: "UAV operator · drone team", verified: false, redacted: true },
    { num: "04", callsign: "Skif", role: "Squad leader · Kreminna sector", verified: true, redacted: false },
    { num: "05", callsign: "Karat", role: "Press service / videographer", verified: true, redacted: false },
    { num: "06", callsign: "Kaban", role: "Logistics · supply route lead", verified: false, redacted: true }
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
      {subjects.map((s) => (
        <SubjectCard key={s.num} {...s} selected={selected === s.num} onClick={() => setSelected(s.num)} />
      ))}
    </div>
  );
}

function EvidenceList() {
  const items = [
    { time: "14:20", note: "Telegram post — patch insignia confirmed", src: "@esp_unit" },
    { time: "14:38", note: "Radio intercept — call-sign 'Skif' identified", src: "OSINT" },
    { time: "15:02", note: "Satellite image — Avanhard Stadium floodlights match", src: "PLNT-IMG" },
    { time: "16:11", note: "Shadow analysis — 14:20 ±20 min, 14.02.2024", src: "GEO-V" }
  ];
  return (
    <div style={{ background: "var(--dossier-1)", border: "1px solid var(--dossier-rule)", padding: 0 }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--dossier-rule)", background: "var(--dossier-2)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)" }}>
        EVIDENCE TIMELINE · 14.02.2024
      </div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr 90px", gap: 12, padding: "12px 16px", borderBottom: i === items.length - 1 ? "none" : "1px solid var(--dossier-rule)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--dossier-fg-1)" }}>
            <span style={{ color: "var(--classified)", letterSpacing: "0.06em" }}>{it.time}</span>
            <span style={{ color: "var(--dossier-fg-0)" }}>{it.note}</span>
            <span style={{ textAlign: "right", color: "var(--dossier-fg-2)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{it.src}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function MapPanel() {
  return (
    <div style={{ background: "var(--dossier-1)", border: "1px solid var(--dossier-rule)" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--dossier-rule)", background: "var(--dossier-2)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", display: "flex", justifyContent: "space-between" }}>
        <span>FORWARD POSITION · KREMINNA SECTOR</span>
        <span style={{ color: "var(--dossier-fg-2)" }}>48.3794° N · 31.1656° E</span>
      </div>
      <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--dossier-0)" }}>
        {/* gridded map */}
        <svg viewBox="0 0 400 225" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3a3327" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="400" height="225" fill="url(#grid)"/>
          {/* terrain — simplified contour */}
          <path d="M0 130 Q100 90 180 110 T400 100 L400 225 L0 225 Z" fill="#14110d" stroke="#3a3327" strokeWidth="0.8"/>
          <path d="M0 160 Q120 140 220 145 T400 140" fill="none" stroke="#4a5a35" strokeWidth="0.6" opacity="0.7"/>
          <path d="M0 180 Q140 170 240 175 T400 168" fill="none" stroke="#4a5a35" strokeWidth="0.6" opacity="0.5"/>
          {/* river */}
          <path d="M40 0 Q70 80 60 130 T100 225" fill="none" stroke="#2a3a4a" strokeWidth="2.5" opacity="0.8"/>
          {/* known positions */}
          {[[120, 95, "α"], [220, 130, "β"], [310, 80, "γ"], [180, 170, "δ"]].map(([cx, cy, l], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="none" stroke="#b81d13" strokeWidth="1.5"/>
              <circle cx={cx} cy={cy} r="2" fill="#b81d13"/>
              <text x={cx + 10} y={cy + 4} fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#ece4d2" letterSpacing="0.1em">{l}</text>
            </g>
          ))}
          {/* labels */}
          <text x="20" y="20" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7d7460" letterSpacing="0.18em">N ↑</text>
          <text x="350" y="20" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7d7460" letterSpacing="0.12em">SCALE 1:50K</text>
          <text x="125" y="86" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#b8ad95" letterSpacing="0.12em">KREMINNA</text>
          <text x="42" y="218" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7d7460" letterSpacing="0.12em">RIVER DONETS</text>
        </svg>
      </div>
    </div>
  );
}

function DetailPanel({ subjectNum }) {
  return (
    <div style={{ background: "var(--dossier-1)", border: "1px solid var(--dossier-rule)", padding: "20px 22px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 8 }}>
        SUBJECT № {subjectNum} · DOSSIER
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--dossier-fg-0)", margin: "0 0 12px" }}>
        Call-sign "Skif"
      </h2>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, lineHeight: 1.6, color: "var(--dossier-fg-1)", margin: "0 0 16px" }}>
        Identified via patch insignia in three intercepted radio transmissions and one Telegram post released by the unit's own press service. Believed to lead a six-man assault squad in the Kreminna sector. Real name <span style={{ background: "#0d0c0a", color: "#0d0c0a", padding: "0 6px", userSelect: "none" }}>REDACTED████████</span>, age <span style={{ background: "#0d0c0a", color: "#0d0c0a", padding: "0 6px" }}>██</span>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--dossier-fg-1)" }}>
        {[["ROLE", "Squad leader"], ["UNIT", "Española / 2nd Co."], ["FIRST SEEN", "11.02.2024"], ["LAST SEEN", "14.02.2024"]].map(([k, v]) => (
          <div key={k} style={{ borderTop: "1px solid var(--dossier-rule)", paddingTop: 8 }}>
            <div style={{ color: "var(--dossier-fg-2)", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 9, marginBottom: 3 }}>{k}</div>
            <div style={{ color: "var(--dossier-fg-0)" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { DossierShell, DossierHeader, Sidebar, SubjectGrid, SubjectCard, EvidenceList, MapPanel, DetailPanel });
