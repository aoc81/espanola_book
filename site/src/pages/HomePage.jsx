import { ChevronRight } from "lucide-react";
import coverImg from "../../../assets/images/covers/Espanola Book Cover-New.png";
import { chapterTitle } from "../lib/siteUtils";
import { getLastReadDocumentId } from "../lib/readerProgress";
import { useSite } from "../lib/siteContext";
import { LocalizedLink } from "../components/layout/LocalizedLink";

const HOME_COPY = {
  en: {
    heroEyebrow: "Long-Form Investigation · Open-Source Edition",
    titleLines: ["ESPAÑOLA:", "From hooligans", "to war machines"],
    dek: "An open-source investigative book on PMCs and the wartime conversion of subcultural violence.",
    beginReading: "Begin Reading",
    resume: "Resume",
    viewSources: "View Sources",
    sourcesPreserved: "sources and image credits preserved.",
    by: "By Angel Ortiz",
    editionLine: "Open-Source Edition · 2026",
    fromEditor: "From the Editor",
    editorP1: "This book is based on human-led OSINT research, multilingual source review, and AI-assisted organisation, translation support, drafting, and editorial revision. Final judgments, source selection, interpretation, and responsibility for the text remain human.",
    editorP2: "This is the open-source web version of the book and the repository for its canonical manuscript, source notes, image credits, references, and generated outputs.",
    ledgerSources: "Sources",
    sectionsEyebrow: "Book Sections · 04 Folders",
    sectionsTitle: "Enter by section, then move through the reader.",
    sectionsAlt: "Or skip to the full Table of Contents",
    openFolder: "Open",
    folders: {
      frontMatter: { label: "Front Matter", title: "How to read the book", description: "Author note, methodology, AI-assistance disclosure, and terminology notes.", stamp: "READ FIRST" },
      chapters: { label: "Chapters", title: "The narrative investigation", description: "From the stadium and Donbas to recruitment, branding, combat reputation, and state reabsorption.", stamp: "OPEN" },
      appendices: { label: "Appendices", title: "Sources & reference links", description: "Reader-facing source notes, reference links, and source-handling context.", stamp: "REFERENCE" },
      codex: { label: "Codex", title: "Editorial protocols", description: "The standing protocols governing voice, evidence, source integration, writing behavior, and editor-in-chief review.", stamp: "INTERNAL" },
    },
    itemsInside: "items inside",
    editorialNotes: "Editorial Notes",
    notes: [
      ["†", "All Russian terms appear in italics with translation; Cyrillic only when the source uses it."],
      ["‡", "Subjects are referred to by full name on first mention, surname after; redacted where required."],
      ["§", "Open-source claims are flagged with attribution; intercepted transmissions cite their channel and time."],
    ],
    getCopyToday: "Get a copy today",
    downloadHere: "Download it here",
  },
  es: {
    heroEyebrow: "Investigación de largo aliento · Edición de fuentes abiertas",
    titleLines: ["ESPAÑOLA:", "De hooligans", "a máquinas de guerra"],
    dek: "Un libro de investigación en fuentes abiertas sobre las CMP y la conversión bélica de la violencia subcultural.",
    beginReading: "Empezar a leer",
    resume: "Reanudar",
    viewSources: "Ver fuentes",
    sourcesPreserved: "fuentes y créditos de imágenes preservados.",
    by: "Por Ángel Ortiz",
    editionLine: "Edición de fuentes abiertas · 2026",
    fromEditor: "Del editor",
    editorP1: "Este libro se basa en investigación OSINT dirigida por humanos, revisión multilingüe de fuentes y asistencia de IA para organización, apoyo de traducción, redacción y revisión editorial. Los juicios finales, la selección de fuentes, la interpretación y la responsabilidad del texto siguen siendo humanas.",
    editorP2: "Esta es la versión web en fuentes abiertas del libro y el repositorio de su manuscrito canónico, notas de fuentes, créditos de imágenes, referencias y salidas generadas.",
    ledgerSources: "Fuentes",
    sectionsEyebrow: "Secciones del libro · 04 carpetas",
    sectionsTitle: "Entra por secciones y luego avanza por el lector.",
    sectionsAlt: "O salta directamente al índice completo",
    openFolder: "Abrir",
    folders: {
      frontMatter: { label: "Preliminares", title: "Cómo leer el libro", description: "Nota del autor, metodología, nota sobre asistencia de IA y terminología.", stamp: "LEER PRIMERO" },
      chapters: { label: "Capítulos", title: "La investigación narrativa", description: "Del estadio y el Donbás al reclutamiento, la marca, la reputación de combate y la reabsorción estatal.", stamp: "ABRIR" },
      appendices: { label: "Apéndices", title: "Fuentes y enlaces", description: "Notas de fuentes para el lector, enlaces de referencia y contexto de manejo de fuentes.", stamp: "REFERENCIA" },
      codex: { label: "Codex", title: "Protocolos editoriales", description: "Los protocolos permanentes que rigen voz, evidencia, integración de fuentes, comportamiento de escritura y revisión editorial.", stamp: "INTERNO" },
    },
    itemsInside: "elementos dentro",
    editorialNotes: "Notas editoriales",
    notes: [
      ["†", "Todos los términos rusos aparecen en cursiva con traducción; el cirílico solo cuando la fuente lo usa."],
      ["‡", "Los sujetos aparecen con nombre completo en la primera mención y luego con apellido; se redactan cuando es necesario."],
      ["§", "Las afirmaciones en fuentes abiertas se marcan con atribución; las transmisiones interceptadas citan canal y hora."],
    ],
    getCopyToday: "Consigue una copia hoy",
    downloadHere: "Descárgalo aquí",
  },
  fr: {
    heroEyebrow: "Enquête au long cours · Édition en sources ouvertes",
    titleLines: ["ESPAÑOLA :", "Des hooligans", "aux machines de guerre"],
    dek: "Une enquête en sources ouvertes sur les SMP et la conversion, en temps de guerre, de la violence subculturelle.",
    beginReading: "Commencer la lecture",
    resume: "Reprendre",
    viewSources: "Voir les sources",
    sourcesPreserved: "sources et crédits d'images préservés.",
    by: "Par Ángel Ortiz",
    editionLine: "Édition en sources ouvertes · 2026",
    fromEditor: "Note de l'éditeur",
    editorP1: "Ce livre repose sur une recherche OSINT dirigée par l'humain, une revue multilingue des sources et une assistance de l'IA pour l'organisation, l'appui à la traduction, la rédaction et la révision éditoriale. Les jugements finaux, la sélection des sources, l'interprétation et la responsabilité du texte restent humaines.",
    editorP2: "Il s'agit de la version web en sources ouvertes du livre et du dépôt de son manuscrit canonique, de ses notes de sources, de ses crédits d'images, de ses références et de ses sorties générées.",
    ledgerSources: "Sources",
    sectionsEyebrow: "Sections du livre · 04 dossiers",
    sectionsTitle: "Entrez par section, puis progressez dans le lecteur.",
    sectionsAlt: "Ou allez directement à la table des matières complète",
    openFolder: "Ouvrir",
    folders: {
      frontMatter: { label: "Préliminaires", title: "Comment lire ce livre", description: "Note de l'auteur, méthodologie, note sur l'assistance IA et terminologie.", stamp: "LIRE D'ABORD" },
      chapters: { label: "Chapitres", title: "L'enquête narrative", description: "Du stade et du Donbass au recrutement, à la marque, à la réputation de combat et à la réabsorption par l'État.", stamp: "OUVRIR" },
      appendices: { label: "Annexes", title: "Sources et liens", description: "Notes de sources à destination du lecteur, liens de référence et contexte de traitement des sources.", stamp: "RÉFÉRENCE" },
      codex: { label: "Codex", title: "Protocoles éditoriaux", description: "Les protocoles permanents qui régissent la voix, la preuve, l'intégration des sources, le comportement d'écriture et la revue éditoriale.", stamp: "INTERNE" },
    },
    itemsInside: "éléments",
    editorialNotes: "Notes éditoriales",
    notes: [
      ["†", "Tous les termes russes apparaissent en italique avec traduction ; le cyrillique seulement lorsque la source l'emploie."],
      ["‡", "Les personnes sont mentionnées avec leur nom complet à la première occurrence, puis par leur nom de famille ; elles sont masquées lorsque nécessaire."],
      ["§", "Les affirmations en sources ouvertes sont signalées avec attribution ; les transmissions interceptées citent leur canal et leur heure."],
    ],
    getCopyToday: "Obtenir un exemplaire",
    downloadHere: "Télécharger ici",
  },
};

