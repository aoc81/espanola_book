export function getChapterProgress(slug) {
  try { return Number(localStorage.getItem(`progress:${slug}`) || "0"); } catch { return 0; }
}

export function saveChapterProgress(slug, pct) {
  try { localStorage.setItem(`progress:${slug}`, String(Math.max(0, Math.min(100, pct)))); } catch { /* noop */ }
}
