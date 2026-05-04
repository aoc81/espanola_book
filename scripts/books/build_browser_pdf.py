from __future__ import annotations

import argparse
import html
import re
import subprocess
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
TITLE_FILE = "Front Matter 00 Title and Edition.md"
BODY_FILES = [
    "Front Matter 01 Author Note.md",
    "Front Matter 03 Note on AI Assistance.md",
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
    "Front Matter 02 Methodology and Limitations.md",
    "Front Matter 04 Note on Naming and Terminology.md",
    "Appendix Source Notes.md",
    "Appendix Reference Links Guide.md",
]
DEFAULT_CHROME_PATHS = [
    Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\EdgeCore\147.0.3912.98\msedge.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\EdgeWebView\Application\147.0.3912.98\msedge.exe"),
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n")


def strip_heading(line: str) -> str:
    stripped = line.strip()
    return stripped.lstrip("#").strip() if stripped.startswith("#") else stripped


def inline_markdown(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)
    escaped = re.sub(
        r"\[([^\]]+)\]\((https?://[^)]+)\)",
        r'<a href="\2">\1</a>',
        escaped,
    )
    escaped = re.sub(
        r"(https?://[^\s<]+)",
        r'<a href="\1">\1</a>',
        escaped,
    )
    return escaped


def markdown_file_to_html(path: Path) -> str:
    lines = [line.rstrip() for line in read_text(path).split("\n")]
    while lines and not lines[0].strip():
        lines.pop(0)
    if not lines:
        return ""

    title = strip_heading(lines[0])
    body: list[str] = [f"<section class=\"chapter\"><h1>{html.escape(title)}</h1>"]
    paragraph: list[str] = []
    list_items: list[str] = []
    table_rows: list[list[str]] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            body.append(f"<p>{inline_markdown(' '.join(paragraph))}</p>")
            paragraph = []

    def flush_list() -> None:
        nonlocal list_items
        if list_items:
            items = "".join(f"<li>{inline_markdown(item)}</li>" for item in list_items)
            body.append(f"<ul>{items}</ul>")
            list_items = []

    def flush_table() -> None:
        nonlocal table_rows
        if not table_rows:
            return
        rows = table_rows
        table_rows = []
        if len(rows) >= 2 and all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in rows[1]):
            head = "".join(f"<th>{inline_markdown(cell)}</th>" for cell in rows[0])
            body_rows = rows[2:]
            body.append("<table><thead><tr>" + head + "</tr></thead><tbody>")
            for row in body_rows:
                body.append("<tr>" + "".join(f"<td>{inline_markdown(cell)}</td>" for cell in row) + "</tr>")
            body.append("</tbody></table>")
        else:
            for row in rows:
                body.append(f"<p>{inline_markdown(' | '.join(row))}</p>")

    def flush_all() -> None:
        flush_table()
        flush_list()
        flush_paragraph()

    for raw in lines[1:]:
        stripped = raw.strip()
        footnote = re.match(r"^\[\^([^\]]+)\]:\s*(.*)$", stripped)
        if footnote:
            flush_all()
            body.append(f"<p class=\"source-note\"><sup>{html.escape(footnote.group(1))}</sup> {inline_markdown(footnote.group(2))}</p>")
            continue
        if not stripped:
            flush_all()
            continue
        if stripped == "---":
            flush_all()
            body.append("<hr>")
            continue
        if stripped.startswith("## "):
            flush_all()
            body.append(f"<h2>{html.escape(strip_heading(stripped))}</h2>")
            continue
        if stripped.startswith("- "):
            flush_table()
            flush_paragraph()
            list_items.append(stripped[2:].strip())
            continue
        if stripped.startswith("|") and stripped.endswith("|"):
            flush_list()
            flush_paragraph()
            table_rows.append([cell.strip() for cell in stripped[1:-1].split("|")])
            continue
        flush_table()
        flush_list()
        paragraph.append(stripped)

    flush_all()
    body.append("</section>")
    return "\n".join(body)


