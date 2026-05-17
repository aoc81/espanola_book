import { useEffect, useState } from "react";
import coverImg from "../../../assets/images/covers/Espanola Book Cover-New.png";
import { TocInline } from "./HomePage";
import { useSite } from "../lib/siteContext";
import { LocalizedLink } from "../components/layout/LocalizedLink";

const NOTEBOOKLM_VIDEO_URL = encodeURI("/downloads/Española_Case_Study.mp4");
const NOTEBOOKLM_AUDIO_URL = "/downloads/How_Russia_weaponized_its_football_hooligans.m4a";
const NOTEBOOKLM_POSTER_URL = "/downloads/espanola-notebooklm.png";
const NOTEBOOKLM_MINDMAP_URL = "/downloads/NotebookLM-Mind-Map.png";
const PDF_BY_LOCALE = {
  en: "/downloads/espanola-v4.1.pdf",
  es: "/downloads/espanola-v4.1-es.pdf",
  fr: "/downloads/espanola-v4.1-fr.pdf",
  ru: "/downloads/espanola-v4.1-ru.pdf",
};
const ZIP_BY_LOCALE = {
  en: "/downloads/espanola-v4.1-markdown.zip",
  es: "/downloads/espanola-v4.1-markdown-es.zip",
  fr: "/downloads/espanola-v4.1-markdown-fr.zip",
  ru: "/downloads/espanola-v4.1-markdown-ru.zip",
};

