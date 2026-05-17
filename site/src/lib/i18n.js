import siteDataByLocale from "@generated-manuscripts";

export const SUPPORTED_LOCALES = ["en", "es", "fr", "ru"];
export const DEFAULT_LOCALE = "en";
export const PREFERRED_LOCALE_STORAGE_KEY = "preferred-locale";

export const localeLabels = {
  en: "English",
  es: "Español",
  fr: "Français",
  ru: "Русский",
};

export const globalCopy = {
  en: {
    language: "Language",
    nav: {
      overview: "Overview",
      frontMatter: "Front Matter",
      chapters: "Chapters",
      sources: "Sources",
      codex: "Codex",
      download: "Download",
      contact: "Contact",
    },
    footer: {
      lede: "an open-source investigative web edition built from the canonical manuscript, its source notes, and editorial protocols.",
      backToTop: "Back to Top",
      navigate: "Navigate",
      sourcesCodex: "Sources & Codex",
      author: "Author",
      edition: "Edition",
      startReading: "Start reading",
      authorNote: "Author note",
      sections: "Sections",
      imageReferences: "Image references",
      sourceNotes: "Source notes",
      referenceLinks: "Reference links",
      editorialCodex: "Editorial codex",
      manuscriptEdition: "V4.1 Manuscript",
      publishedEdition: "V1 Published Edition",
      updated: "Updated 27.04.2026",
      creditA: "Human Researched. AI Assisted",
    },
    common: {
      readingUnits: "reading units",
      imageReferences: "image references",
      sources: "sources",
      links: "links",
      items: "items",
      sections: "Section",
      previous: "Previous",
      next: "Next",
      open: "Open",
      all: "All",
      sort: "Sort",
      manuscriptOrder: "Manuscript order",
    },
  },
  es: {
    language: "Idioma",
    nav: {
      overview: "Inicio",
      frontMatter: "Textos preliminares",
      chapters: "Capítulos",
      sources: "Fuentes",
      codex: "Codex",
      download: "Descargas",
      contact: "Contacto",
    },
    footer: {
      lede: "una edición web de investigación en fuentes abiertas construida a partir del manuscrito canónico, sus notas de fuentes y sus protocolos editoriales.",
      backToTop: "Volver arriba",
      navigate: "Navegación",
      sourcesCodex: "Fuentes y Codex",
      author: "Autor",
      edition: "Edición",
      startReading: "Empezar a leer",
      authorNote: "Nota del autor",
      sections: "Secciones",
      imageReferences: "Referencias de imágenes",
      sourceNotes: "Notas de fuentes",
      referenceLinks: "Enlaces de referencia",
      editorialCodex: "Codex editorial",
      manuscriptEdition: "Manuscrito V4.1",
      publishedEdition: "Edición publicada V1",
      updated: "Actualizado el 27.04.2026",
      creditA: "Investigación humana. Asistencia de IA",
    },
    common: {
      readingUnits: "unidades de lectura",
      imageReferences: "referencias de imágenes",
      sources: "fuentes",
      links: "enlaces",
      items: "elementos",
      sections: "Sección",
      previous: "Anterior",
      next: "Siguiente",
      open: "Abrir",
      all: "Todo",
      sort: "Orden",
      manuscriptOrder: "Orden del manuscrito",
    },
  },
  fr: {
    language: "Langue",
    nav: {
      overview: "Accueil",
      frontMatter: "Textes liminaires",
      chapters: "Chapitres",
      sources: "Sources",
      codex: "Codex",
      download: "Téléchargement",
      contact: "Contact",
    },
    footer: {
      lede: "une édition web d'enquête en sources ouvertes bâtie à partir du manuscrit canonique, de ses notes de sources et de ses protocoles éditoriaux.",
      backToTop: "Haut de page",
      navigate: "Navigation",
      sourcesCodex: "Sources et Codex",
      author: "Auteur",
      edition: "Édition",
      startReading: "Commencer la lecture",
      authorNote: "Note de l'auteur",
      sections: "Sections",
      imageReferences: "Références d'images",
      sourceNotes: "Notes de sources",
      referenceLinks: "Liens de référence",
      editorialCodex: "Codex éditorial",
      manuscriptEdition: "Manuscrit V4.1",
      publishedEdition: "Édition publiée V1",
      updated: "Mis à jour le 27.04.2026",
      creditA: "Recherche humaine. Assistance IA",
    },
    common: {
      readingUnits: "unités de lecture",
      imageReferences: "références d'images",
      sources: "sources",
      links: "liens",
      items: "éléments",
      sections: "Section",
      previous: "Précédent",
      next: "Suivant",
      open: "Ouvrir",
      all: "Tout",
      sort: "Tri",
      manuscriptOrder: "Ordre du manuscrit",
    },
  },
  ru: {
    language: "Язык",
    nav: {
      overview: "Главная",
      frontMatter: "Предварительные тексты",
      chapters: "Главы",
      sources: "Источники",
      codex: "Кодекс",
      download: "Скачать",
      contact: "Контакт",
    },
    footer: {
      lede: "веб-издание журналистского расследования на открытых источниках, построенное из канонической рукописи, её заметок об источниках и редакционных протоколов.",
      backToTop: "Наверх",
      navigate: "Навигация",
      sourcesCodex: "Источники и Кодекс",
      author: "Автор",
      edition: "Издание",
      startReading: "Начать чтение",
      authorNote: "От автора",
      sections: "Разделы",
      imageReferences: "Ссылки на изображения",
      sourceNotes: "Заметки об источниках",
      referenceLinks: "Справочные ссылки",
      editorialCodex: "Редакционный кодекс",
      manuscriptEdition: "Рукопись V4.1",
      publishedEdition: "Опубликованное издание V1",
      updated: "Обновлено 27.04.2026",
      creditA: "Человеческое исследование. Ассистирование ИИ",
    },
    common: {
      readingUnits: "единицы чтения",
      imageReferences: "ссылки на изображения",
      sources: "источники",
      links: "ссылки",
      items: "элементы",
      sections: "Раздел",
      previous: "Назад",
      next: "Далее",
      open: "Открыть",
      all: "Все",
      sort: "Сортировка",
      manuscriptOrder: "Порядок рукописи",
    },
  },
};