export function HomePage() {
  const { siteData, locale } = useSite();
  const copy = HOME_COPY[locale];
  const lastReadId = typeof window !== "undefined" ? getLastReadDocumentId(locale) : "";
  const lastRead = siteData.documents.find((d) => d.id === lastReadId);

  return (
    <main id="main-content">
      <HomeHero lastRead={lastRead} copy={copy} siteData={siteData} />
      <EditorsLetter copy={copy} siteData={siteData} />
      <SectionShelf copy={copy} siteData={siteData} />
      <FootnotesStrip copy={copy} />
    </main>
  );
}

function HomeHero({ lastRead, copy, siteData }) {
  const feature = siteData.documents.find((d) => d.id === "Prologue.md") ?? siteData.documents[0];
  const totalMinutes = siteData.documents.reduce((s, d) => s + d.readingMinutes, 0);

  return (
    <section className="page-section" style={{ position: "relative", paddingTop: 48, paddingBottom: 88, borderBottom: "1px solid var(--paper-edge)" }}>
      <div className="page-section__inner home-hero__grid">
        {/* LEFT: editorial copy */}
        <div style={{ paddingTop: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            ✦ &nbsp; {copy.heroEyebrow}
          </div>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "clamp(44px, 5.5vw, 84px)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            color: "var(--ink-0)",
            margin: "0 0 28px",
          }}>
            {copy.titleLines[0]}<br />
            <span style={{ color: "var(--ink-2)", fontWeight: 400 }}>{copy.titleLines[1]}</span><br />
            <span style={{ color: "var(--ink-2)", fontWeight: 400 }}>{copy.titleLines[2]}</span>
          </h1>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, lineHeight: 1.45, color: "var(--ink-2)", margin: "0 0 28px", maxWidth: 560 }}>
            {copy.dek}
          </p>

          {/* metadata strip */}
          <div className="home-hero__meta-strip" style={{
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
            <span>{copy.by}</span>
            <span style={{ background: "var(--ink-1)", height: 14 }} />
            <span>{copy.editionLine}</span>
            <span style={{ background: "var(--ink-1)", height: 14 }} />
            <span style={{ color: "var(--classified)" }}>~ {totalMinutes} min total</span>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {feature ? (
              <LocalizedLink to={`/read/${feature.slug}`} className="button button--solid">▸ {copy.beginReading}</LocalizedLink>
            ) : null}
            {lastRead ? (
              <LocalizedLink to={`/read/${lastRead.slug}`} className="button">{copy.resume} · {lastRead.readingMinutes}m left</LocalizedLink>
            ) : null}
            <LocalizedLink to="/sources" className="button">↡ {copy.viewSources}</LocalizedLink>
          </div>

          <div style={{ marginTop: 36, paddingTop: 18, borderTop: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", lineHeight: 1.7 }}>
            {siteData.stats.documentCount} reading units · {siteData.stats.imageCount} image references · {copy.sourcesPreserved}
          </div>
        </div>

        {/* RIGHT: bound cover */}
        <BoundCover copy={copy} />
      </div>
    </section>
  );
}

function BoundCover({ copy }) {
  return (
    <div style={{ position: "relative", paddingBottom: 52 }}>
      {/* cover image */}
      <div style={{
        position: "relative",
        boxShadow: "0 1px 0 rgba(0,0,0,0.06), 0 32px 60px -28px rgba(20,17,13,0.55), 0 12px 24px -16px rgba(20,17,13,0.4)",
        border: "1px solid var(--ink-1)",
        background: "var(--dossier-0)",
      }}>
        <img
          src={coverImg}
          alt="Española cover artwork"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* download slip */}
      <LocalizedLink to="/download" className="home-hero__slip" style={{ textDecoration: "none",
        background: "var(--paper-2)", padding: "14px 16px", transform: "rotate(-2deg)",
        boxShadow: "0 8px 18px -10px rgba(20,17,13,0.4)",
        borderTop: "1px solid var(--paper-edge)", borderBottom: "1px solid var(--paper-edge)",
        display: "block",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--classified)", marginBottom: 6 }}>
          {copy.getCopyToday}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.5, color: "var(--ink-1)" }}>
          {copy.downloadHere}
        </div>
        <div style={{ position: "absolute", top: -8, left: 24, width: 52, height: 16, background: "rgba(212,200,170,0.65)", border: "1px solid rgba(28,26,22,0.08)" }} />
        <div style={{ position: "absolute", top: -8, right: 24, width: 52, height: 16, background: "rgba(212,200,170,0.65)", border: "1px solid rgba(28,26,22,0.08)" }} />
      </LocalizedLink>
    </div>
  );
}

