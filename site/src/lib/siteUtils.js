export function chapterTitle(title) {
  return title
    .replace(/^(Chapter|Cap[ií]tulo|Chapitre)\s*\d+\s*[—–-]+\s*/i, "")
    .replace(/^(Prologue|Pr[oó]logo)\s*[—–-]+\s*/i, "")
    .replace(/^(Epilogue|Ep[ií]logo|[ÉE]pilogue)\s*[—–-]+\s*/i, "");
}

export function groupBySection(documents) {
  return documents.reduce((groups, document) => {
    const key = document.sectionTitle;
    if (!groups[key]) groups[key] = [];
    groups[key].push(document);
    return groups;
  }, {});
}

export function displayLicenseLabel(license) {
  if (!license) return "—";
  if (license.toLowerCase().startsWith("non-free")) return "Source-credited";
  return license;
}
