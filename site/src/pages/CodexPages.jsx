import { Link } from "react-router-dom";

import codexProtocol from "../../../docs/codex/book_writing_protocol.md?raw";
import codexBehavior from "../../../docs/codex/llm_writing_behavior.md?raw";
import codexAgent from "../../../docs/codex/agent.md?raw";
import { chapterTitle } from "../lib/siteUtils";

const CODEX_DOCS = [
  {
    n: "01",
    title: "Source & Narrative Integration",
    body: "Chapter intent → Protocol discipline → Source insight → Narrative construction. Sources must change the argument, not decorate it. Each section must include at least one source that deepens causality, expands scope, or challenges framing.",
    link: "/codex/source-agent",
    filename: "agent.md",
    label: "Source Usage Protocol",
  },
  {
    n: "02",
    title: "Core Voice & Evidentiary Rules",
    body: "Write in a human, polished editor-in-chief voice. Every materially relevant episode must be tied to source support. Distinguish documented facts from attribution-dependent claims, contested findings, and unit self-descriptions — each handled differently in the prose.",
    link: "/codex/book-writing-protocol",
    filename: "book_writing_protocol.md",
    label: "Book Writing Protocol",
  },
  {
    n: "03",
    title: "Writing Behavior Constraints",
    body: "Do not assume coherence. Do not smooth contradictions. Surface uncertainty. The narrative must emerge from the evidence — not the reverse. Ambiguity is not a problem to fix; it is often the story. Every sentence must earn its place.",
    link: "/codex/writing-behavior",
    filename: "llm_writing_behavior.md",
    label: "LLM Writing Behavior",
  },
];

