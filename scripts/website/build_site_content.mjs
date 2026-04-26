import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE_DIR = path.join(ROOT_DIR, "site");
const BUILD_SITE_DIR = path.join(ROOT_DIR, "build", "site");
const GENERATED_MODULE = path.join(BUILD_SITE_DIR, "generated-manuscript.js");
const GENERATED_PUBLIC_DIR = path.join(BUILD_SITE_DIR, "public");
const GENERATED_PICTURES_DIR = path.join(GENERATED_PUBLIC_DIR, "pictures");

const version = process.env.BOOK_VERSION ?? "v4.1";
const language = process.env.BOOK_LANGUAGE ?? "en";
const CONTENT_DIR = path.join(ROOT_DIR, "manuscripts", version, language, "contents");
const MANIFEST_PATH = path.join(ROOT_DIR, "assets", "manifests", version, language, "chapter_images.json");
const IMAGE_ROOT = path.join(ROOT_DIR, "assets", "images", "manuscripts", version, language);
const DESIGN_SYSTEM_DIR = path.join(ROOT_DIR, "design_system");

const TITLE_FILE = "Front Matter 00 Title and Edition.md";
const BODY_FILES = [
  "Front Matter 01 Author Note.md",
  "Front Matter 02 Methodology and Limitations.md",
  "Front Matter 03 Note on AI Assistance.md",
  "Front Matter 04 Note on Naming and Terminology.md",
  "Prologue.md",
  "Chapter 01.md",
  "Chapter 02.md",
  "Chapter 03.md",
  "Chapter 04.md",
  "Chapter 05.md",
  "Chapter 06.md",
  "Chapter 07.md",
  "Chapter 08.md",
  "Chapter 09.md",
  "Chapter 10.md",
  "Chapter 11.md",
  "Chapter 12.md",
  "Chapter 13.md",
  "Chapter 14.md",
  "Chapter 15.md",
  "Chapter 16.md",
  "Chapter 17.md",
  "Chapter 18.md",
  "Epilogue.md",
  "Appendix Source Notes.md",
  "Appendix Reference Links Guide.md",
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function resetDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  ensureDir(dirPath);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function splitTitleAndBlocks(text) {
  const lines = text.split("\n").map((line) => line.replace(/\s+$/, ""));
  let index = 0;

  while (index < lines.length && !lines[index].trim()) {
    index += 1;
  }

  if (index >= lines.length) {
    throw new Error("Source file is empty.");
  }

  const title = cleanMarkdownLine(lines[index]);
  const blocks = [];
  let current = [];

  for (const line of lines.slice(index + 1)) {
    if (line.trim() === "---") {
      if (current.length) {
        blocks.push(current);
        current = [];
      }
      continue;
    }

    if (line.trim()) {
      current.push(line);
      continue;
    }

    if (current.length) {
      blocks.push(current);
      current = [];
    }
  }

  if (current.length) {
    blocks.push(current);
  }

  return { title, blocks };
}

function titleLines(text) {
  return text
    .split("\n")
    .map(cleanMarkdownLine)
    .filter((line) => line && line !== "---");
}

function cleanMarkdownLine(line) {
  return line
    .trim()
    .replace(/^#{1,6}\s+/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

function isUrl(line) {
  const stripped = line.trim();
  return stripped.startsWith("http://") || stripped.startsWith("https://");
}

function looksLikeSubheading(block) {
  if (block.length !== 1) {
    return false;
  }

  const line = block[0].trim();
  if (!line || isUrl(line)) {
    return false;
  }
  if (/^#{2,6}\s+/.test(line)) {
    return true;
  }
  if (/^\[\^[^\]]+\]:/.test(line)) {
    return false;
  }
  if (/[.!?;:]$/.test(line)) {
    return false;
  }
  return line.split(/\s+/).length <= 10;
}

function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseParagraphBlock(blocks, block) {
  if (block.every((line) => line.trim().startsWith("- "))) {
    blocks.push({
      type: "list",
      items: block.map((line) => cleanMarkdownLine(line).replace(/^- /, "")),
    });
    return;
  }

  if (block.every(isUrl)) {
    blocks.push({
      type: "links",
      items: block.map((line) => ({ label: line.trim(), url: line.trim() })),
    });
    return;
  }

  if (block.some(isUrl)) {
    let paragraphLines = [];
    const links = [];

    for (const line of block) {
      if (isUrl(line)) {
        if (paragraphLines.length) {
          blocks.push({ type: "paragraph", lines: paragraphLines });
          paragraphLines = [];
        }
        links.push({ label: line.trim(), url: line.trim() });
        continue;
      }
      paragraphLines.push(line);
    }

    if (paragraphLines.length) {
      blocks.push({ type: "paragraph", lines: paragraphLines });
    }
    if (links.length) {
      blocks.push({ type: "links", items: links });
    }
    return;
  }

  blocks.push({
    type: "paragraph",
    lines: block.map(cleanMarkdownLine),
  });
}

function parseBlocks(rawBlocks) {
  const blocks = [];

  for (const block of rawBlocks) {
    if (looksLikeSubheading(block)) {
      blocks.push({ type: "subheading", text: cleanMarkdownLine(block[0]) });
      continue;
    }
    parseParagraphBlock(blocks, block);
  }

  return blocks;
}

function copyFile(source, destination) {
  ensureDir(path.dirname(destination));
  fs.copyFileSync(source, destination);
}

function loadImages() {
  const manifest = JSON.parse(readText(MANIFEST_PATH));
  const grouped = new Map();

  for (const entry of manifest) {
    const image = {
      ...entry,
      publicPath: `/${entry.relative_path.replace(/\\/g, "/")}`,
    };
    if (!grouped.has(entry.chapter_file)) {
      grouped.set(entry.chapter_file, []);
    }
    grouped.get(entry.chapter_file).push(image);
  }

  for (const images of grouped.values()) {
    images.sort((a, b) => a.relative_path.localeCompare(b.relative_path));
  }

  return grouped;
}

function copyGeneratedPublicAssets() {
  resetDir(GENERATED_PUBLIC_DIR);
  const manifest = JSON.parse(readText(MANIFEST_PATH));
  fs.cpSync(path.join(DESIGN_SYSTEM_DIR, "assets", "marks"), path.join(GENERATED_PUBLIC_DIR, "marks"), { recursive: true });
  copyFile(path.join(DESIGN_SYSTEM_DIR, "colors_and_type.css"), path.join(GENERATED_PUBLIC_DIR, "design-system", "colors_and_type.css"));
  copyFile(path.join(DESIGN_SYSTEM_DIR, "assets", "cover-hero.png"), path.join(GENERATED_PUBLIC_DIR, "design-system", "cover-hero.png"));
  copyFile(path.join(DESIGN_SYSTEM_DIR, "assets", "paper-noise.svg"), path.join(GENERATED_PUBLIC_DIR, "design-system", "paper-noise.svg"));
  for (const entry of manifest) {
    copyFile(path.join(IMAGE_ROOT, entry.relative_path), path.join(GENERATED_PUBLIC_DIR, entry.relative_path));
  }
}

function inferKind(fileName) {
  if (fileName.startsWith("Front Matter")) {
    return "front-matter";
  }
  if (fileName.startsWith("Appendix")) {
    return "appendix";
  }
  return "chapter";
}

function inferSectionTitle(fileName) {
  if (fileName.startsWith("Front Matter")) {
    return "Front Matter";
  }
  if (fileName.startsWith("Appendix")) {
    return "Appendices";
  }
  if (fileName.includes("Prologue")) {
    return "Prologue";
  }
  if (fileName.includes("Epilogue")) {
    return "Epilogue";
  }
  return "Chapters";
}

function readingMinutes(blocks) {
  let wordCount = 0;

  for (const block of blocks) {
    if (block.type === "paragraph") {
      wordCount += block.lines.join(" ").split(/\s+/).filter(Boolean).length;
    }
    if (block.type === "list") {
      wordCount += block.items.join(" ").split(/\s+/).filter(Boolean).length;
    }
  }

  return Math.max(1, Math.round(wordCount / 220));
}

function firstParagraph(blocks) {
  const found = blocks.find((block) => block.type === "paragraph");
  return found ? found.lines.join(" ") : "";
}

function buildDocuments() {
  const imagesByFile = loadImages();

  return BODY_FILES.map((fileName, index) => {
    const filePath = path.join(CONTENT_DIR, fileName);
    const { title, blocks: rawBlocks } = splitTitleAndBlocks(readText(filePath));
    const blocks = parseBlocks(rawBlocks);

    return {
      id: fileName,
      fileName,
      order: index + 1,
      kind: inferKind(fileName),
      sectionTitle: inferSectionTitle(fileName),
      title,
      slug: slugify(title),
      excerpt: firstParagraph(blocks).slice(0, 220),
      readingMinutes: readingMinutes(blocks),
      blocks,
      images: imagesByFile.get(fileName) ?? [],
    };
  });
}

function buildSiteData() {
  const documents = buildDocuments();
  const titlePage = titleLines(readText(path.join(CONTENT_DIR, TITLE_FILE)));

  const groups = [
    { key: "front-matter", title: "Front Matter", documents: documents.filter((doc) => doc.kind === "front-matter") },
    {
      key: "chapters",
      title: "Narrative",
      documents: documents.filter((doc) => doc.kind === "chapter" && !doc.title.toLowerCase().startsWith("epilogue")),
    },
    {
      key: "appendices",
      title: "Appendices",
      documents: documents.filter((doc) => doc.kind === "appendix"),
    },
  ];

  return {
    titlePage: {
      title: titlePage[0] ?? "From Hooligans to War Machines",
      lines: titlePage.slice(1),
    },
    documents,
    groups,
    stats: {
      documentCount: documents.length,
      chapterCount: documents.filter((doc) => doc.kind === "chapter").length,
      imageCount: documents.reduce((sum, doc) => sum + doc.images.length, 0),
    },
    edition: {
      version,
      language,
    },
  };
}

function main() {
  ensureDir(BUILD_SITE_DIR);
  copyGeneratedPublicAssets();
  const siteData = buildSiteData();
  fs.writeFileSync(
    GENERATED_MODULE,
    `export const siteData = ${JSON.stringify(siteData, null, 2)};\n\nexport default siteData;\n`,
    "utf8",
  );
  console.log(`Wrote site data to ${GENERATED_MODULE}`);
}

main();