const DOWNLOAD_COPY = {
  en: {
    overview: "Overview",
    getTheBook: "Get the book",
    title: "DOWNLOAD.",
    intro: "The full manuscript is free in PDF and Markdown, with companion video and audio files available below. A Kindle edition is on Amazon. If the work is useful to you, consider supporting it.",
    readingUnits: "Reading units",
    imageReferences: "Image references",
    sources: "Sources",
    formats: "Formats",
    videoCompanions: "Video companions",
    audioCompanions: "Audio companions",
    mindMaps: "Mind maps",
    availableFormats: "Available Formats",
    free: "Free",
    paid: "Paid",
    download: "Download",
    englishSource: "English source archive",
    edition: "Edition",
    format: "Format",
    description: "Description",
    price: "Price",
    action: "Action",
    pdfLabel: "Portable Document Format",
    pdfMeta: "Full manuscript · Paginated export",
    zipLabel: "Markdown Source Files",
    kindleLabel: "Amazon Kindle Edition",
    kindleMeta: "E-reader · Linked footnotes · Chapter navigation",
    amazon: "Amazon",
    licenseNote: "PDF & ZIP: CC BY-NC 4.0 — Free to share and adapt for non-commercial use with attribution",
    kindleNote: "Kindle: © Ángel Ortiz · MMXXVI",
    readerIndex: "Reader Index",
    tableOfContents: "Table of Contents",
    companionMedia: "Companion Media",
    notebookFiles: "NotebookLM files",
    companionTitle: "Video and podcast companions for readers",
    companionBody: "These NotebookLM-generated companion files offer alternate ways to review the case structure, themes, and narrative arc alongside the written investigation.",
    companionNote: "Reader-facing companion media · Not the canonical text",
    caseStudyVideo: "Case-study video",
    caseStudyBody: "A visual NotebookLM summary designed for readers who want a quicker walk through the book's main arguments, chronology, and organizational map.",
    podcast: "NotebookLM podcast",
    podcastBody: "An audio companion for readers who prefer a conversational recap of the investigation while commuting, taking notes, or reviewing the case away from the screen.",
    videoUnsupported: "Your browser does not support the video tag.",
    audioUnsupported: "Your browser does not support the audio element.",
    mindMap: "Mind Map",
    visualOutput: "NotebookLM visual output",
    mindTitle: "Systems overview mind map",
    mindBody: "A visual map of the book's actors, themes, timelines, and structural links for readers who want a faster systems-level view of the investigation.",
    mindNote: "Reader-facing visual companion · PNG",
    downloadPng: "Download PNG",
    support: "Support the work",
    coffee: "Buy me a coffee",
    supportBody: "This investigation is free and independent. No institutional backing, no advertising. If the work is useful, accurate, or simply worth your time — a contribution keeps the desk running and the next investigation open.",
    fullView: "NotebookLM mind map · Full view",
    fullSizePng: "Full Size PNG",
    close: "Close",
  },
  es: {
    overview: "Inicio",
    getTheBook: "Obtén el libro",
    title: "DESCARGA.",
    intro: "El manuscrito completo está disponible gratis en PDF y Markdown, con archivos complementarios de video y audio más abajo. También hay una edición Kindle en Amazon. Si el trabajo te resulta útil, considera apoyarlo.",
    readingUnits: "Unidades de lectura",
    imageReferences: "Referencias de imágenes",
    sources: "Fuentes",
    formats: "Formatos",
    videoCompanions: "Complementos en video",
    audioCompanions: "Complementos en audio",
    mindMaps: "Mapas mentales",
    availableFormats: "Formatos disponibles",
    free: "Gratis",
    paid: "3,40 €",
    download: "Descargar",
    englishSource: "Archivo fuente en inglés",
    edition: "Edición",
    format: "Formato",
    description: "Descripción",
    price: "Precio",
    action: "Acción",
    pdfLabel: "Documento PDF",
    pdfMeta: "Manuscrito completo · Exportación paginada",
    zipLabel: "Archivos fuente en Markdown",
    kindleLabel: "Edición Kindle de Amazon",
    kindleMeta: "Lector electrónico · Notas enlazadas · Navegación por capítulos",
    amazon: "Amazon",
    licenseNote: "PDF y ZIP: CC BY-NC 4.0 — Se pueden compartir y adaptar para usos no comerciales con atribución",
    kindleNote: "Kindle: © Ángel Ortiz · MMXXVI",
    readerIndex: "Índice del lector",
    tableOfContents: "Tabla de contenidos",
    companionMedia: "Material complementario",
    notebookFiles: "Archivos de NotebookLM",
    companionTitle: "Complementos en video y pódcast para lectores",
    companionBody: "Estos archivos complementarios generados con NotebookLM ofrecen formas alternativas de repasar la estructura del caso, los temas y el arco narrativo junto con la investigación escrita.",
    companionNote: "Material complementario para lectores · No es el texto canónico",
    caseStudyVideo: "Video del caso",
    caseStudyBody: "Un resumen visual de NotebookLM para lectores que quieren un recorrido más rápido por los argumentos principales, la cronología y el mapa organizativo del libro.",
    podcast: "Pódcast de NotebookLM",
    podcastBody: "Un complemento en audio para lectores que prefieren una recapitulación conversacional de la investigación mientras se desplazan, toman notas o revisan el caso lejos de la pantalla.",
    videoUnsupported: "Tu navegador no soporta la etiqueta de video.",
    audioUnsupported: "Tu navegador no soporta el elemento de audio.",
    mindMap: "Mapa mental",
    visualOutput: "Salida visual de NotebookLM",
    mindTitle: "Mapa mental de visión sistémica",
    mindBody: "Un mapa visual de actores, temas, cronologías y vínculos estructurales del libro para lectores que desean una visión más rápida del sistema investigado.",
    mindNote: "Complemento visual para lectores · PNG",
    downloadPng: "Descargar PNG",
    support: "Apoya el trabajo",
    coffee: "Invítame a un café",
    supportBody: "Esta investigación es libre e independiente. Sin respaldo institucional ni publicidad. Si el trabajo te resulta útil, riguroso o simplemente valioso, una contribución mantiene abierta la mesa de trabajo y la próxima investigación.",
    fullView: "Mapa mental de NotebookLM · Vista completa",
    fullSizePng: "PNG completo",
    close: "Cerrar",
  },
  fr: {
    overview: "Accueil",
    getTheBook: "Obtenir le livre",
    title: "TÉLÉCHARGER.",
    intro: "Le manuscrit complet est disponible gratuitement en PDF et en Markdown, avec des fichiers compagnons vidéo et audio ci-dessous. Une édition Kindle est aussi disponible sur Amazon. Si ce travail vous est utile, pensez à le soutenir.",
    readingUnits: "Unités de lecture",
    imageReferences: "Références d'images",
    sources: "Sources",
    formats: "Formats",
    videoCompanions: "Compagnons vidéo",
    audioCompanions: "Compagnons audio",
    mindMaps: "Cartes mentales",
    availableFormats: "Formats disponibles",
    free: "Gratuit",
    paid: "Payant",
    download: "Télécharger",
    englishSource: "Archive source anglaise",
    edition: "Édition",
    format: "Format",
    description: "Description",
    price: "Prix",
    action: "Action",
    pdfLabel: "Document PDF",
    pdfMeta: "Manuscrit complet · Export paginé",
    zipLabel: "Fichiers source Markdown",
    kindleLabel: "Édition Kindle Amazon",
    kindleMeta: "Liseuse · Notes liées · Navigation par chapitres",
    amazon: "Amazon",
    licenseNote: "PDF et ZIP : CC BY-NC 4.0 — Partage et adaptation autorisés pour un usage non commercial avec attribution",
    kindleNote: "Kindle : © Ángel Ortiz · MMXXVI",
    readerIndex: "Index du lecteur",
    tableOfContents: "Table des matières",
    companionMedia: "Médias compagnons",
    notebookFiles: "Fichiers NotebookLM",
    companionTitle: "Compagnons vidéo et podcast pour les lecteurs",
    companionBody: "Ces fichiers compagnons générés avec NotebookLM offrent d'autres manières de revoir la structure du dossier, ses thèmes et son arc narratif aux côtés de l'enquête écrite.",
    companionNote: "Média compagnon pour lecteurs · Pas le texte canonique",
    caseStudyVideo: "Vidéo de synthèse",
    caseStudyBody: "Un résumé visuel NotebookLM conçu pour les lecteurs qui veulent un parcours plus rapide à travers les principaux arguments, la chronologie et la carte organisationnelle du livre.",
    podcast: "Podcast NotebookLM",
    podcastBody: "Un compagnon audio pour les lecteurs qui préfèrent une récapitulation conversationnelle de l'enquête pendant leurs déplacements, la prise de notes ou la relecture hors écran.",
    videoUnsupported: "Votre navigateur ne prend pas en charge la balise vidéo.",
    audioUnsupported: "Votre navigateur ne prend pas en charge l'élément audio.",
    mindMap: "Carte mentale",
    visualOutput: "Sortie visuelle NotebookLM",
    mindTitle: "Carte mentale de vue d'ensemble",
    mindBody: "Une carte visuelle des acteurs, thèmes, chronologies et liens structurels du livre pour les lecteurs qui veulent une vue systémique plus rapide de l'enquête.",
    mindNote: "Compagnon visuel pour lecteurs · PNG",
    downloadPng: "Télécharger le PNG",
    support: "Soutenir le travail",
    coffee: "M'offrir un café",
    supportBody: "Cette enquête est libre et indépendante. Aucun soutien institutionnel, aucune publicité. Si ce travail vous est utile, rigoureux ou simplement digne d'intérêt, une contribution permet de maintenir le bureau ouvert et la prochaine enquête en chantier.",
    fullView: "Carte mentale NotebookLM · Vue complète",
    fullSizePng: "PNG en taille réelle",
    close: "Fermer",
  },
  ru: {
    overview: "Главная",
    getTheBook: "Получить книгу",
    title: "СКАЧАТЬ.",
    intro: "Полная рукопись доступна бесплатно в PDF и Markdown, ниже — сопутствующие видео- и аудиофайлы. Издание для Kindle есть на Amazon. Если работа вам полезна, рассмотрите возможность поддержки.",
    readingUnits: "Единицы чтения",
    imageReferences: "Ссылки на изображения",
    sources: "Источники",
    formats: "Форматы",
    videoCompanions: "Видеосопровождение",
    audioCompanions: "Аудиосопровождение",
    mindMaps: "Интеллект-карты",
    availableFormats: "Доступные форматы",
    free: "Бесплатно",
    paid: "Платно",
    download: "Скачать",
    englishSource: "Архив исходников на русском",
    edition: "Издание",
    format: "Формат",
    description: "Описание",
    price: "Цена",
    action: "Действие",
    pdfLabel: "Документ PDF",
    pdfMeta: "Полная рукопись · Постраничный экспорт",
    zipLabel: "Исходные файлы Markdown",
    kindleLabel: "Издание Amazon Kindle",
    kindleMeta: "Электронная книга · Связанные сноски · Навигация по главам",
    amazon: "Amazon",
    licenseNote: "PDF и ZIP: CC BY-NC 4.0 — свободно делиться и адаптировать для некоммерческого использования с указанием авторства",
    kindleNote: "Kindle: © Ángel Ortiz · MMXXVI",
    readerIndex: "Указатель",
    tableOfContents: "Оглавление",
    companionMedia: "Сопутствующие медиа",
    notebookFiles: "Файлы NotebookLM",
    companionTitle: "Видео- и подкаст-сопровождение для читателей",
    companionBody: "Эти сгенерированные NotebookLM сопутствующие файлы предлагают альтернативные способы пройтись по структуре кейса, темам и нарративной арке вместе с письменным расследованием.",
    companionNote: "Сопутствующие медиа для читателя · Не канонический текст",
    caseStudyVideo: "Видео кейса",
    caseStudyBody: "Визуальное резюме NotebookLM для читателей, которым нужен более быстрый обход основных аргументов книги, хронологии и организационной карты.",
    podcast: "Подкаст NotebookLM",
    podcastBody: "Аудио-сопровождение для тех, кто предпочитает разговорное переизложение расследования в дороге, при ведении заметок или вне экрана.",
    videoUnsupported: "Ваш браузер не поддерживает тег видео.",
    audioUnsupported: "Ваш браузер не поддерживает элемент аудио.",
    mindMap: "Интеллект-карта",
    visualOutput: "Визуальный вывод NotebookLM",
    mindTitle: "Системный обзор — интеллект-карта",
    mindBody: "Визуальная карта акторов, тем, хронологий и структурных связей книги для читателей, которым нужен быстрый системный взгляд на расследование.",
    mindNote: "Визуальное сопровождение для читателя · PNG",
    downloadPng: "Скачать PNG",
    support: "Поддержать работу",
    coffee: "Угостите кофе",
    supportBody: "Это расследование — свободное и независимое. Без институциональной поддержки и рекламы. Если работа полезна, точна или просто стоит вашего времени — вклад поддерживает стол открытым, а следующее расследование — в работе.",
    fullView: "Интеллект-карта NotebookLM · Полный вид",
    fullSizePng: "PNG в полном размере",
    close: "Закрыть",
  },
};

