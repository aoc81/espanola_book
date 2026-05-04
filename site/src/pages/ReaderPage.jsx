import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Check, Copy, Pause, Play, Share2, Square } from "lucide-react";
import siteData from "@generated-manuscript";
import { chapterTitle, displayLicenseLabel, groupBySection } from "../lib/siteUtils";
import { getChapterProgress, saveChapterProgress } from "../lib/readerProgress";

function useDocumentNavigation(slug) {
  const index = siteData.documents.findIndex((d) => d.slug === slug);
  return {
    current: siteData.documents[index] ?? null,
    previous: index > 0 ? siteData.documents[index - 1] : null,
    next: index >= 0 && index < siteData.documents.length - 1 ? siteData.documents[index + 1] : null,
  };
}
export function ReaderPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { current, previous, next } = useDocumentNavigation(slug);
  const [fontScale, setFontScale] = useState(1);
  const [readerMode, setReaderMode] = useState("paper");
  const progress = useReadingProgress();

  useEffect(() => {
    if (current) window.localStorage.setItem("last-read-slug", current.slug);
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const rounded = Math.round(progress);
    if (rounded > getChapterProgress(current.slug)) saveChapterProgress(current.slug, rounded);
  }, [progress, current]);

  if (!current) return <Navigate to="/" replace />;

  const groupedDocuments = groupBySection(siteData.documents);
  const fnMap = useMemo(() => buildFootnoteMap(current.blocks), [current.slug]);

  return (
    <main
      id="main-content"
      className={readerMode === "dossier" ? "reader-layout reader-layout--dossier" : "reader-layout"}
      style={{ "--reader-font-scale": fontScale }}
    >
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <ReaderRunningHead
        current={current}
        fontScale={fontScale}
        setFontScale={setFontScale}
        readerMode={readerMode}
        setReaderMode={setReaderMode}
      />

      <div className="reader-content">
        <aside className="reader-sidebar">
          <div className="reader-sidebar__sticky">
            <span className="esp-eyebrow reader-sidebar__eyebrow">Book Navigation</span>
            <h2 className="reader-sidebar__title">{siteData.titlePage.title}</h2>
            <div className="reader-sidebar__edition">
              {siteData.edition?.version?.toUpperCase() ?? "V1"} · {siteData.stats.documentCount} units
            </div>
            <div className="reader-sidebar__index">
              {Object.entries(groupedDocuments).map(([sectionTitle, documents]) => (
                <SidebarGroup
                  key={sectionTitle}
                  sectionTitle={sectionTitle}
                  documents={documents}
                  currentSlug={current.slug}
                />
              ))}
            </div>
            <div style={{ margin: "24px 22px 22px", padding: "14px 16px", border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
              <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9, marginBottom: 8 }}>This Document</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--ink-1)", lineHeight: 1.5 }}>
                {current.images.length} figures · {current.readingMinutes} min read
              </div>
              <div style={{ height: 1, background: "var(--paper-edge)", margin: "10px 0" }} />
              <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9 }}>Section</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 13, color: "var(--ink-1)", marginTop: 4 }}>{current.sectionTitle}</div>
            </div>
          </div>
        </aside>

        <article className="reader-article">
          <div className="reader-mobile-nav">
            <label>
              <span>Current document</span>
              <select value={current.slug} onChange={(e) => navigate(`/read/${e.target.value}`)}>
                {siteData.documents.map((d) => <option key={d.slug} value={d.slug}>{d.title}</option>)}
              </select>
            </label>
          </div>

          {/* chapter opener */}
          <div className="reader-article__opener">
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 18, marginBottom: 28 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", fontWeight: 700, color: "var(--classified)", textTransform: "uppercase" }}>
                ✦ &nbsp; {current.sectionTitle} &nbsp; ✦
              </span>
              <span style={{ height: 1, background: "var(--ink-1)" }} />
              <span className="mono" style={{ color: "var(--ink-3)" }}>{current.kind ?? "Investigation"}</span>
            </div>
            <h1 className="reader-chapter-title">{chapterTitle(current.title)}</h1>
            <div className="reader-article__meta">
              <span>{current.readingMinutes} min read</span>
              <span>·</span>
              <span>{current.images.length} images</span>
              <span>·</span>
              <span>{current.fileName}</span>
            </div>
          </div>

          <div className="reader-body">
            {current.blocks.map((block, index) => (
              <BlockRenderer key={`${current.slug}-${index}`} block={block} isLead={index === 0} fnMap={fnMap} />
            ))}
          </div>

          {current.images.length ? <ImageGallery title={chapterTitle(current.title)} images={current.images} /> : null}
        </article>
      </div>

      <ReaderEnd current={current} previous={previous} next={next} />
    </main>
  );
}

