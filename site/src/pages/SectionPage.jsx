import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import siteData from "@generated-manuscript";
import { chapterTitle } from "../lib/siteUtils";
import { getChapterProgress } from "../lib/readerProgress";
export function SectionPage() {
  const { sectionKey } = useParams();
  const group = siteData.groups.find((g) => g.key === sectionKey);
  if (!group) return <Navigate to="/" replace />;

  const [query, setQuery] = useState("");
  const [sortAlpha, setSortAlpha] = useState(false);

  const groupIndex = siteData.groups.findIndex((g) => g.key === sectionKey);
  const previousGroup = groupIndex > 0 ? siteData.groups[groupIndex - 1] : null;
  const nextGroup = groupIndex < siteData.groups.length - 1 ? siteData.groups[groupIndex + 1] : null;
  const romanNumerals = ["I", "II", "III", "IV", "V"];
  const romanNum = romanNumerals[groupIndex] ?? String(groupIndex + 1);
  const totalMinutes = group.documents.reduce((s, d) => s + d.readingMinutes, 0);
  const totalImages = group.documents.reduce((s, d) => s + d.images.length, 0);
  const sectionLabel = group.title === "Narrative" ? "Chapters" : group.title;
  const isChapters = sectionKey === "chapters";

  const q = query.trim().toLowerCase();
  let visible = q
    ? group.documents.filter((d) => d.title.toLowerCase().includes(q) || d.excerpt?.toLowerCase().includes(q))
    : group.documents;
  if (sortAlpha) visible = [...visible].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div style={{ padding: "12px 32px", background: "var(--paper-0)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Overview</Link>
          <span>›</span>
          <span>Section {romanNum}</span>
          <span>›</span>
          <span style={{ color: "var(--ink-0)" }}>{sectionLabel}</span>
          <span style={{ flex: 1 }} />
          <span style={{ color: "var(--classified)" }}>● {group.documents.length} reading units</span>
        </div>
      </div>

      {/* section opener */}
      <section style={{ position: "relative", padding: "72px 32px 56px", borderBottom: "1px solid var(--paper-edge)", overflow: "hidden" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", marginBottom: 36, gap: 24 }}>
            <div className="eyebrow">Section · {String(groupIndex + 1).padStart(2, "0")}</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>{siteData.titlePage.title}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "end" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(80px, 12vw, 200px)", lineHeight: 0.82, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 18 }}>
                {sectionLabel.toUpperCase()}.
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 720 }}>
                {group.documents.length} reading units that follow Española from its supporter-culture roots through recruitment, combat, and the question of the formation's end.
              </h2>
            </div>

            <div style={{ paddingBottom: 12 }}>
              <div style={{ borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)" }}>
                {[
                  ["Reading units", String(group.documents.length)],
                  ["Total reading time", `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`],
                  ["Image references", String(totalImages)],
                  ["Last revised", "27.04.2026"],
                ].map(([label, value], i, arr) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, padding: "12px 4px", borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                    <span style={{ color: "var(--ink-3)" }}>{label}</span>
                    <span style={{ color: "var(--ink-0)", fontWeight: 700 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* toolbar — only for chapters section */}
      {isChapters && (
        <div style={{ padding: "16px 32px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 24, alignItems: "center" }}>
            {/* all-count chip */}
            <div style={{ display: "flex", gap: 4 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid var(--ink-1)", background: "var(--ink-0)", color: "var(--paper-0)", padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                All
                <span style={{ opacity: 0.6, fontSize: 9 }}>{String(group.documents.length).padStart(2, "0")}</span>
              </span>
            </div>

            {/* search */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--ink-1)", padding: "0 12px", height: 36, background: "var(--paper-0)" }}>
              <span className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>⌕</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search chapter, callsign, place…"
                style={{ border: "none", background: "transparent", outline: "none", height: 34, width: "100%", fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--ink-1)" }}
              />
              {q && (
                <span className="mono" style={{ color: "var(--ink-3)", fontSize: 9 }}>
                  {visible.length} result{visible.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* sort toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
              <span>Sort</span>
              <button
                onClick={() => setSortAlpha((v) => !v)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-0)", borderBottom: "1px solid var(--ink-0)", paddingBottom: 1 }}
              >
                {sortAlpha ? "A → Z ▾" : "Manuscript order ▾"}
              </button>
            </div>

            {/* reading time total */}
            <div className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>
              {visible.reduce((s, d) => s + d.readingMinutes, 0)} min total
            </div>
          </div>
        </div>
      )}

      {/* chapter list */}
      <section style={{ padding: "56px 32px 72px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          {visible.length === 0 && (
            <div style={{ padding: "64px 0", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)" }}>
              No chapters match "{query}"
            </div>
          )}
          {visible.map((doc, idx) => (
            <SectionChapterCard key={doc.slug} doc={doc} globalIndex={group.documents.indexOf(doc)} displayIndex={idx} />
          ))}
        </div>
      </section>

      {/* prev/next section nav */}
      {(previousGroup || nextGroup) && (
        <section style={{ padding: "64px 32px", borderTop: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {previousGroup ? (
              <Link to={`/section/${previousGroup.key}`} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--ink-0)", fontWeight: 700 }}>‹</div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 6, color: "var(--ink-3)" }}>Previous Section</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: "var(--ink-0)" }}>
                    {romanNumerals[groupIndex - 1]} — {previousGroup.title === "Narrative" ? "Chapters" : previousGroup.title}
                  </div>
                </div>
              </Link>
            ) : <div />}
            {nextGroup ? (
              <Link to={`/section/${nextGroup.key}`} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textAlign: "right" }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>Next Section</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: "var(--ink-0)" }}>
                    {romanNumerals[groupIndex + 1]} — {nextGroup.title === "Narrative" ? "Chapters" : nextGroup.title}
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--classified)", fontWeight: 700 }}>›</div>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}
    </main>
  );
}

function SectionChapterCard({ doc, globalIndex }) {
  const num = String(globalIndex + 1).padStart(2, "0");
  const [pct, setPct] = useState(() => getChapterProgress(doc.slug));
  const lastRead = (() => { try { return localStorage.getItem("last-read-slug"); } catch { return null; } })();

  const isCompleted = pct >= 100;
  const isInProgress = pct > 0 && !isCompleted;
  const isCurrent = isInProgress && lastRead === doc.slug;
  const minsLeft = Math.max(1, Math.round(doc.readingMinutes * (1 - pct / 100)));

  return (
    <article style={{
      display: "grid", gridTemplateColumns: "120px 1fr 320px", gap: 40,
      padding: isCurrent ? "32px 24px" : "32px 0",
      borderBottom: "1px solid var(--paper-edge)",
      borderTop: isCurrent ? "1px solid var(--ink-1)" : "none",
      background: isCurrent ? "var(--paper-1)" : "transparent",
      position: "relative",
    }}>
      {isCurrent && (
        <div className="stamp stamp--rotated" style={{ position: "absolute", top: 18, right: 18, transform: "rotate(4deg)" }}>
          You're reading
        </div>
      )}

      {/* number + kind */}
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 88, lineHeight: 0.85, color: isInProgress ? "var(--classified)" : "var(--ink-0)", letterSpacing: "-0.02em" }}>
          {num}
        </div>
        <div className="mono" style={{ color: "var(--ink-3)", marginTop: 10, fontSize: 10 }}>Chapter</div>
      </div>

      {/* title + dek + meta */}
      <div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 30, lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "4px 0 14px" }}>
          {chapterTitle(doc.title)}
        </h3>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 20px", maxWidth: 640 }}>
          {doc.excerpt}
        </p>
        <div style={{ display: "flex", gap: 22, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <span>{doc.readingMinutes} min read</span>
          <span>{doc.images.length} images</span>
        </div>
      </div>

      {/* right rail: progress + CTA + file ref */}
      <div style={{ display: "grid", gap: 14, alignContent: "start", paddingTop: 4 }}>
        {(isInProgress || isCompleted) && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 6 }}>
              <span>Progress</span>
              <span style={{ color: isCompleted ? "var(--field-green)" : "var(--classified)" }}>
                {isCompleted ? "Read" : `${Math.round(pct)}%`}
              </span>
            </div>
            <div style={{ height: 4, background: "var(--paper-edge)" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: isCompleted ? "var(--field-green)" : "var(--classified)" }} />
            </div>
          </div>
        )}

        <Link
          to={`/read/${doc.slug}`}
          className={isInProgress ? "button button--solid" : "button"}
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => setPct(getChapterProgress(doc.slug))}
        >
          {isCompleted ? "▸ Read again" : isInProgress ? `▸ Continue · ${minsLeft}m left` : "▸ Read"}
        </Link>

        <div className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>
          File ref: ESP-CH-{num}
        </div>
      </div>
    </article>
  );
}