export function normalizeLocale(value) {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase().split("-")[0];
  return SUPPORTED_LOCALES.includes(normalized) ? normalized : null;
}

export function getStoredPreferredLocale() {
  try {
    return normalizeLocale(window.localStorage.getItem(PREFERRED_LOCALE_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function setStoredPreferredLocale(locale) {
  const normalized = normalizeLocale(locale);
  if (!normalized) return;
  try {
    window.localStorage.setItem(PREFERRED_LOCALE_STORAGE_KEY, normalized);
  } catch {
    // noop
  }
}

export function detectPreferredLocale() {
  const stored = getStoredPreferredLocale();
  if (stored) return stored;

  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const candidates = [...(navigator.languages ?? []), navigator.language, navigator.userLanguage].filter(Boolean);
  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);
    if (normalized) return normalized;
  }
  return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname = "/") {
  const parts = pathname.split("/");
  const maybeLocale = normalizeLocale(parts[1]);
  if (!maybeLocale) return pathname || "/";
  const rest = `/${parts.slice(2).join("/")}`.replace(/\/+/g, "/");
  return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
}

export function buildLocalePath(locale, to = "/") {
  const normalized = normalizeLocale(locale) ?? DEFAULT_LOCALE;
  if (!to) return `/${normalized}`;
  if (typeof to !== "string") return to;
  if (/^(https?:)?\/\//.test(to) || to.startsWith("mailto:") || to.startsWith("tel:")) return to;

  const [pathAndQuery, hash = ""] = to.split("#");
  const [rawPath, query = ""] = pathAndQuery.split("?");
  const path = rawPath ? rawPath : "/";
  const withoutLocale = stripLocalePrefix(path.startsWith("/") ? path : `/${path}`);
  const withLocale = withoutLocale === "/" ? `/${normalized}` : `/${normalized}${withoutLocale}`;
  const queryPart = query ? `?${query}` : "";
  const hashPart = hash ? `#${hash}` : "";
  return `${withLocale}${queryPart}${hashPart}`;
}

export function buildLocaleSwitchPath(currentLocale, targetLocale, pathname, search = "", hash = "") {
  const normalizedTarget = normalizeLocale(targetLocale) ?? DEFAULT_LOCALE;
  const barePath = stripLocalePrefix(pathname);

  if (barePath.startsWith("/read/")) {
    const slug = decodeURIComponent(barePath.slice("/read/".length));
    const currentDoc = siteDataByLocale[currentLocale]?.documents.find((document) => document.slug === slug);
    const targetDoc = currentDoc
      ? siteDataByLocale[normalizedTarget]?.documents.find((document) => document.id === currentDoc.id)
      : null;
    if (targetDoc) {
      return `${buildLocalePath(normalizedTarget, `/read/${targetDoc.slug}`)}${search}${hash}`;
    }
  }

  return `${buildLocalePath(normalizedTarget, barePath)}${search}${hash}`;
}