function EditorsLetter({ copy, siteData }) {
  const ledgerRows = [
    ["Edition", siteData.edition?.version?.toUpperCase() ?? "V1"],
    ["Reading Units", String(siteData.stats.documentCount)],
    ["Image References", String(siteData.stats.imageCount)],
    [copy.ledgerSources, "44"],
    ["Reference Links", "75"],
    ["Generated Outputs", "5"],
    ["Last Updated", "04.05.2026"],
  ];

  return (
    <section className="editors-letter">
      <div className="editors-letter__inner">
        <div className="editors-letter__numeral" aria-hidden="true">✦</div>
        <div className="editors-letter__body">
          <span className="esp-eyebrow">{copy.fromEditor}</span>
          <p>
            {copy.editorP1}
          </p>
          <p>
            {copy.editorP2}
          </p>
        </div>
        <div className="ledger" role="table" aria-label="Edition details">
          <div className="ledger__header">
            <span>Ledger</span>
            <span>This Edition</span>
          </div>
          <table className="ledger__table">
            <tbody>
              {ledgerRows.map(([label, value]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function SectionShelf({ copy, siteData }) {
  const folders = [
    { key: "front-matter", roman: "I", link: "/section/front-matter", ...copy.folders.frontMatter },
    { key: "chapters", roman: "II", link: "/chapters", ...copy.folders.chapters },
    { key: "appendices", roman: "III", link: "/sources", ...copy.folders.appendices },
    { key: "codex", roman: "IV", link: "/codex", count: 4, ...copy.folders.codex },
  ];

  return (
    <section className="section-shelf" id="book-sections">
      <div className="section-shelf__inner">
        <div className="section-shelf__header">
          <div>
            <span className="esp-eyebrow">{copy.sectionsEyebrow}</span>
            <h2>{copy.sectionsTitle}</h2>
          </div>
          <span className="esp-meta">↦ {copy.sectionsAlt}</span>
        </div>
        <div className="section-shelf__grid">
          {folders.map((folder) => {
            const group = siteData.groups.find((item) => item.key === folder.key);
            const count = folder.count ?? group?.documents.length ?? 0;
            return (
              <article key={folder.key} className="folder-card">
                <div className="folder-card__tab">{folder.label}</div>
                <span className="stamp stamp--rotated folder-card__stamp">{folder.stamp}</span>
                <div className="folder-card__numeral" aria-hidden="true">{folder.roman}</div>
                <div className="folder-card__rule" aria-hidden="true" />
                <div className="folder-card__body">
                  <h3>{folder.title}</h3>
                  <p>{folder.description}</p>
                  <div className="folder-card__actions">
                    <span className="esp-meta">{String(count).padStart(2, "0")} {copy.itemsInside}</span>
                    <LocalizedLink to={folder.link} className="button">
                      {copy.openFolder}<ChevronRight size={14} aria-hidden="true" />
                    </LocalizedLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function buildTocSections(siteData) {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const appendixLetters = ["A", "B", "C", "D", "E", "F"];
  return siteData.groups.map((group) => {
    const items = group.documents.map((doc, idx) => {
      let num;
      if (group.key === "front-matter") num = romanNumerals[idx] ?? String(idx + 1);
      else if (group.key === "appendices") num = appendixLetters[idx] ?? String(idx + 1);
      else num = String(idx + 1).padStart(2, "0");
      return { num, doc };
    });
    return { group, items };
  });
}

export function TocInline() {
  const { siteData } = useSite();
  const sections = buildTocSections(siteData);
  return (
    <div>
      {sections.map(({ group, items }) => (
        <div key={group.key} style={{ marginBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center", marginBottom: 18 }}>
            <LocalizedLink to={group.key === "chapters" ? "/chapters" : `/section/${group.key}`} style={{ textDecoration: "none", fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>
              {group.title} ›
            </LocalizedLink>
            <span style={{ height: 1, background: "var(--ink-1)" }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>{items.length} items</span>
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.map(({ num, doc }) => (
              <li key={doc.slug} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 12, alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid var(--paper-edge)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, letterSpacing: "0.06em", color: "var(--ink-0)" }}>
                  {num}
                </span>
                <span>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 700, color: "var(--ink-0)", letterSpacing: "-0.005em" }}>
                    {chapterTitle(doc.title)}
                  </span>
                  <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
                    {doc.excerpt?.slice(0, 80)}{doc.excerpt?.length > 80 ? "…" : ""}
                  </div>
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function FootnotesStrip({ copy }) {
  const notes = copy.notes;
  return (
    <section className="footnotes-strip" aria-label="Editorial notes">
      <div className="footnotes-strip__inner">
        <span className="esp-eyebrow">{copy.editorialNotes}</span>
        {notes.map(([sym, text]) => (
          <div key={sym} className="footnotes-strip__note">
            <span className="footnotes-strip__sym" aria-hidden="true">{sym}</span>
            <p className="footnotes-strip__text">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