def build_html(version: str, language: str, html_path: Path) -> None:
    contents_dir = REPO_ROOT / "manuscripts" / version / language / "contents"
    title_lines = [strip_heading(line) for line in read_text(contents_dir / TITLE_FILE).split("\n") if line.strip()]
    cover_path = REPO_ROOT / "assets" / "images" / "covers" / "Espanola Book Cover-New.png"
    title = title_lines[0] if title_lines else "Book"
    subtitle = " ".join(title_lines[1:])
    sections = "\n".join(markdown_file_to_html(contents_dir / filename) for filename in BODY_FILES)

    html_path.parent.mkdir(parents=True, exist_ok=True)
    html_path.write_text(
        f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{html.escape(title)}</title>
  <style>
    @page {{ size: A4; margin: 23mm 22mm 24mm; }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      color: #1c1a16;
      background: #fff;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 11.6pt;
      line-height: 1.45;
    }}
    a {{ color: #7a2418; text-decoration: none; overflow-wrap: anywhere; }}
    .cover {{
      break-after: page;
      height: 100vh;
      display: grid;
      place-items: center;
      text-align: center;
    }}
    .cover img {{
      max-width: 72%;
      max-height: 78vh;
      margin: 0 auto 24pt;
      border: 0.5pt solid #1c1a16;
    }}
    .cover h1 {{
      margin: 0 0 8pt;
      font-size: 24pt;
      line-height: 1.1;
      letter-spacing: 0;
    }}
    .cover p {{
      margin: 0;
      font-size: 12pt;
      font-style: italic;
      color: #5d5549;
    }}
    .chapter {{ break-before: page; }}
    .chapter:first-of-type {{ break-before: auto; }}
    h1 {{
      margin: 0 0 18pt;
      font-size: 20pt;
      line-height: 1.15;
      page-break-after: avoid;
    }}
    h2 {{
      margin: 20pt 0 8pt;
      font-size: 13pt;
      line-height: 1.25;
      page-break-after: avoid;
    }}
    p {{ margin: 0 0 9pt; text-align: justify; }}
    ul {{ margin: 0 0 10pt 18pt; padding: 0; }}
    li {{ margin: 0 0 5pt; }}
    hr {{ border: 0; border-top: 0.5pt solid #aaa; margin: 14pt 0; }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0 14pt;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }}
    th, td {{ border: 0.5pt solid #b8b1a4; padding: 5pt 6pt; vertical-align: top; }}
    th {{ background: #eee9df; text-align: left; }}
    .source-note {{
      font-size: 8.8pt;
      line-height: 1.35;
      text-align: left;
      color: #4f493f;
    }}
  </style>
</head>
<body>
  <section class="cover">
    <div>
      <img src="{cover_path.as_uri()}" alt="">
      <h1>{html.escape(title)}</h1>
      <p>{html.escape(subtitle)}</p>
    </div>
  </section>
  {sections}
</body>
</html>
""",
        encoding="utf-8",
    )


def find_browser(explicit: str | None) -> Path:
    candidates = [Path(explicit)] if explicit else []
    candidates.extend(DEFAULT_CHROME_PATHS)
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("No Chrome or Edge executable found for browser PDF export.")


def build_pdf(version: str, language: str, output_path: Path, browser_path: str | None) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    html_path = REPO_ROOT / "build" / "pdf" / f"book-{version}-{language}.html"
    profile_path = REPO_ROOT / "build" / "pdf" / "chrome-profile"
    profile_path.mkdir(parents=True, exist_ok=True)
    build_html(version, language, html_path)
    browser = find_browser(browser_path)
    subprocess.run(
        [
            str(browser),
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            f"--user-data-dir={profile_path}",
            f"--print-to-pdf={output_path}",
            "--print-to-pdf-no-header",
            html_path.as_uri(),
        ],
        check=True,
    )
    print(output_path)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a browser-rendered PDF from canonical manuscript markdown.")
    parser.add_argument("--version", default="v4.1")
    parser.add_argument("--language", default="en")
    parser.add_argument("--output", required=True)
    parser.add_argument("--browser", help="Optional Chrome/Edge executable path.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output_path = Path(args.output)
    if not output_path.is_absolute():
        output_path = (REPO_ROOT / output_path).resolve()
    build_pdf(args.version, args.language, output_path, args.browser)


if __name__ == "__main__":
    main()