function CodexBreadcrumb({ current }) {
  return (
    <div style={{ borderBottom: "1px solid var(--paper-edge)", padding: "12px 32px", background: "var(--paper-0)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Overview</Link>
        <span>›</span>
        <Link to="/codex" style={{ color: "inherit", textDecoration: "none" }}>Codex</Link>
        {current && <><span>›</span><span style={{ color: "var(--ink-0)" }}>{current}</span></>}
      </div>
    </div>
  );
}

export function CodexIndexPage() {
  return (
    <main id="main-content">
      <CodexBreadcrumb />
      <section style={{ position: "relative", padding: "72px 32px 56px", borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", marginBottom: 36, gap: 24 }}>
            <div className="eyebrow">Editorial Codex · 03 Protocols</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>docs/codex/</div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(72px, 11vw, 160px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28 }}>
            CODEX.
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 760 }}>
            The standing protocols governing how this investigation was written — voice, evidence, source integration, and behavioral constraints.
          </h2>
        </div>
      </section>

      <section style={{ padding: "56px 32px 88px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {CODEX_DOCS.map((c) => (
            <div key={c.n} style={{ background: "var(--paper-1)", border: "1px solid var(--ink-1)", padding: "28px 28px 32px", position: "relative", display: "flex", flexDirection: "column" }}>
              <span className="tick" style={{ top: 10, left: 10 }} aria-hidden="true" />
              <span className="tick" style={{ top: 10, right: 10 }} aria-hidden="true" />
              <span className="tick" style={{ bottom: 10, left: 10 }} aria-hidden="true" />
              <span className="tick" style={{ bottom: 10, right: 10 }} aria-hidden="true" />
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 52, lineHeight: 0.85, color: "var(--classified)", letterSpacing: "-0.02em", marginBottom: 18 }}>
                № {c.n}
              </div>
              <div className="mono" style={{ color: "var(--ink-3)", marginBottom: 12 }}>{c.filename}</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20, lineHeight: 1.2, color: "var(--ink-0)", margin: "0 0 14px" }}>{c.title}</h3>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 24px", flex: 1 }}>{c.body}</p>
              <Link to={c.link} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--classified)", textDecoration: "none", borderTop: "1px solid var(--paper-edge)", paddingTop: 16 }}>
                ▸ Open {c.label}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function mdColorLine(line) {
  if (/^#{1,3} /.test(line)) return "var(--classified)";
  if (/^---+$/.test(line.trim())) return "var(--dossier-fg-2)";
  if (/^\*\*/.test(line) || /^- /.test(line) || /^\* /.test(line)) return "var(--dossier-fg-0)";
  if (/^\d+\. /.test(line)) return "var(--dossier-fg-0)";
  if (/^>/.test(line)) return "var(--highlighter)";
  if (line.trim() === "") return "transparent";
  return "var(--dossier-fg-1)";
}

export function CodexPage({ title, filename, content }) {
  const lines = content.split("\n");
  const lineNumWidth = String(lines.length).length;
  const idx = CODEX_DOCS.findIndex((d) => d.filename === filename);
  const prev = CODEX_DOCS[idx - 1] ?? null;
  const next = CODEX_DOCS[idx + 1] ?? null;

  return (
    <main id="main-content">
      <CodexBreadcrumb current={filename} />

      {/* page header */}
      <div style={{ padding: "32px 32px 28px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-0)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Editorial Codex</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: 0 }}>{title}</h1>
        </div>
      </div>

      {/* code box */}
      <div style={{ padding: "40px 32px 80px", background: "var(--paper-1)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          {/* file tab */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--dossier-1)", border: "1px solid var(--dossier-rule)", borderBottom: "none", padding: "8px 18px", fontFamily: "var(--font-data)", fontSize: 12, letterSpacing: "0.04em", color: "var(--dossier-fg-1)" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--classified)", display: "inline-block" }} />
            docs/codex/{filename}
          </div>
          {/* code area */}
          <div style={{ background: "var(--dossier-0)", border: "1px solid var(--dossier-rule)", overflowX: "auto" }}>
            <pre style={{ margin: 0, padding: "24px 0", fontFamily: "var(--font-data)", fontSize: 13, lineHeight: 1.7, counterReset: "lines" }}>
              {lines.map((line, i) => (
                <div key={i} style={{ display: "flex", minWidth: 0 }}>
                  <span style={{
                    display: "inline-block",
                    minWidth: `${lineNumWidth + 2}ch`,
                    padding: "0 16px 0 24px",
                    textAlign: "right",
                    color: "var(--dossier-fg-2)",
                    userSelect: "none",
                    flexShrink: 0,
                    borderRight: "1px solid var(--dossier-rule)",
                    marginRight: 20,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ color: mdColorLine(line), whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                    {line || " "}
                  </span>
                </div>
              ))}
            </pre>
          </div>
          {/* footer bar */}
          <div style={{ background: "var(--dossier-1)", border: "1px solid var(--dossier-rule)", borderTop: "none", padding: "8px 24px", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-data)", fontSize: 11, color: "var(--dossier-fg-2)", letterSpacing: "0.04em" }}>
            <span>{lines.length} lines</span>
            <span>Markdown · UTF-8 · LF</span>
          </div>
        </div>
      </div>

      {/* prev / next */}
      <section style={{ padding: "48px 32px 64px", borderTop: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {prev ? (
            <Link to={prev.link} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--ink-0)", fontWeight: 700, letterSpacing: "-0.02em" }}>‹</div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Previous</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: "var(--ink-0)" }}>{chapterTitle(prev.title)}</div>
                <div style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{prev.filename}</div>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link to={next.link} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textAlign: "right" }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Next</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: "var(--ink-0)" }}>{chapterTitle(next.title)}</div>
                <div style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{next.filename}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--classified)", fontWeight: 700, letterSpacing: "-0.02em" }}>›</div>
            </Link>
          ) : <div />}
        </div>
      </section>
    </main>
  );
}

export function BookWritingProtocolPage() {
  return <CodexPage title="Book Writing Protocol" filename="book_writing_protocol.md" content={codexProtocol} />;
}

export function WritingBehaviorPage() {
  return <CodexPage title="Writing Behavior Constraints" filename="llm_writing_behavior.md" content={codexBehavior} />;
}

export function SourceAgentPage() {
  return <CodexPage title="Source & Narrative Integration Protocol" filename="agent.md" content={codexAgent} />;
}

