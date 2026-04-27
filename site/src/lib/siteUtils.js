export function chapterTitle(title) {
  return title.replace(/^(Chapter|Prologue|Epilogue)\s*\d*\s*[—–-]+\s*/i, "");
}

export function groupBySection(documents) {
  return documents.reduce((groups, document) => {
    const key = document.sectionTitle;
    if (!groups[key]) groups[key] = [];
    groups[key].push(document);
    return groups;
  }, {});
}
