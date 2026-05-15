function progressKey(locale, documentId) {
  return `progress:${locale}:${documentId}`;
}

function lastReadKey(locale) {
  return `last-read:${locale}`;
}

export function getChapterProgress(locale, documentId) {
  try { return Number(localStorage.getItem(progressKey(locale, documentId)) || "0"); } catch { return 0; }
}

export function saveChapterProgress(locale, documentId, pct) {
  try { localStorage.setItem(progressKey(locale, documentId), String(Math.max(0, Math.min(100, pct)))); } catch { /* noop */ }
}

export function getLastReadDocumentId(locale) {
  try { return localStorage.getItem(lastReadKey(locale)) || ""; } catch { return ""; }
}

export function saveLastReadDocumentId(locale, documentId) {
  try { localStorage.setItem(lastReadKey(locale), documentId); } catch { /* noop */ }
}
