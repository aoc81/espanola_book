from __future__ import annotations

import argparse
import math
import re
import textwrap
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

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
LEFT_MARGIN = 54
RIGHT_MARGIN = 54
TOP_MARGIN = 54
BOTTOM_MARGIN = 54
BODY_FONT_SIZE = 11
HEADING_FONT_SIZE = 16
SUBHEADING_FONT_SIZE = 12
LINE_HEIGHT = 14
BODY_CHARS = 92
INDENT_CHARS = 4
TITLE_CHAR_WIDTH = 10.5
BODY_CHAR_WIDTH = 5.4
SUBHEADING_CHAR_WIDTH = 6.6

FOOTNOTE_RE = re.compile(r"^\[\^([^\]]+)\]:\s*(.*)$")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n")


def strip_heading(line: str) -> str:
    stripped = line.strip()
    if stripped.startswith("#"):
        return stripped.lstrip("#").strip()
    return stripped


def normalize_inline_markdown(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1 (\2)", text)
    text = re.sub(r"[*`_]+", "", text)
    return text.strip()


def escape_pdf_text(text: str) -> str:
    text = text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
    return "".join(ch if 32 <= ord(ch) <= 126 else "?" for ch in text)


def add_wrapped_lines(lines: list[tuple[str, float]], text: str, *, width: int = BODY_CHARS, indent: str = "", font: str = "body") -> None:
    cleaned = normalize_inline_markdown(text)
    if not cleaned:
        lines.append(("", 1.0))
        return
    wrapped = textwrap.wrap(
        cleaned,
        width=width,
        initial_indent=indent,
        subsequent_indent=indent,
        break_long_words=False,
        break_on_hyphens=False,
    )
    if not wrapped:
        wrapped = [indent.rstrip()]
    for line in wrapped:
        lines.append((line, font))


def markdown_to_lines(text: str) -> list[tuple[str, str]]:
    raw_lines = text.split("\n")
    while raw_lines and not raw_lines[0].strip():
        raw_lines.pop(0)
    if not raw_lines:
        return []

    lines: list[tuple[str, str]] = []
    title = strip_heading(raw_lines[0])
    lines.append((title, "heading"))
    lines.append(("", "body"))

    for raw in raw_lines[1:]:
        footnote_match = FOOTNOTE_RE.match(raw)
        if footnote_match:
            add_wrapped_lines(lines, f"[{footnote_match.group(1)}] {footnote_match.group(2)}", width=BODY_CHARS - 4)
            continue

        stripped = raw.strip()
        if not stripped:
            lines.append(("", "body"))
            continue
        if stripped == "---":
            lines.append(("-" * 48, "body"))
            continue
        if stripped.startswith("## "):
            lines.append((strip_heading(stripped), "subheading"))
            continue
        if stripped.startswith("- "):
            add_wrapped_lines(lines, stripped[2:].strip(), width=BODY_CHARS - INDENT_CHARS, indent="* ")
            continue
        if stripped.startswith("|") and stripped.endswith("|"):
            cells = [normalize_inline_markdown(cell) for cell in stripped[1:-1].split("|")]
            add_wrapped_lines(lines, " | ".join(cells), width=BODY_CHARS)
            continue
        add_wrapped_lines(lines, stripped, width=BODY_CHARS)

    return lines


def build_title_page(title_text: str) -> list[tuple[str, str]]:
    page_lines: list[tuple[str, str]] = []
    for _ in range(12):
        page_lines.append(("", "body"))
    title_lines = [strip_heading(line) for line in title_text.split("\n") if line.strip()]
    if title_lines:
        page_lines.append((title_lines[0], "title"))
        page_lines.append(("", "body"))
        for line in title_lines[1:]:
            page_lines.append((normalize_inline_markdown(line), "subheading"))
    return page_lines


def paginate(lines: list[tuple[str, str]]) -> list[list[tuple[str, str]]]:
    usable_height = PAGE_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN
    max_lines = max(1, math.floor(usable_height / LINE_HEIGHT))
    pages: list[list[tuple[str, str]]] = []
    current: list[tuple[str, str]] = []

    for line in lines:
        if len(current) >= max_lines:
            pages.append(current)
            current = []
        current.append(line)

    if current:
        pages.append(current)

    return pages


def font_for(kind: str) -> tuple[str, int, float]:
    if kind == "title":
        return ("F2", 22, TITLE_CHAR_WIDTH)
    if kind == "heading":
        return ("F2", HEADING_FONT_SIZE, TITLE_CHAR_WIDTH * 0.8)
    if kind == "subheading":
        return ("F2", SUBHEADING_FONT_SIZE, SUBHEADING_CHAR_WIDTH)
    return ("F1", BODY_FONT_SIZE, BODY_CHAR_WIDTH)


def render_page_stream(page_lines: list[tuple[str, str]], page_number: int, page_count: int) -> str:
    commands = ["BT", f"1 0 0 1 {LEFT_MARGIN} {PAGE_HEIGHT - TOP_MARGIN} Tm"]
    current_font = None

    for idx, (text, kind) in enumerate(page_lines):
        font_name, font_size, char_width = font_for(kind)
        if current_font != (font_name, font_size):
            commands.append(f"/{font_name} {font_size} Tf")
            current_font = (font_name, font_size)

        if kind == "title":
            width = len(text) * char_width
            x = max(LEFT_MARGIN, (PAGE_WIDTH - width) / 2)
            y = PAGE_HEIGHT - TOP_MARGIN - (idx * LINE_HEIGHT)
            commands.append(f"1 0 0 1 {x:.2f} {y:.2f} Tm")
            commands.append(f"({escape_pdf_text(text)}) Tj")
            next_y = y - LINE_HEIGHT
            commands.append(f"1 0 0 1 {LEFT_MARGIN} {next_y:.2f} Tm")
            continue

        if kind == "subheading":
            x = LEFT_MARGIN
            y = PAGE_HEIGHT - TOP_MARGIN - (idx * LINE_HEIGHT)
            commands.append(f"1 0 0 1 {x:.2f} {y:.2f} Tm")
            commands.append(f"({escape_pdf_text(text)}) Tj")
            next_y = y - LINE_HEIGHT
            commands.append(f"1 0 0 1 {LEFT_MARGIN} {next_y:.2f} Tm")
            continue

        commands.append(f"({escape_pdf_text(text)}) Tj")
        if idx != len(page_lines) - 1:
            commands.append(f"0 -{LINE_HEIGHT} Td")

    commands.extend(
        [
            f"/F1 9 Tf",
            f"1 0 0 1 {PAGE_WIDTH - RIGHT_MARGIN - 40} {BOTTOM_MARGIN - 18} Tm",
            f"({page_number}/{page_count}) Tj",
            "ET",
        ]
    )
    return "\n".join(commands)


class PdfBuilder:
    def __init__(self) -> None:
        self.objects: list[bytes] = []

    def add_object(self, data: str | bytes) -> int:
        if isinstance(data, str):
            data = data.encode("latin-1", errors="replace")
        self.objects.append(data)
        return len(self.objects)

    def build(self, output_path: Path, pages: list[str]) -> None:
        font1 = self.add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>")
        font2 = self.add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

        content_ids: list[int] = []
        page_ids: list[int] = []

        for stream in pages:
            encoded = stream.encode("latin-1", errors="replace")
            content_ids.append(
                self.add_object(
                    b"<< /Length " + str(len(encoded)).encode("ascii") + b" >>\nstream\n" + encoded + b"\nendstream"
                )
            )
            page_ids.append(0)

        pages_id = len(self.objects) + 1
        for idx, content_id in enumerate(content_ids):
            page_ids[idx] = self.add_object(
                f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] "
                f"/Resources << /Font << /F1 {font1} 0 R /F2 {font2} 0 R >> >> /Contents {content_id} 0 R >>"
            )

        kids = " ".join(f"{page_id} 0 R" for page_id in page_ids)
        self.add_object(f"<< /Type /Pages /Count {len(page_ids)} /Kids [{kids}] >>")
        catalog_id = self.add_object(f"<< /Type /Catalog /Pages {pages_id} 0 R >>")

        buffer = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = [0]
        for obj_id, obj in enumerate(self.objects, start=1):
            offsets.append(len(buffer))
            buffer.extend(f"{obj_id} 0 obj\n".encode("ascii"))
            buffer.extend(obj)
            buffer.extend(b"\nendobj\n")

        xref_offset = len(buffer)
        buffer.extend(f"xref\n0 {len(self.objects) + 1}\n".encode("ascii"))
        buffer.extend(b"0000000000 65535 f \n")
        for offset in offsets[1:]:
            buffer.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
        buffer.extend(
            (
                f"trailer\n<< /Size {len(self.objects) + 1} /Root {catalog_id} 0 R >>\n"
                f"startxref\n{xref_offset}\n%%EOF"
            ).encode("ascii")
        )
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(buffer)


def build_pdf(version: str, language: str, output_path: Path) -> None:
    contents_dir = REPO_ROOT / "manuscripts" / version / language / "contents"
    title_lines = build_title_page(read_text(contents_dir / TITLE_FILE))
    body_lines: list[tuple[str, str]] = []
    for filename in BODY_FILES:
        body_lines.extend(markdown_to_lines(read_text(contents_dir / filename)))
        body_lines.extend([("", "body"), ("", "body")])

    pages = paginate(title_lines + body_lines)
    page_streams = [render_page_stream(page, idx + 1, len(pages)) for idx, page in enumerate(pages)]
    PdfBuilder().build(output_path, page_streams)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a dependency-free text PDF from canonical manuscript markdown.")
    parser.add_argument("--version", default="v4.1")
    parser.add_argument("--language", default="en")
    parser.add_argument("--output", required=True)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output_path = Path(args.output)
    if not output_path.is_absolute():
        output_path = (REPO_ROOT / output_path).resolve()
    build_pdf(args.version, args.language, output_path)
    print(output_path)


if __name__ == "__main__":
    main()