function ReaderRunningHead({ current, fontScale, setFontScale, readerMode, setReaderMode }) {
  const [speechState, setSpeechState] = useState("idle");
  const [speechMessage, setSpeechMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  useEffect(() => {
    setSpeechState("idle");
    setSpeechMessage("");
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [current.slug]);

  useEffect(() => {
    if (!shareMessage) return undefined;
    const t = window.setTimeout(() => setShareMessage(""), 2200);
    return () => window.clearTimeout(t);
  }, [shareMessage]);

  const startReading = () => {
    if (!speechSupported) { setSpeechMessage("Voice reading not available."); return; }
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(documentToSpeechText(current));
    utterance.rate = 0.92;
    utterance.pitch = 0.98;
    utterance.onend = () => { setSpeechState("idle"); setSpeechMessage(""); };
    utterance.onerror = () => { setSpeechState("idle"); setSpeechMessage("Voice reading stopped."); };
    setSpeechState("speaking");
    setSpeechMessage("Reading aloud");
    window.speechSynthesis.speak(utterance);
  };

  const pauseReading = () => {
    if (!speechSupported) return;
    if (speechState === "speaking") { window.speechSynthesis.pause(); setSpeechState("paused"); setSpeechMessage("Paused"); return; }
    window.speechSynthesis.resume(); setSpeechState("speaking"); setSpeechMessage("Reading aloud");
  };

  const stopReading = () => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel(); setSpeechState("idle"); setSpeechMessage("");
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setShareMessage("Link copied"); }
    catch { setShareMessage("Copy failed"); }
  };

  const shareDocument = async () => {
    const shareData = { title: chapterTitle(current.title), text: `Read "${chapterTitle(current.title)}"`, url: window.location.href };
    if (navigator.share) { try { await navigator.share(shareData); setShareMessage("Shared"); return; } catch { return; } }
    await copyLink();
  };

  return (
    <div className="reader-running-head">
      <div className="reader-running-head__inner">
        <div className="reader-running-head__loc">
          <span style={{ color: "var(--classified)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {current.sectionTitle}
          </span>
          <span style={{ color: "var(--ink-2)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {chapterTitle(current.title)}
          </span>
        </div>
        <span style={{ flex: 1, height: 1, background: "var(--paper-edge)", alignSelf: "center", minWidth: 32 }} />

        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          {/* font size cluster */}
          <div style={{ display: "flex", border: "1px solid var(--ink-1)" }}>
            <button type="button" className="reader-tool-btn" onClick={() => setFontScale((v) => Math.max(0.92, Number((v - 0.06).toFixed(2))))}>A−</button>
            <span className="reader-tool-btn" style={{ borderLeft: "1px solid var(--ink-1)", borderRight: "1px solid var(--ink-1)", color: "var(--ink-3)", pointerEvents: "none" }}>
              {Math.round(fontScale * 100)}%
            </span>
            <button type="button" className="reader-tool-btn" onClick={() => setFontScale((v) => Math.min(1.22, Number((v + 0.06).toFixed(2))))}>A+</button>
          </div>
          {/* mode toggle */}
          <div style={{ display: "flex", border: "1px solid var(--ink-1)", marginLeft: 6 }}>
            <button type="button" className="reader-tool-btn" style={{ background: readerMode === "paper" ? "var(--ink-0)" : "transparent", color: readerMode === "paper" ? "var(--paper-0)" : "var(--ink-1)" }} onClick={() => setReaderMode("paper")}>
              ☼ Paper
            </button>
            <button type="button" className="reader-tool-btn" style={{ borderLeft: "1px solid var(--ink-1)", background: readerMode === "dossier" ? "var(--ink-0)" : "transparent", color: readerMode === "dossier" ? "var(--paper-0)" : "var(--ink-1)" }} onClick={() => setReaderMode("dossier")}>
              ☾ Dossier
            </button>
          </div>
          {/* listen */}
          <button type="button" className="reader-tool-btn" style={{ border: "1px solid var(--ink-1)", marginLeft: 6 }} onClick={speechState === "idle" ? startReading : pauseReading} disabled={!speechSupported}>
            {speechState === "speaking" ? <Pause size={11} /> : <Play size={11} />}
            {speechState === "speaking" ? " Pause" : speechState === "paused" ? " Resume" : " Listen"}
          </button>
          {speechState !== "idle" && (
            <button type="button" className="reader-tool-btn" style={{ border: "1px solid var(--ink-1)" }} onClick={stopReading}><Square size={10} /> Stop</button>
          )}
          {/* share */}
          <button type="button" className="reader-tool-btn" style={{ border: "1px solid var(--ink-1)", marginLeft: 6 }} onClick={shareDocument}><Share2 size={11} /> Share</button>
          <button type="button" className="reader-tool-btn" style={{ border: "1px solid var(--ink-1)" }} onClick={copyLink}>
            {shareMessage === "Link copied" ? <Check size={11} /> : <Copy size={11} />} Copy
          </button>
          {(speechMessage || shareMessage) && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--classified)" }}>
              {speechMessage || shareMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarGroup({ sectionTitle, documents, currentSlug }) {
  const [isOpen, setIsOpen] = useState(documents.some((d) => d.slug === currentSlug));
  return (
    <div className="reader-sidebar__group">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "12px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: isOpen ? "var(--classified)" : "var(--ink-3)" }}
      >
        <span>{sectionTitle}</span>
        <span>{isOpen ? "▾" : "▸"}</span>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: 8 }}>
          {documents.map((doc) => (
            <Link
              key={doc.slug}
              to={`/read/${doc.slug}`}
              className={doc.slug === currentSlug ? "reader-sidebar__link reader-sidebar__link--active" : "reader-sidebar__link"}
            >
              <span>{chapterTitle(doc.title)}</span>
              <span>{doc.readingMinutes}m</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ReaderEnd({ current, previous, next }) {
  return (
    <section className="reader-end">
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div className="eyebrow">End of · {current.sectionTitle}</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "0.32em", color: "var(--ink-1)", marginTop: 10 }}>
          ✦ &nbsp; ✦ &nbsp; ✦
        </div>
      </div>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "0 32px" }}>
        {previous ? (
          <Link to={`/read/${previous.slug}`} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--ink-0)", fontWeight: 700 }}>‹</div>
            <div>
              <div className="eyebrow" style={{ color: "var(--ink-3)", marginBottom: 6 }}>Previous</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: "var(--ink-0)", lineHeight: 1.2 }}>{chapterTitle(previous.title)}</div>
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/read/${next.slug}`} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textAlign: "right" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Next</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: "var(--ink-0)", lineHeight: 1.2 }}>{chapterTitle(next.title)}</div>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--classified)", fontWeight: 700 }}>›</div>
          </Link>
        ) : <div />}
      </div>
    </section>
  );
}

/* =========================================================
   SHARED / UTILITIES
   ========================================================= */

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) { setProgress(0); return; }
      setProgress(Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("resize", handleScroll); };
  }, []);
  return progress;
}

function documentToSpeechText(document) {
  const blockText = document.blocks.map((block) => {
    if (block.type === "paragraph") return block.lines.join(" ");
    if (block.type === "subheading") return block.text;
    if (block.type === "list") return block.items.join(". ");
    return "";
  }).filter(Boolean);
  return [document.sectionTitle, document.title, ...blockText].join(". ");
}

/* ---- Footnote utilities ---- */

function buildFootnoteMap(blocks) {
  const DEF = /^\[\^([^\]]+)\]:\s*(.+)/;
  const REF = /\[\^([^\]]+)\]/g;
  const defs = {};
  for (const block of blocks) {
    if (block.type !== "paragraph") continue;
    for (const line of block.lines) {
      const m = line.match(DEF);
      if (m) defs[m[1]] = m[2].trim();
    }
  }
  const keyToNum = {};
  let n = 0;
  for (const block of blocks) {
    if (block.type !== "paragraph") continue;
    const text = block.lines.join(" ");
    REF.lastIndex = 0;
    let m;
    while ((m = REF.exec(text)) !== null) {
      if (m[1] in defs && !(m[1] in keyToNum)) keyToNum[m[1]] = ++n;
    }
  }
  return { keyToNum, defs };
}

function isFootnoteDefsBlock(block) {
  return block.type === "paragraph" &&
    block.lines.length > 0 &&
    block.lines.every((l) => /^\[\^/.test(l.trim()));
}

function renderWithRefs(text, fnMap) {
  const parts = text.split(/(\[\^[^\]]+\])/);
  return parts.map((part, i) => {
    const m = part.match(/^\[\^([^\]]+)\]$/);
    if (!m) return part;
    const num = fnMap.keyToNum[m[1]];
    if (num == null) return null;
    return (
      <a key={i} href={`#fn-${num}`}
        style={{ textDecoration: "none", verticalAlign: "super", fontSize: "0.62em", lineHeight: 0,
          color: "var(--classified)", fontFamily: "var(--font-data)", fontWeight: 700, marginLeft: "0.08em" }}>
        [{num}]
      </a>
    );
  });
}

function FootnotesBlock({ block, fnMap }) {
  const DEF = /^\[\^([^\]]+)\]:\s*(.+)/;
  const URL_RE = /https?:\/\/[^\s;,<>()[\]]+/g;

  const items = block.lines
    .map((line) => {
      const m = line.match(DEF);
      if (!m) return null;
      const num = fnMap.keyToNum[m[1]];
      if (num == null) return null;
      return { key: m[1], num, rawText: m[2].trim() };
    })
    .filter(Boolean)
    .sort((a, b) => a.num - b.num);

  if (items.length === 0) return null;

  return (
    <section style={{ marginTop: 56, paddingTop: 24, borderTop: "3px double var(--ink-1)" }}>
      <div className="eyebrow" style={{ marginBottom: 20 }}>Notes &amp; Sources</div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map(({ key, num, rawText }) => {
          const parts = rawText.split(URL_RE);
          const urls = rawText.match(URL_RE) ?? [];
          const rendered = [];
          parts.forEach((part, i) => {
            if (part) rendered.push(part);
            if (urls[i]) rendered.push(
              <a key={`url-${i}`} href={urls[i]} target="_blank" rel="noreferrer"
                style={{ color: "var(--link)", wordBreak: "break-all", textDecorationThickness: "1px", textUnderlineOffset: "2px" }}>
                {urls[i]}
              </a>
            );
          });
          return (
            <li key={key} id={`fn-${num}`} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 10, marginBottom: 14, scrollMarginTop: 80 }}>
              <span style={{ fontFamily: "var(--font-data)", fontSize: 11, color: "var(--classified)", fontWeight: 700, paddingTop: 2 }}>
                [{num}]
              </span>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>
                {rendered}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function BlockRenderer({ block, isLead, fnMap }) {
  if (block.type === "subheading") {
    return <h2 className="article-subheading">{block.text}</h2>;
  }
  if (block.type === "list") {
    return (
      <ul className="article-list">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.type === "links") {
    return (
      <div className="article-links" id="reader-sources">
        {block.items.map((item) => (
          <a key={item.url} href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
        ))}
      </div>
    );
  }
  if (block.type === "paragraph") {
    if (isFootnoteDefsBlock(block)) {
      return <FootnotesBlock block={block} fnMap={fnMap} />;
    }
    const text = block.lines.join(" ");
    const content = fnMap ? renderWithRefs(text, fnMap) : text;
    if (isLead) return <p className="article-paragraph article-paragraph--lead esp-dropcap">{content}</p>;
    return <p className="article-paragraph">{content}</p>;
  }
  return null;
}

function ImageGallery({ title, images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <section className="image-gallery">
      <div className="image-gallery__header">
        <span className="esp-eyebrow">Supporting Images</span>
        <h2 className="esp-h2">Visual references attached to {title}</h2>
      </div>
      <div className="image-gallery__grid">
        {images.map((image) => (
          <figure key={`${image.relative_path}-${image.caption}`} className="image-card">
            <button type="button" className="image-card__button" onClick={() => setSelectedImage(image)}>
              <img src={image.publicPath} alt={image.caption} loading="lazy" />
            </button>
            <figcaption>
              <p className="image-card__caption">{image.caption}</p>
              <p className="image-card__credit"><strong>Source:</strong> {image.source_name}</p>
              <p className="image-card__credit"><strong>Author:</strong> {image.author}</p>
              <p className="image-card__credit"><strong>License:</strong> {displayLicenseLabel(image.license)}</p>
              {!image.freely_licensed ? <p className="image-card__credit"><strong>Rights:</strong> source-attributed only; not freely licensed.</p> : null}
              {image.source_url ? <a href={image.source_url} target="_blank" rel="noreferrer" className="image-card__link">View original</a> : null}
            </figcaption>
          </figure>
        ))}
      </div>
      {selectedImage ? <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} /> : null}
    </section>
  );
}

function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button type="button" className="lightbox__backdrop" onClick={onClose} aria-label="Close image preview" />
      <div className="lightbox__panel">
        <button type="button" className="lightbox__close" onClick={onClose}>Close</button>
        <img src={image.publicPath} alt={image.caption} />
        <p>{image.caption}</p>
      </div>
    </div>
  );
}

