from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

import build_browser_pdf
import build_docx


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUTS = {
    ("v4", "en"): "From Hooligans to War Machines - v4 Book.pdf",
    ("v4.1", "en"): "From Hooligans to War Machines - v4.1 Book.pdf",
    ("v4.1", "es"): "De hooligans a maquinas de guerra - v4.1-es.pdf",
    ("v4.1", "fr"): "Des hooligans aux machines de guerre - v4.1-fr.pdf",
}
WORD_PATHS = [
    Path(r"C:\Program Files\Microsoft Office\root\Office16\WINWORD.EXE"),
    Path(r"C:\Program Files (x86)\Microsoft Office\root\Office16\WINWORD.EXE"),
]


def find_word() -> Path | None:
    for candidate in WORD_PATHS:
        if candidate.exists():
            return candidate
    return shutil.which("WINWORD.EXE") and Path(shutil.which("WINWORD.EXE")) or None


def export_pdf_via_word(docx_path: Path, output_path: Path) -> None:
    script_path = Path(__file__).with_name("export_docx_pdf.ps1")
    command = [
        "powershell",
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        str(script_path),
        str(docx_path),
        str(output_path),
    ]
    subprocess.run(command, check=True)


def default_pdf_output(version: str, language: str) -> Path:
    filename = DEFAULT_OUTPUTS.get((version, language), f"book-{version}-{language}.pdf")
    return REPO_ROOT / "build" / "pdf" / version / language / filename


def build_pdf(
    *,
    version: str,
    language: str,
    output_path: Path,
    cover_path: str | None,
    no_cover: bool,
    no_chapter_images: bool,
    browser_path: str | None,
    fallback: str,
) -> Path:
    paths = build_docx.build_paths(version, language, None, cover_path, no_cover)
    docx_path = build_docx.build_book(paths, include_chapter_images=not no_chapter_images)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    word_path = find_word() if sys.platform == "win32" else None
    if word_path is not None:
        try:
            export_pdf_via_word(docx_path, output_path)
            return output_path
        except subprocess.CalledProcessError:
            if fallback != "browser":
                raise

    if fallback == "browser":
        build_browser_pdf.build_pdf(version, language, output_path, browser_path)
        return output_path

    raise RuntimeError("Microsoft Word is not available and browser fallback was disabled.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a PDF book from a canonical manuscript edition.")
    parser.add_argument("--version", default="v4.1", help="Edition version, for example v4 or v4.1.")
    parser.add_argument("--language", default="en", help="Edition language, for example en, es, or fr.")
    parser.add_argument("--output", help="Optional absolute or repo-relative PDF output path.")
    parser.add_argument("--cover", help="Optional absolute or repo-relative cover image path override.")
    parser.add_argument("--no-cover", action="store_true", help="Omit the cover page from the generated book.")
    parser.add_argument("--no-chapter-images", action="store_true", help="Omit interior chapter images while keeping the cover.")
    parser.add_argument("--browser", help="Optional Chrome/Edge executable path for browser fallback.")
    parser.add_argument(
        "--fallback",
        choices=("browser", "none"),
        default="browser",
        help="Fallback renderer to use when Word is unavailable.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    cover_arg = args.cover
    if cover_arg and not Path(cover_arg).is_absolute():
        cover_arg = str((REPO_ROOT / cover_arg).resolve())

    output_path = Path(args.output) if args.output else default_pdf_output(args.version, args.language)
    if not output_path.is_absolute():
        output_path = (REPO_ROOT / output_path).resolve()

    built_path = build_pdf(
        version=args.version,
        language=args.language,
        output_path=output_path,
        cover_path=cover_arg,
        no_cover=args.no_cover,
        no_chapter_images=args.no_chapter_images,
        browser_path=args.browser,
        fallback=args.fallback,
    )
    print(built_path)


if __name__ == "__main__":
    main()