export function DownloadPage() {
  const { siteData, locale } = useSite();
  const copy = DOWNLOAD_COPY[locale];
  const [isMindMapOpen, setIsMindMapOpen] = useState(false);
  const edition = siteData.edition?.version?.toUpperCase() ?? "V4.1";

  const PRICE_BADGE_STYLE = { transform: "none", fontSize: 10, minWidth: 58, textAlign: "center" };
  const ACTION_BUTTON_STYLE = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: 132, height: 40, padding: "0 16px", border: "1px solid var(--ink-1)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" };

  useEffect(() => {
    if (!isMindMapOpen) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMindMapOpen(false);
    };

    body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMindMapOpen]);

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div className="page-crumb" style={{ paddingTop: 12, paddingBottom: 12, background: "var(--paper-0)" }}>
        <div className="page-crumb__inner">
          <LocalizedLink to="/" style={{ color: "inherit", textDecoration: "none" }}>{copy.overview}</LocalizedLink>
          <span>›</span>
          <span style={{ color: "var(--ink-0)" }}>{copy.getTheBook}</span>
        </div>
      </div>

      {/* hero */}
      <section className="page-section" style={{ position: "relative", paddingTop: 72, paddingBottom: 56, borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div className="page-section__inner">
          <div className="page-eyebrow-row">
            <div className="eyebrow">{copy.edition} · {edition}</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>{copy.getTheBook}</div>
          </div>
          <div className="page-intro__grid page-intro__grid--auto">
          <div>
            <div className="page-intro__title" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 180px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28 }}>
              {copy.title}
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 680 }}>
              {copy.intro}
            </h2>
          </div>
          {/* hero stats */}
          <div style={{ paddingBottom: 8 }}>
            <div style={{ borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)" }}>
              {[
                [copy.readingUnits, String(siteData.stats.documentCount)],
                [copy.imageReferences, String(siteData.stats.imageCount)],
                [copy.sources, "44"],
                [copy.formats, "03"],
                [copy.videoCompanions, "01"],
                [copy.audioCompanions, "01"],
                [copy.mindMaps, "01"],
                ["License", "CC BY-NC 4.0"],
              ].map(([label, value], i, arr) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, padding: "11px 4px", borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  <span style={{ color: "var(--ink-3)" }}>{label}</span>
                  <span style={{ color: "var(--ink-0)", fontWeight: 700 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* format table */}
      <section className="page-section" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div className="page-section__inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ {copy.availableFormats} ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>3 {copy.formats.toLowerCase()}</span>
          </div>

          {/* table */}
          <div className="download-format-table">

            {/* header */}
            <div className="download-format-head" style={{ padding: "12px 24px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)" }}>
              <span>№</span>
              <span>{copy.format}</span>
              <span>{copy.description}</span>
              <span style={{ textAlign: "center" }}>{copy.price}</span>
              <span style={{ textAlign: "right" }}>{copy.action}</span>
            </div>

            {/* PDF row */}
            <a href={PDF_BY_LOCALE[locale]} download className="download-format-row" style={{ padding: "28px 24px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-0)", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--classified)" }}>01</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, lineHeight: 1, color: "var(--classified)", letterSpacing: "0.02em" }}>PDF</span>
              <div style={{ paddingRight: 32 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17, color: "var(--ink-0)", marginBottom: 5 }}>{copy.pdfLabel}</div>
                <div className="mono" style={{ color: "var(--ink-3)" }}>{copy.pdfMeta} · {edition}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="stamp" style={PRICE_BADGE_STYLE}>{copy.free}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ ...ACTION_BUTTON_STYLE, borderColor: "var(--classified)", color: "var(--classified)" }}>↓ {copy.download}</span>
              </div>
            </a>

            {/* ZIP row */}
            <a href={ZIP_BY_LOCALE[locale]} download className="download-format-row" style={{ padding: "28px 24px", borderBottom: "1px solid var(--paper-edge)", background: "var(--paper-1)", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-2)" }}>02</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, lineHeight: 1, color: "var(--ink-0)", letterSpacing: "0.02em" }}>ZIP</span>
              <div style={{ paddingRight: 32 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17, color: "var(--ink-0)", marginBottom: 5 }}>{copy.zipLabel}</div>
                <div className="mono" style={{ color: "var(--ink-3)" }}>{copy.englishSource} · {siteData.stats.documentCount} .md · {edition}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="stamp" style={PRICE_BADGE_STYLE}>{copy.free}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ ...ACTION_BUTTON_STYLE, color: "var(--ink-1)" }}>↓ {copy.download}</span>
              </div>
            </a>

            {/* Kindle row — dark */}
            <a href="https://www.amazon.com/Espa%C3%B1ola-hooligans-machines-%C3%81ngel-Ortiz-ebook/dp/B0GYWV1BN4/" target="_blank" rel="noopener noreferrer" className="download-format-row" style={{ padding: "28px 24px", background: "var(--dossier-0)", textDecoration: "none", color: "inherit" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--dossier-fg-2)" }}>03</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, lineHeight: 1, color: "var(--dossier-fg-0)", letterSpacing: "0.02em" }}>KINDLE</span>
              <div style={{ paddingRight: 32 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 17, color: "var(--dossier-fg-0)", marginBottom: 5 }}>{copy.kindleLabel}</div>
                <div className="mono" style={{ color: "var(--dossier-fg-2)" }}>{copy.kindleMeta}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <span className="stamp stamp--bone" style={PRICE_BADGE_STYLE}>{copy.paid}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ ...ACTION_BUTTON_STYLE, borderColor: "var(--dossier-fg-1)", color: "var(--dossier-fg-0)" }}>↗ {copy.amazon}</span>
              </div>
            </a>

          </div>

          {/* licence strip */}
          <div className="download-license-row" style={{ padding: "12px 24px", background: "var(--paper-2)", border: "1px solid var(--ink-1)", borderTop: "none", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>
            <span>{copy.licenseNote}</span>
            <span>{copy.kindleNote}</span>
          </div>
        </div>
      </section>

      {/* cover + table of contents */}
      <section className="page-section" style={{ paddingTop: 72, paddingBottom: 80, borderTop: "1px solid var(--paper-edge)" }}>
        <div className="page-section__inner download-toc__grid">
          {/* cover thumbnail */}
          <div className="download-toc__cover">
            <div style={{ border: "1px solid var(--ink-1)", boxShadow: "4px 6px 0 rgba(20,17,13,0.18)", background: "var(--dossier-0)" }}>
              <img src={coverImg} alt="Española cover artwork" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div className="mono" style={{ color: "var(--ink-3)", fontSize: 9, marginTop: 10, textAlign: "center" }}>
              {siteData.edition?.version?.toUpperCase() ?? "V4.1"} · {siteData.stats.documentCount} reading units
            </div>
          </div>
          {/* table of contents inline */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 40 }}>
              <div className="eyebrow">✦ &nbsp; {copy.readerIndex} &nbsp; ✦</div>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 40px" }}>
              {copy.tableOfContents}
            </h2>
            <TocInline />
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="page-section__inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ {copy.companionMedia} ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>{copy.notebookFiles}</span>
          </div>
          <div className="responsive-panel" style={{ border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
            <div style={{ marginBottom: 30, maxWidth: 760 }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 16px" }}>
                {copy.companionTitle}
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 14px" }}>
                {copy.companionBody}
              </p>
              <p className="mono" style={{ color: "var(--ink-3)", margin: 0 }}>
                {copy.companionNote}
              </p>
            </div>
            <div className="download-companion__grid">
              <div style={{ border: "1px solid var(--paper-edge)", background: "var(--paper-0)", padding: 18 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18, color: "var(--ink-0)" }}>{copy.caseStudyVideo}</div>
                  <div className="mono" style={{ color: "var(--ink-3)" }}>MP4</div>
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 16px" }}>
                  {copy.caseStudyBody}
                </p>
                <video controls preload="metadata" poster={NOTEBOOKLM_POSTER_URL} style={{ width: "100%", display: "block", background: "var(--dossier-0)" }}>
                  <source src={NOTEBOOKLM_VIDEO_URL} type="video/mp4" />
                  {copy.videoUnsupported}
                </video>
              </div>
              <div style={{ border: "1px solid var(--paper-edge)", background: "var(--paper-0)", padding: 18 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18, color: "var(--ink-0)" }}>{copy.podcast}</div>
                  <div className="mono" style={{ color: "var(--ink-3)" }}>M4A</div>
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 16px" }}>
                  {copy.podcastBody}
                </p>
                <audio controls preload="metadata" style={{ width: "100%" }}>
                  <source src={NOTEBOOKLM_AUDIO_URL} type="audio/mp4" />
                  {copy.audioUnsupported}
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0, paddingBottom: 72 }}>
        <div className="page-section__inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ {copy.mindMap} ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>{copy.visualOutput}</span>
          </div>
          <div className="responsive-panel" style={{ border: "1px solid var(--ink-1)", background: "var(--paper-1)" }}>
            <div className="download-mindmap__grid">
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink-0)", margin: "0 0 16px" }}>
                  {copy.mindTitle}
                </h2>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 14px", maxWidth: 620 }}>
                  {copy.mindBody}
                </p>
                <p className="mono" style={{ color: "var(--ink-3)", margin: "0 0 24px" }}>
                  {copy.mindNote}
                </p>
                <a href={NOTEBOOKLM_MINDMAP_URL} download style={{ ...ACTION_BUTTON_STYLE, width: 180, borderColor: "var(--ink-1)", color: "var(--ink-0)", textDecoration: "none" }}>
                  ↓ {copy.downloadPng}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setIsMindMapOpen(true)}
                style={{ display: "block", width: "100%", padding: 0, border: "1px solid var(--paper-edge)", background: "var(--paper-0)", cursor: "zoom-in" }}
              >
                <div style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "var(--paper-0)" }}>
                  <img
                    src={NOTEBOOKLM_MINDMAP_URL}
                    alt="NotebookLM mind map preview"
                    style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* support strip */}
      <section className="page-section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="page-section__inner">
          <div className="page-support__grid responsive-panel--support" style={{ border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", background: "var(--paper-1)", position: "relative" }}>
            <span className="tick" style={{ bottom: 14, left: 14 }} aria-hidden="true" />
            <span className="tick" style={{ bottom: 14, right: 14 }} aria-hidden="true" />
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{copy.support}</div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(22px,2.5vw,32px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "0 0 14px" }}>
                {copy.coffee}
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, maxWidth: 640 }}>
                {copy.supportBody}
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <a
                href="https://buymeacoffee.com/angelortiz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 36px", background: "var(--classified)", color: "var(--paper-0)", textDecoration: "none" }}
              >
                <span style={{ fontSize: 28 }}>☕</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>{copy.coffee}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {isMindMapOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="NotebookLM mind map preview"
          onClick={() => setIsMindMapOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(20,17,13,0.88)", padding: 32, display: "grid", placeItems: "center" }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{ width: "min(1280px, calc(100vw - 64px))", maxHeight: "calc(100vh - 64px)", background: "var(--paper-0)", border: "1px solid var(--paper-edge)", padding: 20, boxShadow: "0 24px 72px rgba(0,0,0,0.35)" }}
          >
            <div className="modal-toolbar" style={{ marginBottom: 16 }}>
              <div className="mono" style={{ color: "var(--ink-3)" }}>{copy.fullView}</div>
              <div className="modal-toolbar__actions">
                <a
                  href={NOTEBOOKLM_MINDMAP_URL}
                  download
                  style={{ ...ACTION_BUTTON_STYLE, width: 164, height: 36, padding: "0 12px", background: "var(--paper-0)", color: "var(--ink-0)", textDecoration: "none" }}
                >
                  ↓ {copy.fullSizePng}
                </a>
                <button
                  type="button"
                  onClick={() => setIsMindMapOpen(false)}
                  style={{ ...ACTION_BUTTON_STYLE, width: 92, height: 36, padding: "0 12px", background: "var(--paper-0)", cursor: "pointer" }}
                >
                  {copy.close}
                </button>
              </div>
            </div>
            <div style={{ overflow: "auto", maxHeight: "calc(100vh - 156px)" }}>
              <img src={NOTEBOOKLM_MINDMAP_URL} alt="NotebookLM mind map full image" style={{ width: "100%", height: "auto", display: "block", background: "var(--paper-0)" }} />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
