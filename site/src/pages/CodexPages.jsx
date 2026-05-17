import { useSite } from "../lib/siteContext";
import { LocalizedLink } from "../components/layout/LocalizedLink";

import codexProtocol from "../../../docs/codex/book_writing_protocol.md?raw";
import codexBehavior from "../../../docs/codex/llm_writing_behavior.md?raw";
import codexAgent from "../../../docs/codex/agent.md?raw";
import editorInChief from "../../../docs/editorial/editor_in_chief.md?raw";

const CODEX_DOCS = [
  { n: "01", key: "source", link: "/codex/source-agent", filename: "agent.md", sourcePath: "docs/codex/agent.md" },
  { n: "02", key: "protocol", link: "/codex/book-writing-protocol", filename: "book_writing_protocol.md", sourcePath: "docs/codex/book_writing_protocol.md" },
  { n: "03", key: "behavior", link: "/codex/writing-behavior", filename: "llm_writing_behavior.md", sourcePath: "docs/codex/llm_writing_behavior.md" },
  { n: "04", key: "editor", link: "/codex/editor-in-chief", filename: "editor_in_chief.md", sourcePath: "docs/editorial/editor_in_chief.md" },
];

const CODEX_COPY = {
  en: {
    overview: "Overview", codex: "Codex", protocols: "Editorial Codex · 04 Protocols", intro: "The standing protocols governing how this investigation was written — voice, evidence, source integration, and behavioral constraints.", englishOnly: "Protocol source files are currently published in English only.", previous: "Previous", next: "Next", editorialCodex: "Editorial Codex", open: "Open",
    source: { title: "Source & Narrative Integration", body: "Chapter intent → Protocol discipline → Source insight → Narrative construction. Sources must change the argument, not decorate it. Each section must include at least one source that deepens causality, expands scope, or challenges framing.", label: "Source Usage Protocol" },
    protocol: { title: "Core Voice & Evidentiary Rules", body: "Write in a human, polished editor-in-chief voice. Every materially relevant episode must be tied to source support. Distinguish documented facts from attribution-dependent claims, contested findings, and unit self-descriptions — each handled differently in the prose.", label: "Book Writing Protocol" },
    behavior: { title: "Writing Behavior Constraints", body: "Do not assume coherence. Do not smooth contradictions. Surface uncertainty. The narrative must emerge from the evidence — not the reverse. Ambiguity is not a problem to fix; it is often the story. Every sentence must earn its place.", label: "LLM Writing Behavior" },
    editor: { title: "Editor-in-Chief Review Standard", body: "A publication-pressure review brief for judging the manuscript as serious investigative nonfiction. It defines the verdict standard, structural scrutiny, evidentiary risk, legal exposure, continuity checks, and the final editorial action plan.", label: "Editor-in-Chief Brief" },
  },
  es: {
    overview: "Inicio", codex: "Codex", protocols: "Codex editorial · 04 protocolos", intro: "Los protocolos permanentes que rigen cómo se escribió esta investigación: voz, evidencia, integración de fuentes y restricciones de comportamiento.", englishOnly: "Los archivos fuente del protocolo se publican actualmente solo en inglés.", previous: "Anterior", next: "Siguiente", editorialCodex: "Codex editorial", open: "Abrir",
    source: { title: "Integración de fuentes y narrativa", body: "Intención del capítulo → disciplina de protocolo → hallazgo de fuentes → construcción narrativa. Las fuentes deben cambiar el argumento, no decorarlo. Cada sección debe incluir al menos una fuente que profundice la causalidad, amplíe el alcance o cuestione el encuadre.", label: "Protocolo de uso de fuentes" },
    protocol: { title: "Voz central y reglas de evidencia", body: "Escribe con una voz humana y pulida de editor jefe. Todo episodio materialmente relevante debe estar ligado a soporte documental. Distingue entre hechos documentados, afirmaciones dependientes de atribución, hallazgos discutidos y autodescripciones de la unidad.", label: "Protocolo de escritura del libro" },
    behavior: { title: "Restricciones de comportamiento de escritura", body: "No asumas coherencia. No alises contradicciones. Expón la incertidumbre. La narrativa debe surgir de la evidencia, no al revés. La ambigüedad no es un problema a corregir; a menudo es la historia.", label: "Comportamiento de escritura LLM" },
    editor: { title: "Estándar de revisión del editor jefe", body: "Una pauta de revisión bajo presión de publicación para juzgar el manuscrito como no ficción investigativa seria. Define el estándar de veredicto, el escrutinio estructural, el riesgo probatorio, la exposición legal y el plan editorial final.", label: "Brief del editor jefe" },
  },
  fr: {
    overview: "Accueil", codex: "Codex", protocols: "Codex éditorial · 04 protocoles", intro: "Les protocoles permanents qui régissent la rédaction de cette enquête : voix, preuve, intégration des sources et contraintes comportementales.", englishOnly: "Les fichiers sources du protocole sont actuellement publiés uniquement en anglais.", previous: "Précédent", next: "Suivant", editorialCodex: "Codex éditorial", open: "Ouvrir",
    source: { title: "Intégration des sources et du récit", body: "Intention du chapitre → discipline de protocole → apport des sources → construction narrative. Les sources doivent modifier l'argument, non l'orner. Chaque section doit inclure au moins une source qui approfondit la causalité, élargit la portée ou remet en cause le cadrage.", label: "Protocole d'usage des sources" },
    protocol: { title: "Voix centrale et règles probatoires", body: "Écrire avec une voix humaine, maîtrisée, d'éditeur en chef. Chaque épisode matériellement pertinent doit être lié à un appui documentaire. Il faut distinguer les faits documentés, les affirmations dépendantes de l'attribution, les conclusions contestées et les auto-descriptions de l'unité.", label: "Protocole d'écriture du livre" },
    behavior: { title: "Contraintes de comportement rédactionnel", body: "Ne présumez pas la cohérence. Ne lissez pas les contradictions. Faites apparaître l'incertitude. Le récit doit émerger de la preuve, et non l'inverse. L'ambiguïté n'est pas un problème à corriger ; elle est souvent l'histoire même.", label: "Comportement rédactionnel LLM" },
    editor: { title: "Standard de revue de l'éditeur en chef", body: "Une grille de revue sous contrainte de publication pour juger le manuscrit comme une non-fiction d'enquête sérieuse. Elle définit le standard de verdict, le contrôle structurel, le risque probatoire, l'exposition juridique et le plan éditorial final.", label: "Note de l'éditeur en chef" },
  },
  ru: {
    overview: "Главная", codex: "Кодекс", protocols: "Редакционный кодекс · 04 протокола", intro: "Постоянные протоколы, регулировавшие написание этого расследования: голос, доказательство, интеграция источников и поведенческие ограничения.", englishOnly: "Исходные файлы протоколов в настоящий момент публикуются только на английском.", previous: "Назад", next: "Далее", editorialCodex: "Редакционный кодекс", open: "Открыть",
    source: { title: "Интеграция источников и нарратива", body: "Намерение главы → дисциплина протокола → источниковая находка → построение нарратива. Источники должны менять аргумент, а не украшать его. В каждом разделе должен быть хотя бы один источник, углубляющий причинность, расширяющий охват или оспаривающий рамку.", label: "Протокол использования источников" },
    protocol: { title: "Голос и доказательные правила", body: "Писать в человеческом, отшлифованном голосе главного редактора. Каждый материально значимый эпизод должен быть привязан к источниковой поддержке. Различать задокументированные факты, утверждения, зависящие от атрибуции, спорные выводы и самоописания подразделения.", label: "Протокол написания книги" },
    behavior: { title: "Ограничения поведения при письме", body: "Не предполагать когерентности. Не сглаживать противоречия. Выводить неопределённость на поверхность. Нарратив должен возникать из доказательств, а не наоборот. Неоднозначность не проблема, которую нужно «починить», — часто это и есть история.", label: "Поведение LLM при письме" },
    editor: { title: "Стандарт проверки главного редактора", body: "Бриф редакционной проверки под давлением публикации, оценивающий рукопись как серьёзную расследовательскую нон-фикшн. Определяет стандарт вердикта, структурный анализ, доказательный риск, правовую экспозицию, проверки преемственности и финальный план редакционных действий.", label: "Бриф главного редактора" },
  },
};

function CodexBreadcrumb({ current }) {
  const { locale } = useSite();
  const copy = CODEX_COPY[locale];
  return (
    <div className="page-crumb" style={{ borderBottom: "1px solid var(--paper-edge)", paddingTop: 12, paddingBottom: 12, background: "var(--paper-0)" }}>
      <div className="page-crumb__inner">
        <LocalizedLink to="/" style={{ color: "inherit", textDecoration: "none" }}>{copy.overview}</LocalizedLink>
        <span>›</span>
        <LocalizedLink to="/codex" style={{ color: "inherit", textDecoration: "none" }}>{copy.codex}</LocalizedLink>
        {current && <><span>›</span><span style={{ color: "var(--ink-0)" }}>{current}</span></>}
      </div>
    </div>
  );
}

export function CodexIndexPage() {
  const { locale } = useSite();
  const copy = CODEX_COPY[locale];
  return (
    <main id="main-content">
      <CodexBreadcrumb />
      <section className="page-section" style={{ position: "relative", paddingTop: 72, paddingBottom: 56, borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div className="page-section__inner">
          <div className="page-eyebrow-row">
            <div className="eyebrow">{copy.protocols}</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>docs/codex/ + docs/editorial/</div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(72px, 11vw, 160px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28 }}>
            CODEX.
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 760 }}>
            {copy.intro}
          </h2>
          <p className="mono" style={{ color: "var(--ink-3)", marginTop: 18 }}>{copy.englishOnly}</p>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 56, paddingBottom: 88 }}>
        <div className="page-section__inner" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
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
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20, lineHeight: 1.2, color: "var(--ink-0)", margin: "0 0 14px" }}>{copy[c.key].title}</h3>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 24px", flex: 1 }}>{copy[c.key].body}</p>
              <LocalizedLink to={c.link} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--classified)", textDecoration: "none", borderTop: "1px solid var(--paper-edge)", paddingTop: 16 }}>
                ▸ {copy.open} {copy[c.key].label}
              </LocalizedLink>
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
  const { locale } = useSite();
  const copy = CODEX_COPY[locale];
  const lines = content.split("\n");
  const lineNumWidth = String(lines.length).length;
  const doc = CODEX_DOCS.find((d) => d.filename === filename) ?? null;
  const idx = doc ? CODEX_DOCS.findIndex((d) => d.filename === filename) : -1;
  const prev = idx > 0 ? CODEX_DOCS[idx - 1] : null;
  const next = idx >= 0 ? CODEX_DOCS[idx + 1] ?? null : null;

  return (
    <main id="main-content">
      <CodexBreadcrumb current={filename} />

      {/* page header */}
      <div className="page-section" style={{ paddingTop: 32, paddingBottom: 28, borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-0)" }}>
        <div className="page-section__inner">
          <div className="eyebrow" style={{ marginBottom: 10 }}>{copy.editorialCodex}</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: 0 }}>{title}</h1>
        </div>
      </div>

      {/* code box */}
      <div className="page-section" style={{ paddingTop: 40, paddingBottom: 80, background: "var(--paper-1)" }}>
        <div className="page-section__inner">
          {/* file tab */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--dossier-1)", border: "1px solid var(--dossier-rule)", borderBottom: "none", padding: "8px 18px", fontFamily: "var(--font-data)", fontSize: 12, letterSpacing: "0.04em", color: "var(--dossier-fg-1)" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--classified)", display: "inline-block" }} />
            {doc?.sourcePath ?? `docs/codex/${filename}`}
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
      <section className="page-section" style={{ paddingTop: 48, paddingBottom: 64, borderTop: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
        <div className="page-section__inner reader-end__grid">
          {prev ? (
            <LocalizedLink to={prev.link} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--ink-0)", fontWeight: 700, letterSpacing: "-0.02em" }}>‹</div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{copy.previous}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: "var(--ink-0)" }}>{copy[prev.key]?.label ?? prev.filename}</div>
                <div style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{prev.filename}</div>
              </div>
            </LocalizedLink>
          ) : <div />}

          {next ? (
            <LocalizedLink to={next.link} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "28px 32px", border: "1px solid var(--ink-1)", background: "var(--paper-0)", textAlign: "right" }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{copy.next}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, color: "var(--ink-0)" }}>{copy[next.key]?.label ?? next.filename}</div>
                <div style={{ fontFamily: "var(--font-data)", fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{next.filename}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 64, lineHeight: 0.85, color: "var(--classified)", fontWeight: 700, letterSpacing: "-0.02em" }}>›</div>
            </LocalizedLink>
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

export function EditorInChiefPage() {
  return <CodexPage title="Editor-in-Chief Review Standard" filename="editor_in_chief.md" content={editorInChief} />;
}

